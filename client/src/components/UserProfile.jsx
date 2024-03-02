import { useAuthHook } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const UserProfile = () => {
  const { logInUser } = useAuthHook();

  return (
    <>
      {!logInUser ? (
        <Navigate to="/" />
      ) : (
        <section className="w-full p-4">
          <div className="w-full h-fullbg-white flex flex-col items-center justify-center py-3 gap-4">
            <div className="bg-white w-1/3  p-4 w-full flex flex-col gap-3 items-center justify-center">
              <div className="w-60 h-60 overflow-hidden rounded-full">
                <img
                  src={`http://localhost:3002/${logInUser.avtarURL}`}
                  alt="user"
                  className=""
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <h1 className="text-xl font-bold">
                  {logInUser.firstName + " " + logInUser.lastName}
                </h1>
                <p>Admin</p>
              </div>
            </div>
            <div className="w-full p-3 bg-white  flex flex-col justify-center items-center">
              <div className="w-full">
                <h1 className="text-xl text-blue ">Profile Details</h1>
              </div>
              <div className="w-full mt-6 ">
                <table className="w-full  ">
                  <tbody>
                    <tr className="w-full">
                      <td className=" md:w-1/4">First Name : </td>
                      <td className="text-gray-400 px-4">
                        {logInUser.firstName}
                      </td>
                    </tr>
                    <tr className="w-1/2">
                      <td className=" md:w-1/4">Last Name : </td>
                      <td className="text-gray-400 px-4">
                        {" "}
                        {logInUser.lastName}
                      </td>
                    </tr>
                    <tr className="w-full">
                      <td className=" md:w-1/4">Email : </td>
                      <td className="text-gray-400 px-4"> {logInUser.email}</td>
                    </tr>
                    <tr className="w-full">
                      <td className=" md:w-1/4">Phone : </td>
                      <td className="text-gray-400 px-4"> {logInUser.phone}</td>
                    </tr>
                    <tr className="w-full">
                      <td className=" md:w-1/4">Role : </td>
                      <td className="text-gray-400 px-4"> Admin</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6">
                  <Link to="/update_profile">
                    <button className="border-2 bg-blue text-white py-1 px-4 ">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfile;
