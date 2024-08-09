import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className=" py-20 text-center min-h-[60vh]">
      <h2 className="text-2xl md:text-4xl text-cyan-600 mb-8">
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
