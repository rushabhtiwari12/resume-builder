import React from 'react'
import Banner from '../components/Home/Banner.jsx'
import Hero from '../components/Home/Hero.jsx'
import Feature from '../components/Home/Feature.jsx'
import Testimonial from '../components/Home/Testimonial.jsx'
import CallToAction from '../components/Home/CallToAction.jsx'
import Footer from '../components/Home/Footer.jsx'

const Home = () => {
  return (
    <div>
        <Banner/> 
        <Hero/> 
        <Feature />
        <Testimonial/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home
