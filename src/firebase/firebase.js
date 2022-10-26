import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

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
const db = getFirestore(app);
const storage = getStorage(app);

export const userExists = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
};

export const usernameExists = async (username) => {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));

  const querySnapShot = await getDocs(q);

  querySnapShot.forEach((doc) => users.push(doc.data()));
  return users.length > 0 ? users[0].uid : null;
};

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (err) {
    console.log(err);
  }
};

export const insertNewLink = async (link) => {
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getLinks = async (uid) => {
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });
    return links;
  } catch (err) {
    console.log(err);
  }
};

export const updateLink = async (docId, link) => {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLink = async (docId) => {
  try {
    const docRef = doc(db, "links", docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (err) {
    console.log(err);
  }
};
