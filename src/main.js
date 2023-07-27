/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// alert update
function invokeUpdate(registration) {
  // add alert update to local storage
  console.log("registrations", registration);
  const isConfirmed = confirm("new update");
  if (isConfirmed && registration.waiting) {
    registration.waiting.postMessage("SKIP_WAITING");
  }
}

// check update
async function checkUpdate() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      `./service-worker.js`
    );
    registration.addEventListener("updatefound", () => {
      console.log("update founds");
      if (registration.installing) {
        registration.installing.addEventListener("statechange", () => {
          if (registration.waiting) {
            if (navigator.serviceWorker.controller) {
              invokeUpdate(registration);
            } else {
              console.log("service worker initialize");
            }
          }
        });
      }
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  }
}

function clickUpdateInDevTools() {
  // cek jika ada service worker
  if (
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.getRegistration
  ) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.update) {
        // Panggil function update di service worker dev tool
        registration.update();
      }
    });
  }
}

// berkala panggil function update di service worker dev tool
const updateInterval = 15 * 60 * 1000; // 15 menit interval
setInterval(clickUpdateInDevTools, updateInterval);

// add pop up hanya saat ada update baru
checkUpdate();

// add pop up when user click
// window.addEventListener("click", () => {
//   checkUpdate();
// });

// window.addEventListener("beforeunload", async () => {
//   const registration = await navigator.serviceWorker.getRegistration(
//     "./service-worker.js"
//   );
//   if (registration && registration.waiting) {
//     registration.waiting.postMessage("SKIP_WAITING");
//   }
// });

// window.addEventListener("beforeunload", () => {
//   const ask = confirm("hai?");
//   if (ask) {
//     registration.waiting.postMessage("SKIP_WAITING");
//   }
// });

// navigator.serviceWorker
//   .register(`./service-worker.js?version=${version}`, {
//     scope: "/",
//   })
//   .then((reg) => console.log(reg))
//   .catch((err) => console.log(err));

// // send version rn
// if (navigator.serviceWorker.controller) {
//   navigator.serviceWorker.controller.postMessage({
//     type: "version",
//     data: version,
//   });
// }
// // let updateMessageDisplayed = false;
// navigator.serviceWorker.addEventListener("message", (event) => {
//   console.log("Message received from service workers", event.data);
// });

// const cacheName = "Notification";
// caches
//   .open(cacheName)
//   .then((cache) => {
//     console.log(`Cache ${cacheName} openend : ${cache}`);

//     // add url string to cache notification
//     let urlString = "https://jsonplaceholder.typicode.com/todos/1";
//     cache.add(urlString);

//     cache.keys().then((keys) => {
//       keys.forEach((key, index) => {
//         console.log("list key:", key, index);
//       });
//     });

//     return cache;
//   })
//   .then((cache) => {
//     // check cache exist
//     caches.has(cacheName).then((hasCache) => {
//       console.log("Has Cache: ", cacheName, hasCache);
//     });

//     // search file in caches
//     // caches.match() caches.matchAll()
//     // caches.match - look in all caches
//     let urlString = "https://jsonplaceholder.typicode.com/todos/1";
//     caches.match(urlString).then((cacheResponse) => {
//       if (
//         cacheResponse &&
//         cacheResponse.status < 400 &&
//         cacheResponse.headers.has("content-type")
//       ) {
//         console.log("cache response", cacheResponse);
//         return cacheResponse;
//       } else {
//         console.log("not found in caches");
//         return fetch(urlString).then((fetchResponse) => {
//           if (!fetchResponse.ok) throw fetchResponse.statusText;
//           cache.put(urlString, fetchResponse.clone());
//           return fetchResponse;
//         });
//       }
//     });
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => console.log(error));

// setTimeout(() => {
//   const h1 = document.createElement("h1");
//   const textNode = document.createTextNode("Hello World");
//   h1.appendChild(textNode);
// }, 3000);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
