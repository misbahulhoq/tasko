export function askForNotifications() {
  if (!("Notification" in window)) {
    return;
  }
  Notification.requestPermission();
}
