import React from 'react'
import { useNavigate } from 'react-router-dom'
import Testimonials from '../../components/testimonials/testimonials.jsx';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='bg-gray-200 py-24 text-center'>
      <div className='max-w-2xl mx-auto'>
      <h1 className="text-3xl mb-5 md:text-4xl font-normal">Welcome to my <span className='font-extrabold text-cyan-600 underline'>FLAIR</span> Platform</h1>
      <p className="text-lg text-gray-600 mb-10 md:text-xl"><span className='font-semibold'>Learn</span>, <span className='font-extralight'>Grow</span>, <span className='font-medium'>Excel</span></p>
      <button
       onClick={()=> navigate("/courses")}
       className='common-btn py-3 px-6 bg-cyan-700 text-white rounded-lg'
      >
         Get Started
      </button>

      </div>

      </div>
      <Testimonials/>
    </div>
  )
}

export default Home