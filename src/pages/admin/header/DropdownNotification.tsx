import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '@/components/ClickOutside';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '@/config/env';
import { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FaTrash } from 'react-icons/fa';
import toast from "react-hot-toast";
import { Bell } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';


interface Notification {
  notification_id: string;
  id: string;
  title: string;
  body: string;
  date: string;
  created_at: string;
  is_read: boolean;
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { userDetails, token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const { socket } = useSocket();
  const [hasUnread, setHasUnread] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);     // for blinking / animation
  const [unreadCount, setUnreadCount] = useState(0);     // for badge number

  const notificationSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    notificationSound.current = new Audio("/sound/alert.wav");
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      if (!notificationSound.current) return;

      // silent unlock
      notificationSound.current.muted = true;
      notificationSound.current.play().finally(() => {
        if (notificationSound.current) {
          notificationSound.current.pause();
          notificationSound.current.currentTime = 0;
          notificationSound.current.muted = false;
        }
      });

      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio, { once: true });

    return () => {
      document.removeEventListener("click", unlockAudio);
    };
  }, []);




  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data) => {
      //  console.log("🔔 New notification", data);
    });

    const handleNotification = (data: Notification) => {


      setNotifications(prev => {
        // prevent duplicates (important!)
        const exists = prev.some(
          n => n.notification_id === data.notification_id
        );
        if (exists) return prev;

        // STACK ON TOP
        return [data, ...prev];
      });

      setUnseenCount(c => c + 1);
      setUnreadCount(c => c + 1);

      notificationSound.current?.play().catch(() => {
        // browser blocked autoplay – safe to ignore
      });
      setHasUnread(true);

      setNotifying(true);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);


  // Check if there are notifications to show the blinking indicator
  const hasNotifications = notifications.length > 0;

  const fetchNotifications = async (page = 1) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/notifications/user/${userDetails?.user_id}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = res.data;

      if (Array.isArray(result.data)) {
        // Append if not the first page
        setNotifications(prev => page === 1 ? result.data : [...prev, ...result.data]);

        setCurrentPage(result.pagination.currentPage);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {

      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };


  const deleteNotification = async (id: string) => {
    try {
      setIsDeleting(true); // start loading
      const response = await axios.delete(`${API_BASE_URL}/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success(response.data.message || "Notification deleted successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete notification"
      );
    } finally {
      setIsDeleting(false); // stop loading
      setConfirmDeleteId(null); // close modal
    }
  };


  const markAllAsSeen = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/notifications/user/${userDetails?.user_id}/seen`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUnseenCount(0);  // immediately stop blinking
    } catch (e) {
      console.error("Failed to mark notifications as seen");
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications(prev =>
        prev.map(n =>
          n.notification_id === notificationId ? { ...n, isRead: true } : n
        )
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) {
      console.error("Failed to mark notification as read");
    }
  };

  const fetchCounts = async () => {
    try {
      const [unreadRes, unseenRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/notifications/user/${userDetails?.user_id}/unread-count`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        // Only if you implement it — otherwise skip or use same endpoint temporarily
        axios.get(`${API_BASE_URL}/api/notifications/user/${userDetails?.user_id}/unseen-count`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setUnreadCount(unreadRes.data.count || 0);
      setUnseenCount(unseenRes.data.count || 0);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };


  useEffect(() => {
    fetchNotifications(1);
    fetchCounts();
  }, []);


  const handleSeeMore = () => {
    if (currentPage < totalPages) {
      fetchNotifications(currentPage + 1);
    }
  };


  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <span className="inline-flex">
        <Link

          onClick={() => {
            setDropdownOpen(prev => {
              const willOpen = !prev;
              if (willOpen) {
                markAllAsSeen();           // ← stops blinking
              }
              return willOpen;
            });
          }}
          to="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          {unseenCount > 0 && (
            <span className="absolute -top-0.5 right-2 z-1 h-2 w-2 rounded-full bg-meta-1">
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
            </span>
          )}

          {/* Badge number */}
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-meta-1 text-xs font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}

          <Bell size={18} />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3 flex items-center justify-between ">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
              <Link onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }} to="/admin/notifications"><span className='text-sm font-medium text-bodydark2'>View all</span></Link>
            </div>



            {loading ? (
              <ul className="flex h-auto flex-col overflow-y-auto max-h-72">
                {[...Array(4)].map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-start gap-2 border-t border-stroke px-4.5 py-3 animate-pulse"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-gray-300 rounded dark:bg-gray-700"></div>
                      <div className="h-3 w-full bg-gray-200 rounded dark:bg-gray-700"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </div>
                    <div className="h-5 w-5 bg-gray-300 rounded dark:bg-gray-700"></div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex h-auto flex-col overflow-y-auto max-h-72">
                {notifications.length === 0 ? (
                  <li className="px-4.5 py-3 text-sm text-gray-500">No notifications</li>
                ) : (
                  notifications.map(note => (
                    <Link to={`/admin/notifications/${note.notification_id}`} key={note.notification_id}
                      onClick={() => {
                        markAsRead(note.notification_id);
                        setDropdownOpen(false);
                      }}
                      className={`flex justify-between items-start gap-2 border-t border-stroke px-4.5 py-3
  ${!note.is_read ? "bg-blue-50 dark:bg-meta-4" : "bg-white dark:bg-boxdark"}
  hover:bg-gray-100 dark:border-strokedark`}
                    >
                      <div className="text-sm md:text-xs">
                        <p className={`text-black capitalize dark:text-white ${!note.is_read ? "font-bold" : "font-normal"}`}>{note.title} {!note.is_read && (
                          <span className="ml-2 mt-1 inline-block h-2 w-2 rounded-full bg-primary shrink-0"></span>
                        )}
                        </p>
                        <p className='text-gray-600 font-medium'>{note.body}</p>
                        {/* <p className="text-xs text-gray-500">{new Date(note.created_at).toLocaleString()}</p> */}
                        <p className="text-xs text-gray-500 mt-4">
                          {new Date(note.created_at).toLocaleString(undefined, {
                            weekday: 'short',   // e.g., Tue
                            year: 'numeric',
                            month: 'long',      // e.g., May
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>

                      </div>
                      <button onClick={() => setConfirmDeleteId(note.notification_id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <FaTrash />
                      </button>
                    </Link>
                  ))
                )}
              </ul>
            )}

            {/* See More */}
            {currentPage < totalPages && !loading && (
              <button onClick={handleSeeMore} className="w-full py-2 text-center text-sm font-medium text-primary hover:underline border-t border-stroke dark:border-strokedark" > See more </button>
            )}


          </div>
        )}
      </span>

      {/* Confirm Delete Modal */}
      <Dialog
        open={confirmDeleteId !== null}
        // onClose={() => setConfirmDeleteId(null)}
        onClose={() => {
          if (!isDeleting) setConfirmDeleteId(null);
        }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-30"
      >
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Confirm Deletion</Dialog.Title>
          <Dialog.Description className="mb-4 md:text-xs">
            Are you sure you want to delete this notification?
          </Dialog.Description>
          <div className="flex justify-end gap-3 md:text-xs">
            <button onClick={() => setConfirmDeleteId(null)} disabled={isDeleting} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 " > Cancel </button>
            <button onClick={() => deleteNotification(confirmDeleteId!)} disabled={isDeleting} className={`px-4 py-2 rounded text-white ${isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`} > {isDeleting ? "Deleting..." : "Delete"} </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </ClickOutside>
  );
};

export default DropdownNotification;
