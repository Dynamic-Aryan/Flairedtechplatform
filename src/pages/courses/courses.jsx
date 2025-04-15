import React from "react";
import { CourseData } from "../../context/CourseContext";
import { Card, Spin, Empty } from "antd";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <div className="py-20 text-center min-h-[60vh] bg-gradient-to-t from-slate-50 to-teal-100">
      <h2 className="text-2xl md:text-4xl text-gray-800 mb-8 font-bold">
        Following Courses are available
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {courses === undefined ? (
          <Spin size="large" />
        ) : courses && courses.length > 0 ? (
          courses.map((e) => (
            <CourseCard key={e._id} course={e} />
          ))
        ) : (
          <Empty description="No courses available" />
        )}
      </div>
    </div>
  );
};

export default Courses;
