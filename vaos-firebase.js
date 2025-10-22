// vaos-firebase.js
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, collection, getDocs } from './firebase-config.js';

class VaOSFirebase {
    constructor() {
        this.auth = auth;
        this.db = db;
        this.currentUser = null;
        this.userData = null;
    }

    async init() {
        return new Promise((resolve) => {
            onAuthStateChanged(this.auth, async (user) => {
                if (user) {
                    this.currentUser = user;
                    await this.loadUserData(user.uid);
                    if (window.vaos) vaos.showDesktop();
                } else {
                    this.currentUser = null;
                    this.userData = null;
                    if (window.vaos) vaos.showLogin();
                }
                resolve();
            });
        });
    }

    async register(username, password) {
        try {
            // Generate fake email from username
            const email = `${username}@vaos.local`;
            
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            
            const userData = {
                uid: user.uid,
                email: email,
                username: username,
                role: 'user',
                settings: { theme: 'dark', animations: true },
                apps: { calculator: true, textEditor: true, terminal: true, settings: true },
                notes: '',
                createdAt: new Date().toISOString()
            };
            
            await setDoc(doc(this.db, 'users', user.uid), userData);
            this.userData = userData;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(username, password) {
        try {
            // Convert username to fake email
            const email = `${username}@vaos.local`;
            
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            this.currentUser = user;
            await this.loadUserData(user.uid);
            return { success: true };
        } catch (error) {
            // Provide user-friendly error messages
            let errorMessage = error.message;
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Username not found';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid username format';
            }
            return { success: false, error: errorMessage };
        }
    }

    async loadUserData(uid) {
        try {
            const userDoc = await getDoc(doc(this.db, 'users', uid));
            if (userDoc.exists()) {
                this.userData = userDoc.data();
            } else {
                throw new Error('User data not found');
            }
        } catch (error) {
            throw error;
        }
    }

    async saveUserData() {
        if (!this.currentUser || !this.userData) return;
        
        try {
            await updateDoc(doc(this.db, 'users', this.currentUser.uid), this.userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    isAdmin() {
        return this.userData?.role === 'admin';
    }
}

window.vaosFirebase = new VaOSFirebase();
