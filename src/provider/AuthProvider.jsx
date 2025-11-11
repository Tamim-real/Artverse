import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

export  const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);


const createUser=(email, password)=>{

    return createUserWithEmailAndPassword(auth, email, password)
}

const signIn=(email, password)=>{

    return signInWithEmailAndPassword(auth, email, password)
}

const logOut=()=>{
    return signOut(auth)
}

useEffect(()=>{
  const unsub =   onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)

    });
    return ()=>{
        unsub()
    }
},[])
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn
    }
    
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;