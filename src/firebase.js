// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl5gLLQG84kGXHm5_XznAdSjEH6eYgvyw",
  authDomain: "hagel-ae59a.firebaseapp.com",
  projectId: "hagel-ae59a",
  storageBucket: "hagel-ae59a.appspot.com",
  messagingSenderId: "422349601687",
  appId: "1:422349601687:web:ef3b8684ecf60814f8e2d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Initialize Firestore and get a reference to the service
export const firestore = getFirestore(app);