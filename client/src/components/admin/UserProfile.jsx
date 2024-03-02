import React from "react";
import PageTitle from "./PageTitle";
import { useAdminAuthHook } from "../../context/AdminAuthContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { cruntAdmin } = useAdminAuthHook();
  return (
    <>
      <section className="w-full p-4">
        <PageTitle />
        <div className="w-full h-fullbg-white flex flex-col items-center justify-center py-3 gap-4">
          <div className="bg-white w-1/3  p-4 w-full flex flex-col gap-3 items-center justify-center">
            <div className="w-60 h-60 rounded-full overflow-hidden">
              <img
                src={`http://localhost:3002${cruntAdmin.avtarURL}`}
                alt="user"
                className=" "
              />
            </div>
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-xl font-bold">
                {cruntAdmin.firstName + " " + cruntAdmin.lastName}
              </h1>
              <p>Admin</p>
            </div>
          </div>
          <div className="w-full p-3 bg-white">
            <div className="w-full">
              <h1 className="text-xl text-blue ">Profile Details</h1>
            </div>
            <div className="w-full mt-6">
              <table className="w-full">
                <tr className="w-full">
                  <td className=" w-1/4">First Name : </td>
                  <td className="text-gray-400 px-4">{cruntAdmin.firstName}</td>
                </tr>
                <tr className="w-full">
                  <td className=" w-1/4">Last Name : </td>
                  <td className="text-gray-400 px-4"> {cruntAdmin.lastName}</td>
                </tr>
                <tr className="w-full">
                  <td className=" w-1/4">Email : </td>
                  <td className="text-gray-400 px-4"> {cruntAdmin.email}</td>
                </tr>
                <tr className="w-full">
                  <td className=" w-1/4">Phone : </td>
                  <td className="text-gray-400 px-4"> {cruntAdmin.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className=" w-1/4">Role : </td>
                  <td className="text-gray-400 px-4"> Admin</td>
                </tr>
              </table>
              <div className="mt-6">
                <Link to="/admin/update_profile">
                  <button className="border-2 bg-blue text-white py-1 px-4 ">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
