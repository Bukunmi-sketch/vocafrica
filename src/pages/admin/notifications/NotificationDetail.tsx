import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '@/config/env';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns'; // better date formatting (optional)
import NotificationDetailSkeleton from './NotificationDetailSkeleton';

interface NotificationDetail {
  notification_id: string;
  user_id: string;
  type: string;
  reference_id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
  organization_id: string;
  is_seen: boolean;
  seen_at?: string;
}

const NotificationDetail = () => {
  const { notificationId } = useParams<{ notificationId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [notification, setNotification] = useState<NotificationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch notification + mark as viewed/read
  useEffect(() => {
    if (!notificationId || !token) return;

    const fetchAndMarkAsViewed = async () => {
      try {
        setLoading(true);
        setError(null);

        // The /view endpoint both fetches and marks as read
        const response = await axios.post(
          `${API_BASE_URL}/api/notifications/${notificationId}/view`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setNotification(response.data.data);
        } else {
          setError('Failed to load notification');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error loading notification');
        toast.error('Could not load notification');
      } finally {
        setLoading(false);
      }
    };

    fetchAndMarkAsViewed();
  }, [notificationId, token]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDeleteModal(false);
      }
    };
    if (showDeleteModal) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showDeleteModal]);

  const handleDelete = async () => {
    if (!notificationId) return;

    try {
      setDeleting(true);
      await axios.delete(`${API_BASE_URL}/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Notification deleted');
      navigate('/admin/notifications'); // or go back to list
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
     return <NotificationDetailSkeleton />;
  }

  if (error || !notification) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">{error || 'Notification not found'}</p>
        <Link
          to="/admin/notifications"
          className="text-primary hover:underline flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Back to notifications
        </Link>
      </div>
    );
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowDeleteModal(false);
    }
  };

 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header / Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-meta-4"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-semibold text-primary dark:text-white">
            Notification Details
          </h1>
        </div>

        <button
        //   onClick={handleDelete}
        onClick={() => setShowDeleteModal(true)}
          disabled={deleting}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
            deleting
              ? 'bg-red-300 cursor-not-allowed'
              : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
          }`}
        >
          <FaTrash size={14} />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-default p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-black dark:text-white mb-3 capitalize">
          {notification.title}
        </h2>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div>
            <span className="font-medium">Type:</span> {notification.type}
          </div>
          <div>
            <span className="font-medium">Date:</span>{' '}
            {format(new Date(notification.created_at), 'PPP p')} {/* e.g. Feb 6th, 2026, 7:36 PM */}
          </div>
          {notification.seen_at && (
            <div>
              <span className="font-medium">Seen:</span>{' '}
              {format(new Date(notification.seen_at), 'PPP p')}
            </div>
          )}
        </div>

        {/* Body / Content */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {notification.body}
          </p>
        </div>

        {/* Reference ID (if useful) */}
        {notification.reference_id && notification.reference_id !== 'string' && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Reference ID:</span> {notification.reference_id}
            </p>
          </div>
        )}

        {/* Status badges */}
        <div className="mt-6 flex gap-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              notification.is_read
                ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
            }`}
          >
            {notification.is_read ? 'Read' : 'Unread'}
          </span>

        
        </div>
      </div>

      {/* Delete Confirmation Modal */}
{showDeleteModal && (
  <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-stroke dark:border-strokedark">
      <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
        Delete Notification
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Are you sure you want to permanently delete this notification? 
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setShowDeleteModal(false)}
          disabled={deleting}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        >
          Cancel
        </button>
        
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className={`px-4 py-2 rounded-md font-medium text-white flex items-center gap-2 ${
            deleting
              ? 'bg-red-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {deleting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Back button at bottom */}
      <div className="mt-8">
        <Link
          to="/admin/notifications"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <FaArrowLeft size={14} /> Back to all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationDetail;