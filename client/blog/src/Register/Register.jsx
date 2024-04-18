import React, { useState } from 'react';
import './register.css';
import { FaLock, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const Register = ({setAuth}) => {
   

   
    const [inputs , setInputs] = useState({
        email: "",
        name: "",
        password : ""
    });

    
    const {email , name , password} = inputs;

    const onChange = e => {
        setInputs({...inputs , [e.target.name] : e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, name, password};
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            let data = await response.json();
            localStorage.setItem("token", data.token);
            setAuth(true);

            onNameInput(name);
           
            
        } catch (error) {
            console.error(error.message);
        }
    }



    return (  
        <body className="profile-body">
            <div className="wrapper">
                <form onSubmit={onSubmitForm}>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input type="email" name="email" value={email} onChange={e => onChange(e)} placeholder='Email' required/>
                        <MdEmail className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input value={name} onChange={e => onChange(e)} type="text" name="name" placeholder='Username' required/>
                        <FaUserAlt className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input  type="password" name="password" value={password} onChange={e => onChange(e)} placeholder='Password' required/>
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forget">
                        <label><input type='checkbox'/> Remember me</label>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </body>
    ); 
};

export default Register;
