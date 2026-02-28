import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVSqkk1IZ9ZCzY0NJwnjYe_lXA7jjFld8",
  authDomain: "mini-blog-e9977.firebaseapp.com",
  projectId: "mini-blog-e9977",
  storageBucket: "mini-blog-e9977.appspot.com",
  messagingSenderId: "56513715382",
  appId: "1:56513715382:web:1f90dc3ec25f75e6fb5a17",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
