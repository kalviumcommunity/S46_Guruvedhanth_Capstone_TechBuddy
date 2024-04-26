import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { usernameState } from '../Recoil'; 
import axios from "axios";
import google from "../assets/google.png"

function LoginDetails() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState("");
  const [username, setUsername] = useRecoilState(usernameState);
  const [error, setError] = useState(null);


  const handleGoogle = async () => {
    try {
      const googleLoginWindow = window.open("http://localhost:3000/api/users/google");
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while initiating Google login.');
      console.error('Full Error:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
    }else if(name=="username"){
      setUsernameInput(e.target.value)
    }
  };

  const handleSubmit=(e)=>{

    e.preventDefault();
    setError(null);

    axios
      .post("http://localhost:3000/api/users/login", {
        username:usernameInput,
        password: password,
      })
      .then((response) => {
        setUsername(usernameInput);
        console.log("Sucess")
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className='flex flex-col justify-center items-center gap-y-16'>
      <div className='flex flex-col justify-center items-center gap-y-5 text-center	'>
        <p className='font-bold	text-2xl	'>Welcome!</p>
        <p className=''>Welcome to our code sharing platform! Get ready <br />to achieve your goals.</p>
      </div>
      <div className='flex flex-col gap-y-7 justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-y-5'>
          <input
            type="text"
            placeholder='Username'
            name="username"
            value={usernameInput}
            onChange={handleChange}
            className='h-10 w-72 appearance-none border-b border-gray-400 focus:outline-none'
          />
          <input 
            type="password" 
            name="password" 
            placeholder='Password'
            value={password}
            onChange={handleChange}
            className='h-10 w-72 appearance-none border-b border-gray-400 focus:outline-none'
          />
      
          {error && <p className="text-red-500 m-2">{error}</p>}
          <div className='flex justify-between items-center w-64'>
            <input type="checkbox" />
            <label >I agree to terms and conditions</label>
          </div>

          <button onClick={handleSubmit} className='h-10 w-72 bg-green-500	rounded'>Login</button>
        </div> 

        <div className='flex justify-between px-12 items-center h-10 w-80 border border-gray-500 rounded-md' onClick={handleGoogle}>
          <img src={google} alt="" className='h-6 w-6'/><div className='font- text-xl'>sign-in with google</div>
        </div>

        <div className='flex gap-x-3 items-center'><p>New user ? </p> <p className='text-xl font-bold text-green-600'>Signup</p></div>
      </div>
    </div>
    
  );
}

export default LoginDetails;