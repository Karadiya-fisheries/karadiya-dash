// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp7PHqetzRq85J536t2pu1xdP0pfKFyU0",
  authDomain: "karadiya-dashboard.firebaseapp.com",
  projectId: "karadiya-dashboard",
  storageBucket: "karadiya-dashboard.appspot.com",
  messagingSenderId: "97733120638",
  appId: "1:97733120638:web:7e4b5d47346b66bc607e2f",
  measurementId: "G-7CJF3KC4BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
