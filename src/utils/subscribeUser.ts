import { baseUrl } from "@/redux/features/api/baseApi";

export async function subscribeUser() {
  if (!("serviceWorker" in navigator)) {
    alert("Service Workers are not supported in this browser.");
    return;
  }
  const registration = await navigator.serviceWorker.register("./sw.js");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "",
  });

  await fetch(`${baseUrl}/subscribe`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-type": "application/json" },
  });
}
