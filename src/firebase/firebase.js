// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvvLOz3XYAR_k0t6lXhcjFHmSNvAQCgaA",
  authDomain: "localcheafbazar.firebaseapp.com",
  projectId: "localcheafbazar",
  storageBucket: "localcheafbazar.firebasestorage.app",
  messagingSenderId: "734518283240",
  appId: "1:734518283240:web:33e783e249b30a0bb7725d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);