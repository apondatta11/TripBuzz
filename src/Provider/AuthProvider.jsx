import React, {  useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase.init';
import { AuthContext } from './AuthContext';


const auth=getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // console.log(loading, user);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
  }
  
    const updateUser = (updatedData) => {
      return updateProfile(auth.currentUser, updatedData);
    };
  
    const logOut = () => {
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    const authData = {
      user,
      setUser,
      createUser,
      logOut,
      signIn,
      loading,
      setLoading,
      updateUser,
      googleSignIn,
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;


