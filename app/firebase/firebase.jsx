// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, addDoc, collection, onSnapshot, query, where, getDoc, doc, setDoc, getDocs, updateDoc, increment, arrayUnion, deleteField, deleteDoc, orderBy, limit } from "@firebase/firestore"
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getStorage, getDownloadURL } from 'firebase/storage'

// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmOR3vfocrPF0U3vtZFxHTZAHGVFh2wCA",
  authDomain: "givingly-fbfdf.firebaseapp.com",
  projectId: "givingly-fbfdf",
  storageBucket: "givingly-fbfdf.appspot.com",
  messagingSenderId: "783237880324",
  appId: "1:783237880324:web:0378e0dc2c8a1ab0ab3351",
  measurementId: "G-S146F8DGPQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const storage = getStorage(app)
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
auth.useDeviceLanguage();
// const analytics = getAnalytics(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  db,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  googleAuthProvider,
  signInWithPopup,
  githubAuthProvider,
  twitterAuthProvider,
  doc,
  getDoc,
  setDoc,
  getDocs,
  getDownloadURL,
  updateDoc,
  increment,
  arrayUnion,
  deleteField,
  deleteDoc,
  orderBy,
  limit
}
