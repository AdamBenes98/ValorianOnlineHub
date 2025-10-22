// vaos-firebase.js
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from './firebase-config.js';

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

   …   //  everything above stays the same

    async register(username, password) {
        try {
            const email = `${username}@vaos.local`;

            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            const isAdmin = username === 'AdamekBns';

            const userData = {
                uid: user.uid,
                email,
                username,
                role: isAdmin ? 'admin' : 'user',

                /*  NEW: single boolean flags instead of nested “apps” object  */
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

…   //  rest of the file stays untouched
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

    async deleteUser(userId) {
        if (this.userData?.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        if (userId === this.currentUser.uid) {
            throw new Error('Cannot delete your own account');
        }
        
        try {
            await deleteDoc(doc(this.db, 'users', userId));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async updateUserRole(userId, newRole) {
        if (this.userData?.role !== 'admin') {
            throw new Error('Admin access required');
        }
        
        try {
            await updateDoc(doc(this.db, 'users', userId), { role: newRole });
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
