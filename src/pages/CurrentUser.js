import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import { ref, onValue } from 'firebase/database';

export default function useAuth() {

    const [currentUser, setCurrentUser] = useState(null);  
    const [isAdmin, setIsAdmin] = useState(false);
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                const userRef = ref(db, `Admins/${auth.currentUser.uid}`);
                onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.admin) {
                    setIsAdmin(true);
                }})
            } else {
                setCurrentUser(false);
            }
                setFirebaseInitialized(true);
        });
        
    }, [])
    return { currentUser, isAdmin, firebaseInitialized };
}