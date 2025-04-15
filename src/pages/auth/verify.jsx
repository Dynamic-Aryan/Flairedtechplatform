import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import { Input, Button } from "antd";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-fit md:w-[400px] lg:w-[400px]">
        <h2 className="text-2xl text-cyan-400 mb-4">Verify Account</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="otp" className="block mb-1 text-sm text-gray-800">
            OTP
          </label>
          <Input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="mb-4"
          />
          
          <ReCAPTCHA 
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
            onChange={onChange} 
            className="mb-4"
          />

          {show && (
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 mt-2"
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Verify"}
            </Button>
          )}
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
