import React from 'react'
import Answers from '../components/Answers'
import Comments from '../components/Comments'
import AnswerNav from "../components/AnswerNav"

function AnswerPage() {
  return (
    <>
    <AnswerNav/>
    <div className='flex w-screen justify-around'>
        <Answers/>
        <Comments/>
    </div>
    </>
    
  )
}

export default AnswerPage