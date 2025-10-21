// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJT4Bh-Q0gTefjdYN-_3NMdrwo8pDN_ww",
    authDomain: "valorian-online-hub.firebaseapp.com",
    projectId: "valorian-online-hub",
    storageBucket: "valorian-online-hub.firebasestorage.app",
    messagingSenderId: "470140523501",
    appId: "1:470140523501:web:45a37c6aed375709660de4",
    measurementId: "G-XSYXNN56HR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs };
