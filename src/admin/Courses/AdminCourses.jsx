import React, { useState } from "react";
import Layout from "../Utils/layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { Form, Input, Button, Select, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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

  const { courses, fetchCourses } = CourseData();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    createdBy: "",
    duration: "",
    image: null,
  });

  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleImageChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: fileList[0].originFileObj,
      }));
    }
  };

  const submitHandler = async (values) => {
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", values.title);
    myForm.append("description", values.description);
    myForm.append("category", values.category);
    myForm.append("price", values.price);
    myForm.append("createdBy", values.createdBy);
    myForm.append("duration", values.duration);
    myForm.append("file", formData.image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      notification.success({
        message: "Success",
        description: data.message,
      });
      await fetchCourses();
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        createdBy: "",
        duration: "",
        image: null,
      });
      setBtnLoading(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred",
      });
      setBtnLoading(false);
    }
  };

  return (
   
      <Layout>
        <div className="container mx-auto flex flex-col gap-12 px-4">
          {/* Add New Course Form Section */}
          <div className="w-full bg-gradient-to-t from-teal-300 to-teal-500 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Add New Course</h2>
            <Form
              name="add-course-form"
              layout="vertical"
              onFinish={submitHandler}
              className="space-y-6"
            >
              <Form.Item
                label="Course Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input
                  value={formData.title}
                  name="title"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter the description" }]}
              >
                <Input.TextArea
                  rows={4}
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price" }]}
              >
                <Input
                  type="number"
                  value={formData.price}
                  name="price"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Created By"
                name="createdBy"
                rules={[{ required: true, message: "Please enter the creator" }]}
              >
                <Input
                  value={formData.createdBy}
                  name="createdBy"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Select
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Duration (in weeks)"
                name="duration"
                rules={[{ required: true, message: "Please enter the duration" }]}
              >
                <Input
                  type="number"
                  value={formData.duration}
                  name="duration"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Upload Image"
                name="file"
                rules={[{ required: true, message: "Please upload an image" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                  showUploadList={{ showRemoveIcon: true }}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={btnLoading}
                  disabled={btnLoading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {btnLoading ? "Processing..." : "Add Course"}
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Course List Section */}
          <div className="w-full space-y-6">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">All Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <p className="text-center text-gray-500">No Courses Available</p>
              )}
            </div>
          </div>
        </div>
      </Layout>
  
  );
};

export default AdminCourses;
