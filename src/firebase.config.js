// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCruoJLKvJ_U4RFiwTIjUfdzEny8T5b45E",
  authDomain: "busy-buy-4dfe7.firebaseapp.com",
  projectId: "busy-buy-4dfe7",
  storageBucket: "busy-buy-4dfe7.firebasestorage.app",
  messagingSenderId: "1092582342799",
  appId: "1:1092582342799:web:7ee019839aa87efaeb30fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default db;
export { auth };
