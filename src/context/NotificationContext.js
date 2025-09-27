"use client";
import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = ({
    type = "success",
    title = "",
    message = "",
    autoclose = true,
    timeout = 5000,
  }) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type,
      title,
      message,
      autoclose,
      timeout,
      isVisible: true,
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const hideNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const showSuccess = (title, message) =>
    showNotification({ type: "success", title, message });

  const showError = (title, message) =>
    showNotification({ type: "error", title, message });

  const showWarning = (title, message) =>
    showNotification({ type: "warning", title, message });

  const showInfo = (title, message) =>
    showNotification({ type: "info", title, message });

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}

      {/* Notification Container */}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            autoclose={notification.autoclose}
            timeout={notification.timeout}
            isVisible={notification.isVisible}
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
