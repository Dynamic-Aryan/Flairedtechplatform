import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';
import { Input, Button } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <div className='bg-white p-8 rounded-lg shadow-md w-fit md:w-[400px] lg:w-[400px]'>
        <h2 className='text-2xl text-cyan-400 mb-4 text-center'>Login</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="email" className="block mb-1 text-sm text-gray-800">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className="mb-4"
          />

          <label htmlFor="password" className="block mb-1 text-sm text-gray-800">Password</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            className="mb-4"
          />

          <Button
            disabled={btnLoading}
            type="primary"
            htmlType="submit"
            className="w-full py-2 mt-2"
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-cyan-700 hover:underline">Register...</Link>
        </p>
        <p className="text-center">
          <Link to="/forgot" className="text-cyan-700 hover:underline">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
