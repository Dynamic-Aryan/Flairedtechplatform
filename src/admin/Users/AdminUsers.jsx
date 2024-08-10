import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Utils/layout';
import toast from 'react-hot-toast';
import { server } from '../../main';


const AdminUsers = ({user}) => {
    const navigate = useNavigate();

    if(user && user.mainrole !== "superadmin") return navigate("/");
    const [users,setUsers]=useState([]);

    async function fetchUsers() {
        try{
            const {data} = await axios.get(`${server}/api/users`,{
                headers:{
                    token:localStorage.getItem("token"),
                },
            });
            setUsers(data.users);
        }catch(error){
            console.log(error);
        }
        
    }
    useEffect(() => {
        fetchUsers();
      }, []);
      
      const updateRole = async (id) => {
        if (confirm("Are you sure you want to update this user role?")) {
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
    
            toast.success(data.message);
            fetchUsers();
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
      };
    
  return (
    <div className="bg-gradient-to-t from-[rgb(55,56,56)] to-[#858585] flex">
    <Layout>
    <div className="flex flex-col items-center mt-10 px-4 ">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-[350px] w-full bg-white border border-gray-200 shadow-md text-left">
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
  {users &&
    users.map((e, i) => (
      <tr key={e._id} className="hover:bg-gray-50">
        <td className="px-4 py-2 border-b">{i + 1}</td>
        <td className="px-4 py-2 border-b">{e.name}</td>
        <td className="px-4 py-2 border-b">{e.email}</td>
        <td className="px-4 py-2 border-b">{e.role}</td>
        <td className="px-4 py-2 border-b">
          <button
            onClick={() => updateRole(e._id)}
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500"
          >
            Update Role
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
    </div>
  </Layout>
  </div>
  )
}

export default AdminUsers