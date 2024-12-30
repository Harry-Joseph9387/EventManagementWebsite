import React from 'react'
import './Components.css'
import logo from '../pics/x.jpg'
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <div className="links">
        <a href="/">HOME</a>
        <a href="/event">EVENT</a>
        <a href="/profile">PROFILE</a>
        <a href="/login">login</a>
        <a href="/signup">signup</a>
      </div>
    </div>
  )
}

export default Navbar