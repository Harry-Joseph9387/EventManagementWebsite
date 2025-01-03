import React from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom'

const Login = ({setToken,setUsr,setIsAdmin}) => {
  const navigate=useNavigate()
  const loginFunct=async()=>{
    const inputs=document.querySelectorAll('input')
    const username=inputs[0].value
    const password=inputs[1].value
    try{
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if(response.ok){
        alert("logged in")
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', data.admin);

        setToken(data.token)
        setIsAdmin(data.admin)
        console.log(data.admin)
        localStorage.setItem('username', username);
        navigate('/')
      }
      else{
        alert(Object.values(data))
      }
    }
    catch(err){
      alert(err)
    }
  }
  return (
    <div className="login-main">
      <div className="box">
        <h1>Login</h1>
        <div className="input-box">
            <input   type="text" placeholder="Username" />
            <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
            <input  type="password" placeholder="Password" />
            <i className="bx bxs-lock-alt"></i>
        </div>
        
        <div>
            <button className="btn" onClick={()=>{loginFunct()}} type='Submit'>Login</button>
        </div>
        <div className="reg">
            <p>Don't have an account?<a href="#"> Register</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login