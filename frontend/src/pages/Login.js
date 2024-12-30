import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className="login-main">
      <div className="box">
        <h1>Login</h1>
        <div className="input-box">
            <input type="text" placeholder="Username" />
            <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
            <input type="password" placeholder="Password" />
            <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="check-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#" >Forgot password?</a>
        </div>
        <div>
            <button className="btn" type='Submit'>Login</button>
        </div>
        <div className="reg">
            <p>Don't have an account?<a href="#"> Register</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login