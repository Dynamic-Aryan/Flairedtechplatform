import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // If the user is not an admin and hasn't subscribed to the course, redirect
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  return (
    <div className="bg-gradient-to-t from-slate-50 to-teal-100 min-h-screen">
      {course && (
        <div className="py-12 flex flex-col items-center min-h-[80vh]">
          <div className="max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <img
              src={`${server}/${course.image}`}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{course.description}</p>
              <p className="text-lg text-gray-600 mb-2">by - {course.createdBy}</p>
              <p className="text-lg text-gray-600 mb-4">Duration - {course.duration} weeks</p>
              <Link
                to={`/lectures/${course._id}`}
                className="inline-block bg-cyan-700 text-white py-2 px-6 rounded-md hover:bg-cyan-800"
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
