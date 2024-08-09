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
    <>
      {course && (
        <div className="py-12  flex flex-col items-center min-h-[80vh]">
          <img src={`${server}/${course.image}`} alt="" width={350} />
          <h2 className="text-2xl text-cyan-700 text-center mt-4">
            {course.title}
          </h2>
          <h4 className="text-xl text-cyan-700 text-center mt-2">
            {course.description}
          </h4>
          <h5 className="text-lg text-cyan-700 text-center mt-2">
            by - {course.createdBy}
          </h5>
          <h5 className="text-lg text-cyan-700 text-center mt-2">
            Duration - {course.duration} weeks
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="mt-4 bg-white py-2 px-4 border border-black rounded-md"
          >
            <h2>Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
