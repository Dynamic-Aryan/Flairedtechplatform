import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");
  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchStats();
  },[]);

  return (
    <div className="bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585]">
      <Layout>
        <div className="flex flex-col items-center mt-10 space-y-5 ">
          <div className="box bg-gray-400 hover:bg-gray-500 p-5 shadow-md rounded-md w-full max-w-sm flex  justify-between items-center cursor-pointer">
            <p className="text-white text-lg font-semibold">Total Courses</p>
            <p className="text-3xl text-gray-800 font-bold">
              {stats.totalCourses}
            </p>
          </div>
          <div className="box bg-gray-400 hover:bg-gray-500 p-5 shadow-md rounded-md w-full max-w-sm flex justify-between items-center cursor-pointer">
            <p className="text-white text-lg font-semibold">
              Total Lectures
            </p>
            <p className="text-3xl text-gray-800 font-bold">
              {stats.totalLectures}
            </p>
          </div>
          <div className="box bg-gray-400 hover:bg-gray-500 p-5 shadow-md rounded-md w-full max-w-sm flex justify-between items-center cursor-pointer">
            <p className="text-white text-lg font-semibold ">Total Users</p>
            <p className="text-3xl text-gray-800  font-bold">
              {stats.totalUsers}
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
