import React, { createContext, useState, useContext, ReactNode } from 'react';

// veil:design() log:"Creating notification context for CLARITY-OR-DEATH UI"

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: string;
  timestamp: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = Date.now();
    const timestamp = new Date().toISOString();
    setNotifications(prev => [
      { id, timestamp, ...notification },
      ...prev
    ].slice(0, 50)); // Limit to 50 notifications

    // Auto-remove notifications after 5 seconds, unless they are errors
    if (notification.type !== 'error') {
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearNotifications
    }}>
      {children}
      <NotificationDisplay />
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationDisplay: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`toast toast-${notification.type}`}
        >
          <div className="toast-header">
            <span className="toast-type">{notification.type}</span>
            <button
              className="toast-close"
              onClick={() => removeNotification(notification.id)}
            >
              ×
            </button>
          </div>
          <div className="toast-message">{notification.message}</div>
          {notification.details && (
            <div className="toast-details">{notification.details}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationProvider;