importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCKzz4VgiwpL9P9b2sVCbUHp8UTlyzfR6Q",
  authDomain: "astrolab-tizim.firebaseapp.com",
  projectId: "astrolab-tizim",
  storageBucket: "astrolab-tizim.appspot.com",
  messagingSenderId: "249196185325",
  appId: "1:249196185325:web:f636f0eb6a8025bd14aee4",
  measurementId: "G-FP57NBVQ83",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
