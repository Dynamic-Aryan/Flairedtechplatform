import React, { useState } from "react";
import Layout from "../Utils/layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Full Stack Web Development",
  "Front End Web Development",
  "Back End Web Development",
  "Android Development",
  "Flutter Development",
  "Data Structures",
  "Algorithms",
  "Machine Learning",
  "Artificial Intelligence",
  "Deep Learning",
  "Data Science",
  "Internet Of Things",
  "Cyber Security",
  "Ios Developer",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585] flex">
      <Layout>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-2xl font-bold mb-4">All Courses</h1>
          <div className="flex flex-wrap gap-4">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center min-w-[500px] bg-gradient-to-t from-[rgb(71,72,72)] to-[#a8a6a6] p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Course</h2>
          <form onSubmit={submitHandler} className="w-full">
            <label htmlFor="title" className="block mb-2 text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <label htmlFor="description" className="block mb-2 text-gray-700">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <label htmlFor="price" className="block mb-2 text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <label htmlFor="createdBy" className="block mb-2 text-gray-700">
              Created By
            </label>
            <input
              id="createdBy"
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <label htmlFor="category" className="block mb-2 text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            >
              <option value={""}>Select Category</option>
              {categories.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>

            <label htmlFor="duration" className="block mb-2 text-gray-700">
              Duration
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <input
              type="file"
              required
              onChange={changeImageHandler}
              className="w-full mb-4"
            />
            {imagePrev && (
              <img
                src={imagePrev}
                alt="Preview"
                width={300}
                className="mb-4"
              />
            )}

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-cyan-800"
            >
              {btnLoading ? "Please Wait..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default AdminCourses;
