import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

const { version } = "../package.json";

Vue.config.productionTip = false;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`./service-worker.js?version=${version}`, {
      scope: "/",
    })
    .then((reg) => console.log(reg))
    .catch((err) => console.log(err));

  // if (navigator.serviceWorker.controller) {
  //   console.log("have service worker");
  // }

  // navigator.serviceWorker.oncontrollerchange = (event) => {
  //   console.log("New service worker activated", event);
  // };

  // send version rn
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "version",
      data: version,
    });
  }
  // let updateMessageDisplayed = false;
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("Message received from service worker", event.data);
  });
}

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
