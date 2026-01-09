import React from 'react'
import './login.css'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <div className='l2'>
        <h2>LogIn</h2>

        <form action="">

           <div>
            <label className="label" htmlFor="Email">Email</label>
            <input className="input"  type="email" placeholder="Enter Email" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" type="password" placeholder="Enter Password" />
          </div>

           <button className="btn-sub">Submit</button>
        </form>
        <div>
            <p>Don't have account? <NavLink to="/register">Register</NavLink></p>
            
        </div>
      </div>

         
  
    </div>
  )
}

export default Login
