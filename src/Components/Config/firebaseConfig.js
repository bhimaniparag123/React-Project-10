import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJiRF0NU7oYxmqt7Bttm-3dQsfkA0CicE",
  authDomain: "bookmyshow-3e9a9.firebaseapp.com",
  projectId: "bookmyshow-3e9a9",
  storageBucket: "bookmyshow-3e9a9.firebasestorage.app",
  messagingSenderId: "445721184636",
  appId: "1:445721184636:web:2e19602a266a1e2250bcf9",
  measurementId: "G-DXS1X3GZ1Z"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


