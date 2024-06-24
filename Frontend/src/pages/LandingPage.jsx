import React from 'react'
import FAQs from "../components/FAQs"
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
import HeroBanner from "../components/HeroBanner"
import AboutUs from "../components/AboutUs"
import CommunityBanner from "../components/CommunityBanner"

function LandingPage() {
  return (
    <div className='flex flex-col gap-y-10'>
        <Navbar/>
        <HeroBanner/>
        <CommunityBanner/>
        <AboutUs/>
        <FAQs/> 
        <Footer/>
    </div>
  )
}

export default LandingPage