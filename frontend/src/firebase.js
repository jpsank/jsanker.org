// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdHgVVimJF_mTpXF0ezRnLudibwRcxPhU",
  authDomain: "jsanker-b3669.firebaseapp.com",
  projectId: "jsanker-b3669",
  storageBucket: "jsanker-b3669.appspot.com",
  messagingSenderId: "810842780177",
  appId: "1:810842780177:web:b3b2c0e0bfdd9ec00bf7b0",
  measurementId: "G-J0RT608LYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
