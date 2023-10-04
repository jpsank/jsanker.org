import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot, updateDoc, addDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const sendVerificationEmail = async () => {
        const user = auth.currentUser;
        await sendEmailVerification(user);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = async () => {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const profile = {
            displayName: user.displayName,
        };
        updateUserProfile(user, profile);
        return res;
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const logout = () => {
        return signOut(auth);
    }

    const updateUserProfile = (user, profile) => {
        return updateProfile(user, profile);
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = { currentUser, error, setError, login, register, logout, updateUserProfile, loginWithGoogle, resetPassword, sendVerificationEmail };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}