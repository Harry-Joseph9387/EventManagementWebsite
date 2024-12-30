import React from 'react'
import './Signup.css'
const Signup = () => {
  return (
    <div className="signup-main">
      <div className="box">

        <h1>Sign-up</h1>

        <div className="bb">
            <input type="text" required placeholder="Name" />\
        </div>

        <div className="bb">
            <input type="email" required placeholder="Email" />
        </div>

        <div className="bb">
            <input type="password" required placeholder="Password" />
        </div>

        <div className="bb">
            <input type="tel" required placeholder="Contact Number" />
        </div>

        <div className="check-box">
            <label><input type="checkbox" required />Terms and conditions agreement</label>
        </div>

        <div>
            <button class="btn">Submit</button>
        </div>
        
        </div>
    </div>
  )
}

export default Signup