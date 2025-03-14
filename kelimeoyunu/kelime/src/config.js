import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import {  collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv4KbPJDYJLMQ9E1DCKaZPxxIdpMprwrs",
  authDomain: "kelime-6f82c.firebaseapp.com",
  projectId: "kelime-6f82c",
  storageBucket: "kelime-6f82c.appspot.com",
  messagingSenderId: "849827594532",
  appId: "1:849827594532:web:1b40a91900053e48f5f3b1",
  measurementId: "G-CTZQSR77G8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db , addDoc,collection}; 
