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
        apiKey: "AIzaSyDLEVn7NRNfnWx95NKh6Xy4GiFciXiGN5c",
        authDomain: "yash4-d4d4f.firebaseapp.com",
        databaseURL: "https://yash4-d4d4f-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "yash4-d4d4f",
        storageBucket: "yash4-d4d4f.appspot.com",
        messagingSenderId: "258895720068",
        appId: "1:258895720068:web:cbb01d6e91d6140de15cd1",
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