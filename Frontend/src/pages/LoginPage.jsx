import React from 'react';
import LoginDetails from '../components/Logindetails';
import AuthComponent from '../components/AuthComponent';

function LoginPage() {

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-row justify-center items-center gap-x-56'>
      <div className='w-80 h-96 hidden md:flex'>
        <AuthComponent/>
        </div>
        <LoginDetails/>
      </div>
    </div>
    
  );
}

export default LoginPage;
