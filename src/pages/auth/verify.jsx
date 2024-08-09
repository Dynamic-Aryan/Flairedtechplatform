import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp,setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center w-fit md:w-[400px] lg:w-[400px]">
        <h2 className="text-2xl text-cyan-400 mb-4">Verify Account</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="otp" className="block mb-1 text-sm text-gray-800">
            Otp
          </label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
            
          <button
            disabled={btnLoading}
            type="submit"
            className="common-btn w-full py-2 bg-cyan-700 text-white rounded mt-2"
          >
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
           
        </form>
        <p className="mt-4">
          Go to{" "}
          <Link to="/login" className="text-cyan-700 hover:underline">
            Login
          </Link>{" "}
          page
        </p>
      </div>
    </div>
  );
};

export default Verify;
