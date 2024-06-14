/* eslint-disable no-unused-vars */
import React from 'react'
import Icon1 from "../assets/herobannerIcon-1.png"
import Icon2 from "../assets/herobannerIcon-2.png"
import Icon3 from "../assets/herobannerIcon-3.png"


function Communitybanner() {
  return (
    <div className='flex flex-col justify-center items-center gap-y-12'>
        <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl text-gray-600 font-semibold'>Manage your entire community in a single system</p>
            <p className='text-base'>Why <span className='text-lg font-semibold text-gray-600'>Tech Buddy</span>?</p>
        </div>
        <div className='flex justify-evenly w-full'>
        <div className="h-64 w-72  rounded shadow-xl flex flex-col justify-evenly items-center p-4">
                <img src={Icon1} alt="" className='w-12 h-10'/>
                <div className="text-xl font-semibold">Membership<br/>Organisations</div>
                <div className='text-sm text-center'>Our membership management software provides full automation of membership renewals and payments</div>
        </div>
        <div className="h-64 w-72  rounded shadow-xl flex flex-col justify-evenly items-center p-4">
                <img src={Icon2} alt="" className='w-12 h-10'/>
                <div className="text-xl font-semibold">Institutions</div>
                <div className='text-sm text-center'>Our membership management software provides full automation of membership renewals and payments</div>
        </div>
        <div className="h-64 w-72  rounded shadow-xl flex flex-col justify-evenly items-center p-4">
                <img src={Icon3} alt="" className='w-12 h-10'/>
                <div className="text-xl font-semibold text-center">Clubs And <br/>Groups</div>
                <div className='text-sm text-center'>Our membership management software provides full automation of membership renewals and payments</div>
        </div>
            
        </div>
    </div>
  )
}

export default Communitybanner