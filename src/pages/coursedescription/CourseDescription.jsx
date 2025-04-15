import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { Button, QRCode, Select } from "antd";
import { FileImageOutlined } from "@ant-design/icons";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showUpiInput, setShowUpiInput] = useState(false);
  const [upiNumber, setUpiNumber] = useState("");
  const [upiProvider, setUpiProvider] = useState("ybl");
  const [confetti, setConfetti] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

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

      await axios.get(data.redirectUrl);
      await fetchUser();
      await fetchCourses();
      await fetchMyCourse();

      toast.success("Payment successful 🎉");
      setConfetti(true);

      setTimeout(() => {
        setLoading(false);
        navigate(`/course/study/${params.id}`);
      }, 2000); // Show confetti before redirect
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handlePayment = () => {
    const upiRegex = /^[0-9]{10}$/;
    if (!upiRegex.test(upiNumber)) {
      toast.error("Enter a valid 10-digit UPI number");
      return;
    }
    checkoutHandler();
  };

  if (loading) return <Loading />;

  return course ? (
    <div className="bg-gradient-to-b from-slate-50 to-teal-100 min-h-screen py-20 px-6 flex justify-center items-center relative">
      {confetti && <Confetti />}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row gap-6 p-6 md:p-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {!imgError && course.image ? (
            <img
              src={`${server}/${course.image}`}
              alt="Course"
              className="rounded-lg object-cover h-64 w-full max-w-md"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-64 w-full max-w-md bg-gray-100 flex items-center justify-center text-gray-500 text-4xl rounded-lg">
              <FileImageOutlined />
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 space-y-4 text-left">
          <h2 className="text-3xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">Instructor:</span>{" "}
            {course.createdBy}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">Duration:</span>{" "}
            {course.duration} weeks
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            {course.description}
          </p>
          <p className="text-xl text-cyan-700 font-semibold mt-4">
            ₹{course.price}
          </p>

          {user && user.subscription.includes(course._id) ? (
            <Button
              type="primary"
              className="bg-teal-600 hover:bg-teal-700 mt-4"
              size="large"
              onClick={() => navigate(`/course/study/${course._id}`)}
            >
              Start Studying
            </Button>
          ) : (
            <>
              {!showUpiInput ? (
                <Button
                  type="primary"
                  className="bg-cyan-700 hover:bg-cyan-800 mt-4"
                  size="large"
                  onClick={() => setShowUpiInput(true)}
                >
                  Buy Now
                </Button>
              ) : (
                <div className="mt-4 space-y-4">
                  <QRCode
                    value={`${
                      upiNumber
                        ? `${upiNumber}@${upiProvider}`
                        : "upi-id-placeholder@ybl"
                    }`}
                    size={160}
                    className="mx-auto"
                  />

                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      Enter 10-digit UPI Number
                    </label>
                    <input
                      type="text"
                      value={upiNumber}
                      onChange={(e) => setUpiNumber(e.target.value)}
                      placeholder="9876543210"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      Select UPI Provider
                    </label>
                    <Select
                      defaultValue="ybl"
                      style={{ width: "100%" }}
                      onChange={setUpiProvider}
                      options={[
                        { value: "ybl", label: "@ybl" },
                        { value: "ibl", label: "@ibl" },
                        { value: "okaxis", label: "@okaxis" },
                        { value: "okpaytm", label: "@okpaytm" },
                      ]}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Your UPI ID:{" "}
                    <strong>
                      {upiNumber ? `${upiNumber}@${upiProvider}` : ""}
                    </strong>
                  </p>
                  <Button
                    type="primary"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handlePayment}
                  >
                    Confirm Payment
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CourseDescription;
