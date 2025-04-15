import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/layout";
import toast from "react-hot-toast";
import { server } from "../../main";
import { Button, Modal, notification } from "antd";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/"); // Redirect if not superadmin
  const [users, setUsers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch all users from the API
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch users. Please try again later.",
      });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update the role of a user
  const updateRole = async (id) => {
    setConfirmLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/api/user/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      notification.success({
        message: "Success",
        description: data.message,
      });
      fetchUsers(); // Refresh the users list after updating
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      setConfirmLoading(false);
      setCurrentUser(null); // Reset current user after the update
    }
  };

  // Show the confirmation modal to update role
  const showConfirmModal = (user) => {
    setCurrentUser(user);
    Modal.confirm({
      title: "Are you sure you want to update this user's role?",
      onOk: () => updateRole(user._id),
      okText: "Yes",
      cancelText: "No",
      confirmLoading: confirmLoading,
    });
  };

  return (
    <div className="bg-gradient-to-t from-slate-50 to-teal-100 min-h-screen">
      <Layout>
        <div className="flex flex-col items-center mt-10 px-4">
          <h1 className="text-3xl font-semibold mb-6">All Users</h1>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200 shadow-md text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">#</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Role</th>
                  <th className="px-4 py-2 border-b">Update Role</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((e, i) => (
                    <tr key={e._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{i + 1}</td>
                      <td className="px-4 py-2 border-b">{e.name}</td>
                      <td className="px-4 py-2 border-b">{e.email}</td>
                      <td className="px-4 py-2 border-b">{e.role}</td>
                      <td className="px-4 py-2 border-b">
                        <Button
                          onClick={() => showConfirmModal(e)}
                          type="primary"
                          className="bg-cyan-600 hover:bg-cyan-500"
                        >
                          Update Role
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 border-b text-center">
                      No Users Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminUsers;
