import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  
  return (
<div className="bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585]">
      {course && (
        <div className="py-12 flex flex-col items-center min-h-[80vh]">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`${server}/${course.image}`} alt={course.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-700 mb-2">{course.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{course.description}</p>
              <p className="text-lg text-gray-600 mb-2">by - {course.createdBy}</p>
              <p className="text-lg text-gray-600 mb-4">Duration - {course.duration} weeks</p>
              <Link
                to={`/lectures/${course._id}`}
                className="inline-block bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800"
              >
                <h2 className="text-lg font-semibold">Lectures</h2>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseStudy;
