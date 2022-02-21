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
    <a href="#" className="logo">Food Adda</a>
    <ul className="main-nav" id="js-menu">
      <li>
        <Link to="/" className="nav-links">Home</Link>
        <Link to="/admin/additem" className="nav-links">Add Items</Link>
        {!credsCtx.loggedInUser ?<Link to="/login" className="nav-links">Login</Link> : <Link to="/" onClick={credsCtx.firebaseLogout} className="nav-links">Logout</Link> }
      </li>
    </ul>
  </nav>
  );
}

export default MyNavbar