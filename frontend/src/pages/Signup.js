import React from 'react'
import './Signup.css'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const navigate=useNavigate()
    const signup=async()=>{
        const inputs=document.querySelectorAll('input')
        const username=inputs[0].value
        const email=inputs[1].value
        const password=inputs[2].value
        const contactNo=inputs[3].value
        const TC=inputs[4]
        if(TC.checked){
            try{
                const response=await fetch('http://localhost:3000/signup',{
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username,email,password,contactNo })
                    ,})
                const data=await response.json()
                alert(Object.values(data))
                if(response.ok){
                    
                    navigate('/login')
                }
                
            }
            catch(err){
                alert(err)
            }
                        }
        else{
            alert('accept our T&C to forward')
        }
    }
  return (
    <div className="signup-main">
      <div className="box">

        <h1>Sign-up</h1>

        <div className="bb">
            <input type="text"  value="xxxy" required placeholder="Name" />\
        </div>

        <div className="bb">
            <input type="email" value="xxxy" required placeholder="Email" />
        </div>

        <div className="bb">
            <input type="password" value="xxx" required placeholder="Password" />
        </div>

        <div className="bb">
            <input type="tel" value='90909' required placeholder="Contact Number" />
        </div>

        <div className="check-box">
            <label><input type="checkbox" checked={true} required />Terms and conditions agreement</label>
        </div>

        <div>
            <button class="btn" onClick={()=>{signup()}}>Submit</button>
        </div>
        
        </div>
    </div>
  )
}

export default Signup