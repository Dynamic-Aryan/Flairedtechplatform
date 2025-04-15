import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { Input, Button } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-fit md:w-[400px] lg:w-[400px]">
        <h2 className="text-2xl text-cyan-400 mb-4 text-center">Register</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="name" className="block mb-1 text-sm text-gray-800">
            Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="mb-4"
          />
          
          <label htmlFor="email" className="block mb-1 text-sm text-gray-800">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="mb-4"
          />

          <label htmlFor="password" className="block mb-1 text-sm text-gray-800">
            Password
          </label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mb-4"
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2 mt-2"
            disabled={btnLoading}
          >
            {btnLoading ? "Please Wait..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
