import React from 'react'
import Answers from '../components/Answers'
import Comments from '../components/Comments'

function AnswerPage() {
  return (
    <div className='flex w-screen justify-around'>
        <Answers/>
        <Comments/>
    </div>
  )
}

export default AnswerPage