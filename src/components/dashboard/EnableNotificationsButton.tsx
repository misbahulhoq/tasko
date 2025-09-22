import React, { useEffect, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { askForNotifications } from "@/utils/askForNotification";
import { subscribeUser } from "@/utils/subscribeUser";
import { useAppSelector } from "@/hooks/redux.hook";

interface Props {
  closeModal: () => void;
}
const EnableNotificationsButton = ({ closeModal }: Props) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (window.Notification) {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }
    }
  }, []);

  const handleClick = () => {
    askForNotifications();
    subscribeUser(user?.email as string);
    closeModal();
  };
  return (
    <button
      onClick={handleClick}
      className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 ${notificationsEnabled ? "hidden" : "block"}`}
    >
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-gray-50 p-2 transition-all duration-200 group-hover:bg-white group-hover:shadow-md">
          <BellAlertIcon className="h-4 w-4 text-gray-600 transition-colors duration-200 group-hover:text-violet-600" />{" "}
        </div>
        <span className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
          Enable Notifications
        </span>
      </div>
    </button>
  );
};

export default EnableNotificationsButton;
