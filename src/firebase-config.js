
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6oQQXjRI7tgpt927W9aRJVpNvg3rUYX0",
  authDomain: "my-blog-172f8.firebaseapp.com",
  projectId: "my-blog-172f8",
  storageBucket: "my-blog-172f8.firebasestorage.app",
  messagingSenderId: "45896584578",
  appId: "1:45896584578:web:c8a2f14cefaa8d00f5539b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
