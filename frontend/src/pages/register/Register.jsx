import React from "react";
import './register.css'
import { NavLink } from 'react-router-dom'
import { useState } from "react";

const Register = () => {
  const[name,setName]  = useState('')
  const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

   const handleSubmit = (e)=>{
    e.preventDefault()
     console.log({
    name: name,
    email: email,
    password: password
  })
   }

  return (
    <div className="register">
      <div className="r2">
        <h2 className="heading">Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="username">UserName</label>
            <input className="input" onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Username" />
          </div>

          <div>
            <label className="label" htmlFor="Email">Email</label>
            <input className="input" onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Enter Email" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
          </div>

           <button type="submit" className="btn-sub">Submit</button>
        </form>
       
        <div>
            <p>Already have account? <NavLink to="/login">Login</NavLink></p>
            
        </div>
      </div>
    </div>
  );
};

export default Register;
