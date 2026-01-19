import React from 'react'
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")

const navigate =  useNavigate()

const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
      const response  = await axios.post("http://localhost:5000/auth/login",{email,password})
  
      if(response.status === 200){
        localStorage.setItem("token",response.data.token)
        alert("login successfully")
        navigate('/home')

      }


  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div className='login'>
      <div className='l2'>
        <h2>LogIn</h2>

        <form action="submit" onSubmit={handleSubmit}>

           <div>
            <label className="label" htmlFor="Email">Email</label>
            <input value={email} className="input"  type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input value={password} className="input" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
          </div>

           <button className="btn-sub">Submit</button>
        </form>
              <div style={{ marginTop: "20px" }}>
  <button
    className="btn-google"
    onClick={() =>
      window.open("http://localhost:5000/auth/google", "_self")
    }
  >
    <img src="https://imgs.search.brave.com/kZt1tVCEekCPQSwPcgVUwePcBPaf91migsBz5s_SFZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaWNvbi1pY29u/cy5jb20vMTU4NC9Q/TkcvOTYvMzcyMTY3/MS1nb29nbGVfMTA4/MDU0LnBuZw"/>
    Login with Google
  </button>
</div>
        <div>
            <p>Don't have account? <NavLink to="/">Register</NavLink></p>
            
        </div>
      </div>

         
  
    </div>
  )
}

export default Login
