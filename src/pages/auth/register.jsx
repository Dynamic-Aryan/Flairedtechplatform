import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name,email, password, navigate);
  };
  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center w-fit md:w-[400px] lg:w-[400px]">
        <h2 className="text-2xl text-cyan-400 mb-4">Register</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="name" className="block mb-1 text-sm text-gray-800">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name please..."
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <label htmlFor="email" className="block mb-1 text-sm text-gray-800">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email please..."
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password please..."
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <button
            type="submit"
            disabled={btnLoading}
            className="common-btn w-full py-2 bg-cyan-700 text-white rounded mt-2"
          >
              {btnLoading ? " Wait..." : "Register"}
          </button>
        </form>
        <p className="mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-cyan-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
