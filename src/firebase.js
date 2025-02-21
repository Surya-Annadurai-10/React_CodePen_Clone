// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNrFGZjv4l2HROuPtx7O9HKp6866a5Q1c",
  authDomain: "codepen-clone-c9d60.firebaseapp.com",
  projectId: "codepen-clone-c9d60",
  storageBucket: "codepen-clone-c9d60.firebasestorage.app",
  messagingSenderId: "914780554794",
  appId: "1:914780554794:web:04535a51f7d4eb43d7e553"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const firestore = getFirestore(app);
