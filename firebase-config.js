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
export const auth = getAuth(app);
export const db  = getFirestore(app);

/* ---------- convenience helpers ---------- */
export const role = {
  /* returns an array of the user’s roles (empty if not logged in) */
  async ofUser(user) {
    if (!user) return [];
    const snap = await getDoc(doc(db, "users", user.uid));
    return snap.exists() ? (snap.data().roles || []) : [];
  },

  /* returns true if the user has at least one of the required roles */
  async can(user, allowed) {
    if (!user) return false;
    if (!allowed) return true;                 // public tile
    const userRoles = await role.ofUser(user);
    return (Array.isArray(allowed)
      ? allowed.some(r => userRoles.includes(r))
      : userRoles.includes(allowed));
  },

  /* set roles for a uid (overwrites) */
  async set(uid, roles) {
    return setDoc(doc(db, "users", uid), { roles }, { merge: true });
  }
};

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs
};
