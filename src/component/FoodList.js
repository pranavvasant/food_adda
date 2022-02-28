import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFoodCart } from '../Action/FoodAction'
import '../index.css'

function FoodList({foods}) {

    const [count,setCount] = useState(0)
    const carts = useSelector(state=>state.carts)
    const dispatch = useDispatch()

    function cartHandler(e,id,name,price){
        e.preventDefault()
        setCount(1)
        dispatch(addFoodCart(id,name,price,1))
      }
  
      function negativeValue(foodId){
        const value = count - 1
        if (value > 0){
          setCount(value)
            const filteredCart = carts.filter((value)=>value.id === foodId)
            filteredCart.map((value)=>dispatch(addFoodCart(value.id,value.name,value.price,value.quantity - 1)))
        }
        else{
          setCount(0)
        }
      }
  
      function positiveValue(foodId){
        console.log("====",carts)
        const value = count + 1
        setCount(value)
        const filteredCart = carts.filter((value)=>value.id === foodId)
        filteredCart.map((value)=>dispatch(addFoodCart(value.id,value.name,value.price,value.quantity + 1)))
      }

      useEffect(()=>{
        console.log("Pranav is Kinsg")
      },[])

  return (
        <div key={foods.id} className='single-cust-div'>
        <img src={foods.url} className="cust-food-image" alt='food'/>
        <div className='content-div'>
            <p>{foods.name}</p>
            <p>{foods.desc}</p>
            <p>{foods.price}</p>
            { count === 0 && <button className='cart-button' onClick={(e)=>{cartHandler(e,foods.id,foods.name,foods.price)}}>Add To cart</button> }
            { count > 0 && 
            <>
            <div className='cart-toggle'>
            <button className='toggle-value' onClick={()=>negativeValue(foods.id,foods.name,foods.price)}>-</button>
                <p className='cart-toggle-value'>{count}</p>
            <button className='toggle-value' onClick={()=>positiveValue(foods.id,foods.name,foods.price)}>+</button>
            </div>
            </> }
        </div>
        </div>
  )
}

export default FoodList