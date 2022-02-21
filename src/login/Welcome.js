import React, { useContext } from 'react'
import '../index.css'
import CredsContext from '../store/CredsContext'

function Welcome() {
    const credsCtx = useContext(CredsContext)
  return (
    <h1 className='content'>Welcome To Food Adda {credsCtx.loggedInUser}</h1>
  )
}

export default Welcome