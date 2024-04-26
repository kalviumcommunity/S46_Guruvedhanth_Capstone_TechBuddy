import React from 'react'
import SignupDetails from '../components/SignupDetails'
import AuthComponent from '../components/AuthComponent';

function SignupPage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-row justify-center items-center gap-x-56'>
        <div className='w-80 h-96 hidden md:flex'>
        <AuthComponent/>
        </div>
        <SignupDetails/>
      </div>
    </div>
  )
}

export default SignupPage