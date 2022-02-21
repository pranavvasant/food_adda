import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import CredsContext from '../store/CredsContext';

function SignUp() {
    const credsCtx = useContext(CredsContext)
    const [openSnackbar] = useSnackbar()
    const navigate = useNavigate()
    function signupHandler(e){
        e.preventDefault()
        credsCtx.firebaseSignUp(credsCtx.email,credsCtx.password).then(()=>{
            credsCtx.changeEmail('')
            credsCtx.changePassword('')
            navigate("/login")
        }).catch((err)=>{
            openSnackbar(<p>{err}</p>,5000)
        })
    }
    if (credsCtx.loading){
        return <p>Loading ....</p>
    }
  return (
    <div className="formC">
    <h2 className="title">
        New Account
   	</h2>
   	<form onSubmit={signupHandler}>
        <label>Email</label>
        <input type="email" onChange={(e)=>credsCtx.changeEmail(e.target.value)} value={credsCtx.email}/>
        <label>Password</label>
        <input type="password" onChange={(e)=>credsCtx.changePassword(e.target.value)} value={credsCtx.password}/>
        <button>Create Account</button>
   	</form>
   	<div className='bottom'>
        <span>
            Already Have an Account?
        </span>
        <Link to="/login">Login</Link>
    </div>
  </div>
  );
}

export default SignUp