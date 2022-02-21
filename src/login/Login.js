import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import CredsContext from '../store/CredsContext';

function Login() {
    const credsCtx = useContext(CredsContext)
    const [openSnackbar] = useSnackbar()

    const navigate = useNavigate()
    function loginHandler(e){
        e.preventDefault()
        credsCtx.firebaseLogin(credsCtx.email,credsCtx.password).then(()=>{
            credsCtx.changeEmail('')
            credsCtx.changePassword('')
            navigate("/")
        }).catch((err)=>{
            openSnackbar(<p>{err}</p>,5000)
        })
    }
    if (credsCtx.loggedInUser){
        navigate('/')
    }
    if (credsCtx.loading){
        return <p>Loading ....</p>
    }
  return (
    <div className="formC">
    <h2 className="title">
        Welcome back!
   	</h2>
   	<form onSubmit={loginHandler}>
        <label>Email</label>
        <input type="email" onChange={(e)=>credsCtx.changeEmail(e.target.value)} value={credsCtx.email}/>
        <label>Password</label>
        <input type="password" onChange={(e)=>credsCtx.changePassword(e.target.value)} value={credsCtx.password}/>
        <button>Login</button>
   	</form>
   	<div className='bottom'>
        <span>
            Don’t have an account?
        </span>
        <Link to="/signup">Sign Up</Link>
    </div>
  </div>
  );
}

export default Login