import React from "react";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const {user,isAuth} = UserData();

  const {fetchCourses} = CourseData()
  const deleteHandler = async(id)=>{
  if(confirm("Are you sure you want to delete this course")){
    try{
      const {data} = await axios.delete(`${server}/api/course/${id}`,{
        headers:{
          token : localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchCourses();
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  }
  return (
    <div className="bg-white shadow-md p-5 rounded-lg text-center w-96 transition-shadow duration-300 hover:shadow-lg">
      <img
        src={`${server}/${course.image}`}
        alt=""
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl text-gray-800 mb-2 font-bold ">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-1 text-left">
        <span className="font-semibold">Instructor</span>- {course.createdBy}
      </p>
      <p className="text-sm text-gray-600 mb-1 text-left">
        <span className="font-semibold">Duration</span>- {course.duration} weeks
      </p>
      <p className="text-sm text-gray-600 mb-3 text-left"><span className="font-semibold">Price</span>- ₹ {course.price}</p>
      <div className="flex flex-col ">
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn py-3 px-6 bg-gray-700 text-white rounded-lg"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn py-3 px-6 bg-gray-700 text-white rounded-lg"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn py-3 px-6 bg-gray-700 text-white rounded-lg"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn py-3 px-6 bg-gray-700 text-white rounded-lg">
          Get Started
        </button>
      )}
      <br/>
      {user && user.role === "admin" && (
        <button
        onClick={()=> deleteHandler(course._id)}
        className="common-btn py-3 px-6 bg-red-700 text-white rounded-lg"
        >
         Delete
        </button>
      )}
      </div>
     
    </div>
  );
};

export default CourseCard;
