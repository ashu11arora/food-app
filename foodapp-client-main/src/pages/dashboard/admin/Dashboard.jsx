import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import image from "../admin/image.jpg";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";


const Dashboard = () => {
  const { user } = useContext(AuthContext);


  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    
    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  console.log(users.length);


  const [menu,]=useMenu();
  console.log(menu);
  
  console.log("this is admin", user);

  refetch();
  return (

    <div className="flex justify-center items-center min-h-screen  ">
      <div className="max-w-2xl mx-auto p-8   flex flex-col ">
    <div className="bg-cyan-700 rounded-lg shadow-2xl p-6 mb-6 text-white shadow-blue ">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.displayName}</h1>
      <br/>
      <div className="flex flex-col items-center mb-4">
        <img src={image} alt="User Avatar" className="rounded-full w-64 h-64 shadow-2xl shadow-white   mr-4" />
        <div>
        <br/>
          <h2 className="text-lg font-semibold">{user.email}</h2>
          
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  ">
      <div className=" rounded-lg shadow-md p-6 bg-sky-50">
        <h2 className="text-lg font-bold mb-4">Total Users</h2>
        <p className="text-xl font-semibold">{users.length}</p>
      </div>

      <div className="bg-sky-50 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Total Menu Items</h2>
        <p className="text-xl font-semibold">{menu.length}</p>
      </div>
    </div>
  </div>
    </div>
    

     
  );
};

export default Dashboard;
