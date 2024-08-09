import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
        const { data } = await axios.post(
            `${server}/api/course/dummy-checkout/${params.id}`,
            {},
            {
                headers: {
                    token,
                },
            }
        );

        // Simulating a successful payment response
        await axios.get(data.redirectUrl);

        // Refresh the user's data to include the new course
        await fetchUser();
        await fetchCourses();
        await fetchCourse();
        await fetchMyCourse();  // Ensure this is called to update the enrolled courses

        toast.success("Payment successful");
        setLoading(false);
        navigate(`/course/study/${params.id}`);
    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
    }
};


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="py-20 text-center min-h-[55vh]">
              <div className="flex items-center justify-center flex-wrap gap-5 mb-10">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="w-52 h-40 object-cover rounded-lg"
                />
                <div className="text-left">
                  <h2 className="text-2xl text-gray-800">{course.title}</h2>
                  <p className="text-sm text-gray-600">
                    Instructor: {course.createdBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {course.duration} weeks
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                {course.description}
              </p>
              <p className="text-lg text-gray-800 mt-5">
                Let's get started with the course at ₹{course.price}
              </p>
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn py-3 px-6 bg-cyan-700 text-white rounded-lg"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="common-btn py-3 px-6 bg-cyan-700 text-white rounded-lg"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
