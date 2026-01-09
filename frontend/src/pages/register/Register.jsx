import React from "react";
import './register.css'
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div className="register">
      <div className="r2">
        <h2 className="heading">Register</h2>
        <form>
          <div>
            <label className="label" htmlFor="username">UserName</label>
            <input className="input" type="text" placeholder="Enter Username" />
          </div>

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
            <p>Already have account? <NavLink to="/login">Login</NavLink></p>
            
        </div>
      </div>
    </div>
  );
};

export default Register;
