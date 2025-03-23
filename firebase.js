import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCsLfUqIrpAaODWX3xjbMXuXa8cwBYa6Bs",
    authDomain: "fankoskart0.firebaseapp.com",
    projectId: "fankoskart0",
    storageBucket: "fankoskart0.firebasestorage.app",
    messagingSenderId: "878011035277",
    appId: "1:878011035277:web:85bff6c89b821f34a53cc4",
    measurementId: "G-DFGECZRC0Y"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);