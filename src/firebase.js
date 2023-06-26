import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
var firebaseConfig = {
  apiKey: "AIzaSyCKzz4VgiwpL9P9b2sVCbUHp8UTlyzfR6Q",
  authDomain: "astrolab-tizim.firebaseapp.com",
  projectId: "astrolab-tizim",
  storageBucket: "astrolab-tizim.appspot.com",
  messagingSenderId: "249196185325",
  appId: "1:249196185325:web:f636f0eb6a8025bd14aee4",
  measurementId: "G-FP57NBVQ83",
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export const getTokenFunc = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BOU27D2WK-UwsnEcTIC_anhigXdFCdbjEwr-KFiRCKotRmLokAB9MNHtfPS51muuoSLfSHMH4JXadTEu_4KUQdI",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
initializeApp(firebaseConfig);
