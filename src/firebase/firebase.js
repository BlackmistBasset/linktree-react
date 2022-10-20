import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   getBytes,
// } from "firebase/storage";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   getDoc,
//   query,
//   where,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGID,
  appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const db = getFirestore(app);
//const storage = getStorage(app);
