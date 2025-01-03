import React from 'react'
import './Components.css'
import logo from '../pics/logo.jpg'
import userdp from '../pics/x.jpg'
import { useNavigate } from 'react-router-dom'
const Navbar = ({loggedIn,setToken}) => {
  const navigate=useNavigate()
  return (
    <div className="navbar">
      <div className="" style={{display:"flex",alignItems:"center"}}>
        <img src={logo} onClick={()=>{navigate('/')}} alt="" />
        <h2>EventMAnaagementApp</h2>
      </div>
      <div className="links">
        {loggedIn && 
          <div className="navbar-profile">
            <img src={userdp} onClick={()=>{navigate('/profile')}} alt="" />        
            <button onClick={()=>{localStorage.setItem('token','');setToken('')}}>logout</button>
          </div>
        }
        {!loggedIn &&
          <div className="navbar-links">
            <a href="/login">login</a>
            <a href="/signup">signup</a>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar