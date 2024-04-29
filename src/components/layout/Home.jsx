import { useState } from 'react'
import './Home.css'
import Fan from "../sections/sketch/Fan"
import BackgroundSketch from "../layout/BackgroundSketch"

const Home = () => {

  return (
    <>
    <BackgroundSketch/>
      <Fan/>
    <div className="home-img">
      <div className='home-sketch'>
     </div>
    </div>

    </>
  )
}

export default Home
