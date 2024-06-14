/* eslint-disable no-unused-vars */
import React from 'react'
import hero from "../assets/heroimage.png"

function Herobanner() {
  return (
    <div className='flex items-center justify-around w-full  '>
    <div className='text-6xl flex flex-col gap-y-3'>Innovate on our code <p className='text-5xl text-lime-600'>Snippets!</p><p className='text-lg'>Improve the world using the technology</p></div>
        <img src={hero} alt="" className='h-80 w-82'/>
    </div>
  )
}

export default Herobanner