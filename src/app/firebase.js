// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDcEhPVJVCEmHljPpgWRPbjmn0zSBYNfbs",
  authDomain: "resume-builder-21e18.firebaseapp.com",
  projectId: "resume-builder-21e18",
  storageBucket: "resume-builder-21e18.appspot.com",
  messagingSenderId: "188885881647",
  appId: "1:188885881647:web:42a1555e424c3a3a2447da",
  measurementId: "G-22TXWWLCVX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };