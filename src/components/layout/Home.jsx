import { useState } from 'react'
import './Home.css'
import Fan from "../sections/sketch/Fan"


const Home = () => {

  return (
    <>
    <div className="home-img">
      <div className='home-sketch'>
      <Fan/>
     </div>
    </div>

    </>
  )
}

export default Home
