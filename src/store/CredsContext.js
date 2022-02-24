import React, { createContext, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";

const CredsContext = createContext({
    email:'',
    password:'',
    loading:null,
    loggedInUser:'',
    changeEmail : ()=>{},
    changePassword : ()=>{},
    firebaseLogin : ()=>{},
    firebaseSignUp:()=>{},
    firebaseLogout:()=>{},
    setloggedInUser:()=>{}
})

export function CredsContextProvider(props) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState()
    const [loggedInUser,setloggedInUser] = useState()

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASEURL,
        projectId: "yash4-d4d4f",
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: "258895720068",
        appId: process.env.REACT_APP_APP_ID,
        measurementId: "G-TNPKCD1H5Y"
        };
    const app = initializeApp(firebaseConfig);

    function changeEmail(email){
        setEmail(email)
    }
    function changePassword(password){
        setPassword(password)
    }

    async function firebaseLogin(email,password){
        setLoading(true)
        return new Promise((resolve,reject)=>{
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user.email
            var name   = user.substring(0, user.lastIndexOf("@"));
            setLoading(false)
            setloggedInUser(name)
            resolve(user)
          })
          .catch((error) => {
            setLoading(false)
            reject(error.message)
          });
        })
    }

    async function firebaseSignUp(email,password){
        setLoading(true)
        return new Promise((resolve,reject)=>{
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              setLoading(false)
              resolve(userCredential)
          })
          .catch((error) => {
              setLoading(false)
              reject(error.message)
          })
        })
        
    }

    async function firebaseLogout(){
        setLoading(true)
        
        return new Promise((resolve,reject)=>{
            const auth = getAuth()
            signOut(auth).then(() => {
                setloggedInUser('')
                setLoading(false)
                resolve()
            }).catch((error) => {
                setLoading(false)
                reject()
            });
        })
    }

    const context = {
        email:email,
        password:password,
        loading:loading,
        loggedInUser:loggedInUser,
        firebaseLogin:firebaseLogin,
        firebaseSignUp:firebaseSignUp,
        changeEmail:changeEmail,
        changePassword:changePassword,
        firebaseLogout:firebaseLogout,
        setloggedInUser
    }
  return (
    <CredsContext.Provider value={context}>
        {props.children}
    </CredsContext.Provider>
  );
}

export default CredsContext