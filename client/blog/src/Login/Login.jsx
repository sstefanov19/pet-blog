import React, { useState } from 'react';
import './login.css';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import {Link} from "react-router-dom"

const Login = ({setAuth}) => {
  

  const [inputs , setInputs] = useState({
    email : "",
    password : "",
  });

  const {email , password} = inputs;

  const onChange = e => {
    setInputs({...inputs , [e.target.name] : e.target.value});
}

  const onSubmitForm = async (e) => {
      e.preventDefault();
      const body = {email ,  password}
      const response = await fetch("http://localhost:5000/auth/login" , {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(body)
      });
        const data = await response.json();
        if (data.jwtToken) {
          localStorage.setItem("token", data.jwtToken);
          setAuth(true);
          
        } else {
          setAuth(false);
        }
      
      try {
        
      } catch (error) {
        console.error(error.message)        
      }
  }



  return (
    <>
      <body className="login-page">
        <div className="wrapper">
          <form onSubmit={onSubmitForm}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                name="email"
                values={email}
                onChange={e => onChange(e) }
                placeholder="Email"
                required
                
               
              />
              <FaUserAlt className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                values={password}
                onChange={e => onChange(e)}
                placeholder="Password"
                required
               
              />
              <FaLock className="icon" />
            </div>
            <button >Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?{' '}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </body>
    </>
  );
};

export default Login;
