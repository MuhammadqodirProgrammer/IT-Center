import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCKzz4VgiwpL9P9b2sVCbUHp8UTlyzfR6Q",
  authDomain: "astrolab-tizim.firebaseapp.com",
  projectId: "astrolab-tizim",
  storageBucket: "astrolab-tizim.appspot.com",
  messagingSenderId: "249196185325",
  appId: "1:249196185325:web:f636f0eb6a8025bd14aee4",
  measurementId: "G-FP57NBVQ83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function requestPermission() {
  // console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // console.log("Notification permission granted.");
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BOU27D2WK-UwsnEcTIC_anhigXdFCdbjEwr-KFiRCKotRmLokAB9MNHtfPS51muuoSLfSHMH4JXadTEu_4KUQdI",
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("worker-token", currentToken);
          } else {
            console.log("No token");
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("Do not have permission! ");
    }
  });
}
requestPermission();
