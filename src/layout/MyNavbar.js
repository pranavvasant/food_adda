import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../index.css'
import CredsContext from '../store/CredsContext';

function MyNavbar() {
    const credsCtx = useContext(CredsContext)
  return (
    <nav className="navbar">
    <span className="navbar-toggle" id="js-navbar-toggle">
      <i className="fas fa-bars"></i>
    </span>
    <Link to="/" className="logo">Food Adda</Link>
    <ul className="main-nav" id="js-menu">
      <li>
        <Link to="/admin" className="nav-links">Home</Link>
        {!credsCtx.loggedInUser ?<Link to="/login" className="nav-links">Login</Link> : <Link to="/" onClick={credsCtx.firebaseLogout} className="nav-links">Logout</Link> }
      </li>
    </ul>
  </nav>
  );
}

export default MyNavbar