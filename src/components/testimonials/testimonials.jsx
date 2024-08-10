import React from "react";
import testimonialsData from "./testimonials.js";
const Testimonials = () => {
  return (
    <section className="p-10 py-20 text-center bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585]">
      <h2 className="text-4xl text-gray-200 mb-8 font-bold">Here are some reviews</h2>
      <div className="grid md:grid-cols-4 justify-center gap-8">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="bg-zinc-200 shadow-md p-6  border-gray-300 border-[20px] rounded-lg w-fit text-left flex flex-col items-center  md:text-center"
          >
            <div className="mb-4">
              <img
                src={e.image}
                alt={e.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <p className="text-lg text-gray-800 mb-4">{e.message}</p>
            <div className="text-center">
              <p className="text-xl font-bold text-cyan-700 mb-1">{e.name}</p>
              <p className="text-sm text-gray-600">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
