// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // <-- Importing storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgf7hKtWBWlh2QiSnra1OUe_AoIfDAaqA",
  authDomain: "resumemaker-fbfcf.firebaseapp.com",
  projectId: "resumemaker-fbfcf",
  storageBucket: "resumemaker-fbfcf.appspot.com",
  messagingSenderId: "697505368763",
  appId: "1:697505368763:web:566046aaffade1ad34379e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);  // <-- Initializing storage

export { app, auth, db, storage };  // <-- Exporting storage
