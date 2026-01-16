import React from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
       name,
        email,
        password,
      });

      if (response.status===201) {
        alert("registerd successfully");
        navigate('/home')
        setName("")
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      alert("error")
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="r2">
        <h2 className="heading">Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="username">
              UserName
            </label>
            <input
              className="input" value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Username"
            />
          </div>

          <div>
            <label className="label" htmlFor="Email">
              Email
            </label>
            <input
              className="input" value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input" value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="btn-sub">
            Submit
          </button>
        </form>
        <div style={{ marginTop: "20px" }}>
  <button
    className="btn-google"
    onClick={() =>
      window.open(`${API_URL}/auth/google`, "_self")
    }
  >
    <img src="https://imgs.search.brave.com/kZt1tVCEekCPQSwPcgVUwePcBPaf91migsBz5s_SFZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaWNvbi1pY29u/cy5jb20vMTU4NC9Q/TkcvOTYvMzcyMTY3/MS1nb29nbGVfMTA4/MDU0LnBuZw"/>
    Login with Google
  </button>
</div>


        <div>
          <p>
            Already have account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
