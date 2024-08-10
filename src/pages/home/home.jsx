import React from 'react';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../../components/testimonials/testimonials.jsx';
import Background from '../../assets/background1.mp4';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Section with Background Video */}
      <div className="relative overflow-hidden py-12 text-center">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={Background} type="video/mp4" />
          
        </video>
        
        <div className='relative z-10 max-w-2xl mx-auto bg-black bg-opacity-50 py-24'>
          <h1 className="text-3xl mb-5 md:text-5xl font-serif text-gray-300">Hey here is my <span className='font-extrabold text-cyan-600 underline'>FLAIR</span></h1>
          <p className="text-lg text-gray-300 mb-10 md:text-xl">
            <span className='font-semibold'>ITS</span>, <span className='font-extralight'>ALL</span>, <span className='font-medium'>ABOUT</span>, <span className='font-medium'>EFFORT</span>
          </p>
          <div className='pt-10'>
          <button
            onClick={() => navigate("/courses")}
            className='common-btn py-4 px-10 bg-cyan-600 hover:bg-cyan-400 text-white rounded-lg font-extrabold'
          >
            Here You Go!!!
          </button>
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
}

export default Home;
