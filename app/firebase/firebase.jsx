// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { GoogleAuthProvider } from "firebase/auth";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
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
    measurementId: "G-S146F8DGPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();
// auth.useDeviceLanguage();

export {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
}
