// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQcNLhSOfyy0aqVU8WPQp2HhsKkXQxS2Y",
    authDomain: "menu-digital-rio.firebaseapp.com",
    databaseURL: "https://menu-digital-rio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "menu-digital-rio",
    storageBucket: "menu-digital-rio.firebasestorage.app",
    messagingSenderId: "573470652103",
    appId: "1:573470652103:web:fa6abc3a287fb6bec770e2",
    measurementId: "G-H78X99S2S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);