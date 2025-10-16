import { baseUrl } from "@/redux/features/api/baseApi";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeUser(email: string) {
  if (!("serviceWorker" in navigator)) {
    alert("Service Workers are not supported in this browser.");
    return;
  }
  const registration = await navigator.serviceWorker.register("/sw.js");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY as string,
    ),
  });

  await fetch(`${baseUrl}/notifications/subscribe`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ ...subscription.toJSON(), email }),
    headers: { "Content-type": "application/json" },
  });
}
