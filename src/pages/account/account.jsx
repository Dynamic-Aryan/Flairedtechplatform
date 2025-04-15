import React from "react";
import {
  RiDashboardFill,
  RiDashboardLine,
  RiLogoutCircleRFill,
} from "react-icons/ri";
import { Button } from "antd";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully...");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-tr from-white to-teal-100 py-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {user && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Profile</h2>

            {/* Profile Info */}
            <div className="text-left mb-8 space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-teal-600">Name:</span> {user.name}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-teal-600">Email:</span> {user.email}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              {user.role === "user" && (
                <Button
                  onClick={() => navigate(`/${user._id}/dashboard`)}
                  icon={<RiDashboardFill className="text-xl" />}
                  className="flex items-center justify-center gap-2 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-xl"
                  size="large"
                >
                  User Dashboard
                </Button>
              )}

              {user.role === "admin" && (
                <Button
                  onClick={() => navigate("/admin/dashboard")}
                  icon={<RiDashboardLine className="text-xl" />}
                  className="flex items-center justify-center gap-2 py-3 text-white bg-teal-400 hover:bg-teal-900 rounded-xl"
                  size="large"
                >
                  Admin Dashboard
                </Button>
              )}

              <Button
                onClick={logoutHandler}
                icon={<RiLogoutCircleRFill className="text-xl" />}
                className="flex items-center justify-center gap-2 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl"
                size="large"
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
