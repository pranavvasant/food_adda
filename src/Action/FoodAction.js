import axios from "axios";
import {initializeApp} from "firebase/app";
import { getStorage, ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { LIST_FOOD } from "./constant";

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
initializeApp(firebaseConfig);

const baseUrl = process.env.REACT_APP_BASE_URL

export const uploadImageFirebase = (image) => async (dispatch)=>{
    return new Promise ((resolve,reject)=>{
        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
        (snapshot) => {
        }, 
        (error) => {
            reject(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
            });
        }
        );
    })
}

export const uploadFoodDetails = (name,price,desc,url) => async (dispatch) => {
    return new Promise ((resolve,reject)=>{
        axios.post(`${baseUrl}/food.json`,{name:name,price:price,desc:desc,url:url}).then((response)=>{
            resolve()
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

export const getFoodList = () => async (dispatch)=>{
    axios.get(`${baseUrl}/food.json`).then((response)=>{
        console.log(response.data)
        const arr = [];
        for(let key in response.data){
            arr.push({
                id:key,
                name:response.data[key].name,
                desc:response.data[key].desc,
                price:response.data[key].price,
                url:response.data[key].url
            })
        }
        dispatch({
            type : LIST_FOOD,
            payload : arr
        })
    }).catch((err)=>{
        console.log(err)
    })
}

export const deleteFoodItem = (id) => async (dispatch)=>{
    return new Promise ((resolve,reject)=>{
        axios.delete(`${baseUrl}/food/${id}.json`).then((response)=>{
            if(response.status === 200){
                resolve()
            }
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const getFoodDetails = (id) => async (dispatch)=>{
    return new Promise ((resolve,reject)=>{
        axios.get(`${baseUrl}/food/${id}.json`).then((response)=>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const updateFoodDetails = (id,name,desc,price,url) => async(dispacth) =>{
    return new Promise ((resolve,reject)=>{
        axios.put(`${baseUrl}/food/${id}.json`,{name:name,desc:desc,price:price,url:url}).then((response)=>{
            console.log(response.data)
            resolve()
        }).catch((err)=>{
            reject(err)
        })
    })
}