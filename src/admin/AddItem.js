import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadImageFirebase,uploadFoodDetails, getFoodDetails,updateFoodDetails } from '../Action/FoodAction'
import { useSnackbar } from 'react-simple-snackbar';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../layout/spinner/Spinner';

function AddItem() {

    const [image,setImage ] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [desc,setDesc] = useState('')
    const [loading,setLoading] = useState(false)
    const [itsNewItem,setItsNewItem] = useState(null)

    const params = useParams()

    const [openSnackbar] = useSnackbar()

    useEffect(()=>{
        if (params.id){
            dispatch(getFoodDetails(params.id)).then((data)=>{
                setDesc(data.desc)
                setName(data.name)
                setPrice(data.price)
            }).catch((err)=>{
                openSnackbar(<p>{err}</p>,5000)
            })
        }
        else{
            setItsNewItem(true)
        }
    },[])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function imageHandler(e){
        console.log(e.target.files)
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    function addItemHandler(e){
        e.preventDefault()
        setLoading(true)
        if (itsNewItem){
            dispatch(uploadImageFirebase(image)).then((urlValue)=>{
                dispatch(uploadFoodDetails(name,price,desc,urlValue)).then(()=>{
                    setLoading(false)
                    navigate('/admin')
                }).catch((err)=>{
                    setLoading(false)
                    openSnackbar(<p>{err}</p>,5000)
                })
            }).catch((err)=>{
                openSnackbar(<p>{err}</p>,5000)
            })
        }
        else{
            if (image){
                dispatch(uploadImageFirebase(image)).then((url)=>{
                    dispatch(updateFoodDetails(params.id,name,price,desc,url)).then(()=>{
                        setLoading(false)
                        navigate('/admin')
                    }).catch((err)=>{
                        setLoading(false)
                        openSnackbar(<p>{err}</p>,5000)
                    })
                })
            }
            else{
                const url = ''
                dispatch(updateFoodDetails(params.id,name,price,desc,url)).then(()=>{
                    setLoading(false)
                    navigate('/admin')
                }).catch((err)=>{
                    setLoading(false)
                    openSnackbar(<p>{err}</p>,5000)
                })
            }
        }
    }

    if (loading){
        return <p>loading....</p>
    }

  return (
    <div className='display-container'>
        <div className='form-wrap'>
            <form onSubmit={addItemHandler}>
                <label className='add-label'>Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'/><br/>
                <label className='add-label'>Descrption</label>
                <input type="textarea" value={desc} onChange={(e)=>setDesc(e.target.value)} /><br/>
                <label className='add-label'>Price</label>
                <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
                <label className='add-label'>Image</label>
                <input style={{color:"white"}} type="file" onChange={imageHandler}/><br/>
                <button className='add-button'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddItem