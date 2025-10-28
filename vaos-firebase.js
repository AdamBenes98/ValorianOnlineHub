import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc } from './firebase-config.js';

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
            const email = `${username}@vaos.local`;
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                email,
                username,
                role: username === 'AdamekBns' ? 'admin' : 'user',

                /*  NEW: flat boolean flags  */
                calculator : true,
                textEditor : true,
                terminal   : true,
                settings   : true,

                settings: { theme: 'dark', animations: true },
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
            const email = `${username}@vaos.local`;
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            this.currentUser = userCredential.user;
            await this.loadUserData(this.currentUser.uid);
            return { success: true };
        } catch (error) {
            let msg = error.message;
            if (error.code === 'auth/user-not-found') msg = 'Username not found';
            else if (error.code === 'auth/wrong-password') msg = 'Incorrect password';
            return { success: false, error: msg };
        }
    }

    async loadUserData(uid) {
        const snap = await getDoc(doc(this.db, 'users', uid));
        if (snap.exists()) this.userData = snap.data();
        else throw new Error('User data not found');
    }

    async saveUserData() {
        if (!this.currentUser || !this.userData) return { success: false, error: 'No user' };
        try {
            await updateDoc(doc(this.db, 'users', this.currentUser.uid), this.userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try { await signOut(this.auth); return { success: true }; }
        catch (error) { return { success: false, error: error.message }; }
    }
}

window.vaosFirebase = new VaOSFirebase();
