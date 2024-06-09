import React from 'react'
import Questions from "../components/Questions"
import ExploreNav from '../components/ExploreNav'

function QuestionsPage() {
  return (
    <div className='flex flex-col gap-y-5'>
        <ExploreNav/>
        <Questions/>
    </div>
  )
}

export default QuestionsPage