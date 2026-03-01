import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "@/config/env";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  // eslint-disable-next-line no-unused-vars -- type param for callback
  joinConversation: (id: string) => void;
  // eslint-disable-next-line no-unused-vars -- type param for callback
  leaveConversation: (id: string) => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

const token ="";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // const { token } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const socketInstance = io(`${API_BASE_URL}`, {
      path: "/socket.io",
      auth: { token },
      query: { token },
      transports: ["websocket"],
      autoConnect: true,
    });

   
    socketRef.current = socketInstance;

    

    socketInstance.on("connect", () => {
      setSocket(socketInstance);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      setSocket(null);
      socketRef.current = null;
    });

    socketInstance.on("connect_error", () => {
      // console.warn("Socket connect_error:", err.message);
    });

    return () => {
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [token]);

  const joinConversation = useCallback((conversationId: string) => {
    const s = socketRef.current;
    if (s?.connected) {
      s.emit("join_conversation", { conversationId });
    }
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("leave_conversation", { conversationId });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinConversation,
        leaveConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within SocketProvider");
  return ctx;
};
