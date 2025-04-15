import React, { useState } from "react";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
import { Button, Modal } from "antd";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/course/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchCourses();
      setIsModalVisible(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white shadow-lg p-5 rounded-2xl w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 flex flex-col">
      {/* Image with Fallback */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl mb-4">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyxdAZkpMRYodcJYb7GR4pgFD__4xZZt1Tw&s";
          }}
        />
      </div>

      {/* Course Info */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{course.title}</h3>
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p><span className="font-medium">Instructor:</span> {course.createdBy}</p>
        <p><span className="font-medium">Duration:</span> {course.duration} weeks</p>
        <p><span className="font-medium">Price:</span> ₹ {course.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              user.subscription.includes(course._id) ? (
                <Button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                >
                  Study
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                >
                  Get Started
                </Button>
              )
            ) : (
              <Button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                Study
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Get Started
          </Button>
        )}

        {/* Delete Button for Admin */}
        {user && user.role === "admin" && (
          <Button
            onClick={showDeleteConfirm}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete
          </Button>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={() => deleteHandler(course._id)}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </div>
  );
};

export default CourseCard;
