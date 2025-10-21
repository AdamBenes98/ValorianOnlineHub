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
        // Listen for auth state changes
        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserData(user.uid);
                vaos.showDesktop();
            } else {
                this.currentUser = null;
                this.userData = null;
                vaos.showLogin();
            }
        });
    }

    async register(email, password, username) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            
            // Create user document in Firestore
            const userData = {
                uid: user.uid,
                email: email,
                username: username,
                role: 'user',
                settings: { theme: 'dark', animations: true },
                apps: { calculator: true, textEditor: true, terminal: true, settings: true },
                notes: '',
                createdAt: new Date()
            };
            
            await setDoc(doc(this.db, 'users', user.uid), userData);
            this.userData = userData;
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            this.currentUser = user;
            await this.loadUserData(user.uid);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
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
            console.error('Error loading user data:', error);
            throw error;
        }
    }

    async saveUserData() {
        if (!this.currentUser || !this.userData) return;
        
        try {
            await updateDoc(doc(this.db, 'users', this.currentUser.uid), this.userData);
            return { success: true };
        } catch (error) {
            console.error('Error saving user data:', error);
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
            this.currentUser = null;
            this.userData = null;
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllUsers() {
        if (this.userData?.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        try {
            const usersSnapshot = await getDocs(collection(this.db, 'users'));
            return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

    isAdmin() {
        return this.userData?.role === 'admin';
    }
}

// Create global instance
window.vaosFirebase = new VaOSFirebase();
