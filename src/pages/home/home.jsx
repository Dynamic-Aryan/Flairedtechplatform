import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Testimonials from '../../components/testimonials/testimonials.jsx';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-teal-100">
      {/* Hero Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-800">
            Unleash Your <span className="text-teal-600 underline">Flair</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10">
            Greatness is built on effort. Take the first step toward your purpose today.
          </p>
          <Button
            type="primary"
            size="large"
            className="!bg-teal-600 !text-white !font-semibold !px-8 !py-3 !rounded-xl hover:!bg-teal-500 transition-all"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-slate-100">
        
          <Testimonials />
        
      </section>
    </div>
  );
};

export default Home;
