import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className=" py-20 text-center min-h-[60vh] bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585]">
      <h2 className="text-2xl md:text-4xl text-gray-200 mb-8 font-bold">
        Following Courses are available
      </h2>
      <div className=" flex flex-wrap justify-center gap-8">
        {
            courses && courses.length > 0 ?courses.map((e)=>(
                <CourseCard key={e._id} course={e}/>
            )) : <p>Empty Now!!</p>
        }
      </div>
    </div>
  );
};

export default Courses;
