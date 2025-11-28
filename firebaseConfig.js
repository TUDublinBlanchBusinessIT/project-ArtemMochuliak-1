import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQQy1P1D6dRns1n0gCfzAtmcDu5YkSeIA",
  authDomain: "swapify-56e9a.firebaseapp.com",
  projectId: "swapify-56e9a",
  storageBucket: "swapify-56e9a.appspot.com",
  messagingSenderId: "1023157302348",
  appId: "1:1023157302348:web:d361a46bd53869555c30e9"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);
