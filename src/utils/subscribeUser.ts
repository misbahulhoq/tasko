import { baseUrl } from "@/redux/features/api/baseApi";

export async function subscribeUser(email: string) {
  if (!("serviceWorker" in navigator)) {
    alert("Service Workers are not supported in this browser.");
    return;
  }
  const registration = await navigator.serviceWorker.register("./sw.js");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  });

  await fetch(`${baseUrl}/notifications/subscribe`, {
    method: "POST",
    body: JSON.stringify({ ...subscription.toJSON(), email }),
    headers: { "Content-type": "application/json" },
  });
}
