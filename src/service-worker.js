/* eslint-disable */
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({
  debug: true,
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

console.log({ self });

let versionData;
self.addEventListener("message", (event) => {
  if (event.data.type === "version") {
    versionData = event.data.data;
  }
});

// self.addEventListener("install", async (event) => {
//   const url = new URL(self.location);
//   const version = url.searchParams.get("version");

//   // get curr version
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   const jsonData = await response.json();
//   const currentVersion = jsonData.id;
//   const status = version === currentVersion;

//   const statusResponse = new Response(JSON.stringify({ status }));
//   console.log("tesa response", statusResponse);
//   event.waitUntil(
//     caches.open("cacheName").then((cache) => {
//       return cache.put("/app-status", statusResponse);
//     })
//   );
// });

// self.addEventListener("fetch", async (event) => {
//   if (event.request.url.endsWith("/app-version")) {
//     // get curr version
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/todos/1"
//     );
//     const jsonData = await response.json();
//     const currentVersion = jsonData.id;
//     const versionResponse = new Response(
//       JSON.stringify({ version: currentVersion }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     event.respondWith(versionResponse);
//   }
// });

// const version = 1;
// let versionData;
// let staticName = `staticVersion-${version}`;

// self.addEventListener("install", (event) => {
//   console.log("installing event..", event);
//   // self skip waiting sama dengan klik skipWaiting atau updateOnReload
//   // self.skipWaiting();
//   // Add string to caches
//   event.waitUntil(
//     caches
//       .open(staticName)
//       .then(
//         (cache) => {
//           const newVersion = 2;
//           return cache.put("/version", new Response(newVersion));
//         },
//         (err) => {
//           console.log("failed", err);
//         }
//       )
//       .then(() => {
//         console.log("version cached success");
//       })
//   );
// waituntil
//   event.waitUntil(
//     Promise.resolve()
//       .then(() => {
//         return isVersionUpdated();
//       })
//       .then(() => {
//         console.log("updated");
//       })
//   );
// });

// function isVersionUpdated() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Version Updated");
//       resolve();
//     }, 1500);
//   });
// }

// self.addEventListener("activate", (event) => {
//   console.log("activate event..", event);
//   // client.claim().then(() => {
//   //     console.log('claimend');
//   // })
// });
// event.respondWith(
//   caches.match("/version").then((cacheRes) => {
//     if (cacheRes == undefined) {
//       console.log(`Missing ${event.request.uxrl}`);
//     }
//     console.log("cache response :", cacheRes);
//     return cacheRes || fetch(event.request);
//   })
// );

// self.addEventListener("message", (event) => {
//   console.log("tesa message", event.data);
//   if (event.data.type === "version") {
//     versionData = event.data.data;
//   }
//   // if (event.data.type === "reload") {
//   //   self.skipWaiting();
//   //   self.clients.matchAll().then((clients) => {
//   //     clients.forEach((client) =>
//   //       client.postMessage({ type: "reload", needUpdate: false })
//   //     );
//   //   });
//   // }
// });
// async function fetchingData(event) {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/todos/1"
//     );
//     const jsonData = await response.json();
//     console.log("tesa", versionData);
//     console.log("tesa", jsonData.id);
//     console.log("tesa", isNewVersion(versionData, jsonData.id));
//     if (versionData && isNewVersion(versionData, jsonData.id)) {
//       console.log("response data: ", response);
//       const cache = await caches.open(staticName);
//       const responseToCache = new Response(JSON.stringify(jsonData), {
//         status: response.status,
//         statusText: response.statusText,
//         headers: response.headers,
//       });
//       console.log("tesa responseToCache", responseToCache);
//       await cache.put(event.request, responseToCache);
//       const clients = await self.clients.matchAll();
//       clients.forEach((client) => {
//         client.postMessage({
//           text: "New version available",
//           needUpdate: false,
//         });
//       });
//       return response;
//     } else {
//       return new Response("Error fetching data.");
//     }
//   } catch (error) {
//     console.log(error);
//     return new Response("Error fetchixng data.");
//   }
// }

// function isNewVersion(version, newVersion) {
//   return version !== newVersion;
// }

// function showAlert() {
//   console.log("countFetching : ", countFetching);
//   const userConfirmation = window.confirm("Update?");
//   if (userConfirmation) {
//     alert("Updated");
//     self.skipWaiting();
//     self.clients.matchAll().then((clients) => {
//       clients.forEach((client) => client.postMessage({ type: "reload" }));
//     });
//   } else {
//     alert("Cancel");
//   }
// }

// push notification lewat dev tool -> application -> service worker -> push
let click_open_url;
self.addEventListener("push", (event) => {
  let message = event.data.text();
  click_open_url = "https://www.youtube.com/";
  const option = {
    body: message.body,
  };
  event.waitUntil(self.registration.showNotification("Open Youtube", option));
});

self.addEventListener("notificationclick", (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if (click_open_url) {
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});
