import React from 'react'
import FAQs from "../components/FAQs"
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <FAQs/> 
        <Footer/>
    </div>
  )
}

export default LandingPage