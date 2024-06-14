/* eslint-disable no-unused-vars */
import React from 'react'
import aboutusImage from "../assets/Group.png"

function Aboutus() {
  return (
    <div className='flex flex-col gap-y-10 items-center'>
        <div className='font-semibold text-2xl text-gray-600'>About Us</div>

        <div className='flex items-center justify-between w-4/5 px-10'>
            
            <img src={aboutusImage} alt="" className='h-82 w-72'/>

            <div className="w-3/5">
                <p>At Tech Buddy, we are passionate about fostering a community of developers and creators. Our platform provides a space to share, collaborate, and innovate with code snippets. Join us to connect, learn, and build together.</p>
            </div>
        </div>
        
    </div>
  )
}

export default Aboutus