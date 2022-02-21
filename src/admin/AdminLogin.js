import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import CredsContext from '../store/CredsContext';
import './admin.css'

function AdminLogin() {
    const credsCtx = useContext(CredsContext)
    const [openSnackbar] = useSnackbar()
    const navigate = useNavigate()
    function adminHandler(e){
        e.preventDefault()
        credsCtx.firebaseLogin(credsCtx.email,credsCtx.password).then(()=>{
            credsCtx.setloggedInUser('admin')
            credsCtx.changeEmail('')
            credsCtx.changePassword('')
            navigate('/admin')
        }).catch((err)=>{
          openSnackbar(<p>{err}</p>,5000)
      })
    }
    if (credsCtx.loading){
        return <p>Loading ...</p>
    }
  return (
    <div className="admin-container">
      <div className="top-header">
        <h3>Welcome back</h3>
        <p>Enter your credentials to access your account</p>
      </div>
      <form onSubmit={adminHandler}>
        <div className="user">
          <i className="bx bxs-user-circle"></i>
          <input type="email" onChange={(e)=>credsCtx.changeEmail(e.target.value)} value={credsCtx.email} placeholder="Enter your username" />
        </div>
        <div className="pass">
          <i className="bx bxs-lock-alt"></i>
          <input type="password" onChange={(e)=>credsCtx.changePassword(e.target.value)} value={credsCtx.password} placeholder="Enter your password" />
        </div>
        <div className="btn">
         <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin