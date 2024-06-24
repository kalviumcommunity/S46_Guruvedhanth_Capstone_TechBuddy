import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { usernameState } from '../Recoil'; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie

function SignupDetails() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useRecoilState(usernameState);
  const [error, setError] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "username") {
      setUsernameInput(value);
    } else if (name === "agreeTerms") {
      setAgreeTerms(checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    axios
      .post(
        "https://s46-guruvedhanth-capstone-techbuddy.onrender.com/api/user/signup",
        { username: usernameInput, password, email },
        { withCredentials: true } // Ensure cookies are included
      )
      .then((response) => {
        const { user } = response.data;
        setUsername(user.username);
        Cookies.set('username', username, { path: '/' });
        navigate("/explore");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className='flex flex-col justify-center items-center gap-y-12'>
      <div className='flex flex-col justify-center items-center gap-y-5 text-center'>
        <p className='font-bold text-2xl'>Welcome!</p>
        <p>Welcome to our code sharing platform! Get ready <br />to achieve your goals.</p>
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
            type="email"
            name="email"
            placeholder='Email'
            value={email}
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
          {error && <p className="text-red-500 m-2 text-center">{error}</p>}
          <div className='flex justify-between items-center w-64'>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={handleChange}
            />
            <label>I agree to terms and conditions</label>
          </div>
          <button 
            onClick={handleSubmit} 
            className={`h-10 w-72 bg-green-500 rounded ${!agreeTerms && 'cursor-not-allowed opacity-50'}`} 
            disabled={!agreeTerms}
          >
            Signup
          </button>
        </div>
        <div className='flex gap-x-3 items-center'>
          <p>Already a user?</p>
          <p className='text-xl font-bold text-green-600' onClick={() => { navigate("/login") }}>Login</p>
        </div>
      </div>
    </div>
  );
}

export default SignupDetails;
