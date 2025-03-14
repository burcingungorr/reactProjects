import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0antacU93V9plKDMgbIx5cM-hJgNMXEY",
  authDomain: "movie-ce4bc.firebaseapp.com",
  projectId: "movie-ce4bc",
  storageBucket: "movie-ce4bc.appspot.com",
  messagingSenderId: "626795398497",
  appId: "1:626795398497:web:d2868358ac66b83f847120",
  measurementId: "G-XWFTJYBX5H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
