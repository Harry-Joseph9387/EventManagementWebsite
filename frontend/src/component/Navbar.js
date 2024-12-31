import React from 'react'
import './Components.css'
import logo from '../pics/logo.jpg'
import userdp from '../pics/x.jpg'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div className="navbar">
      <div className="" style={{display:"flex",alignItems:"center"}}>
        <img src={logo} onClick={()=>{navigate('/')}} alt="" />
        <h2>EventMAnaagementApp</h2>
      </div>
      <div className="links">
        <img src={userdp} onClick={()=>{navigate('/profile')}} alt="" />
      </div>
    </div>
  )
}

export default Navbar