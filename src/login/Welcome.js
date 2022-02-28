import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodList } from '../Action/FoodAction'
import FoodList from '../component/FoodList'
import '../index.css'

function Welcome() {

    const dispatch = useDispatch()
    const foods = useSelector(state => state.foods)
    useEffect(()=>{
      console.log(foods.length)
      if(!foods.length){
        dispatch(getFoodList())
      }
    },[])

  return (
    <div className='main-cust-div'>
      {foods.map((food)=>{
        return(
          <FoodList foods={food}/>
        )
      })}
    </div>
  )
}

export default Welcome