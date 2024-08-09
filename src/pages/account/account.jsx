import React from "react";
import { RiDashboard2Fill, RiDashboard3Fill, RiDashboardFill, RiDashboardHorizontalFill, RiDashboardLine, RiLogoutBoxRFill, RiLogoutCircleRFill } from "react-icons/ri";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Account = ({ user }) => {
  const {setIsAuth,setUser} = UserData();

  const navigate = useNavigate()

  const logoutHandler = ()=>{
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully...");
    navigate("/login");
  }
  return (
    <div className="bg-gray-100 p-10 rounded-lg shadow-md max-w-md mx-auto md:mt-28 mb-32">
      {user && (
        <div>
          {" "}
          <h2 className="text-2xl font-bold mb-5">My Profile</h2>
          <div className="text-left mt-4">
            <p className="mb-3 text-gray-800">
              <strong className="text-cyan-700">Name - {user.name}</strong>
            </p>
            <p className="mb-3 text-gray-800">
              <strong className="text-cyan-700">Email - {user.email}</strong>
            </p>
            <div className="flex flex-col gap-6">
             {user.role ==="user" &&(
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="flex items-center gap-2 py-3 px-6 bg-cyan-700 text-white rounded-lg transition duration-300 ease-in-out "
              >
                <RiDashboardFill className="text-xl" />
                Dashboard
              </button>
             )}

              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="flex items-center gap-2 py-3 px-6 bg-cyan-700 text-white rounded-lg transition duration-300 ease-in-out "
                >
                  <RiDashboardLine className="text-xl" />
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 py-3 px-6 bg-red-700 text-white rounded-lg transition duration-300 ease-in-out "
              >
                <RiLogoutCircleRFill className="text-xl" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
