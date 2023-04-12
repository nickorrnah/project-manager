import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  
  
    return (
      <nav className="navbar">
        <div className="navbar-logo"><Link className="nav-link" to="/">IPM</Link></div>
        <div className="navbar-menu">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/upload">Upload</Link>
          <Link className="nav-link" to="/search">Search</Link>
        </div>
      </nav>
    );
}







