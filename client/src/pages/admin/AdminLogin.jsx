import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuthHook } from "../../context/AdminAuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const { setLSToken, setCruntAdmin, cruntAdmin } = useAdminAuthHook();
  const navigate = useNavigate();

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prvVel) => {
      return {
        ...prvVel,
        [name]: value,
      };
    });
  };

  const logInUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        url: "http://localhost:3002/api/admin/auth/login",
        method: "POST",
        data: loginDetails,
      });

      setLSToken(result.data.token);
      setCruntAdmin(result.data.user);

      toast.success(result.data.message);
      navigate("/admin/deshbord");
    } catch (error) {
      toast.error(
        error.response.data.errorDetails
          ? error.response.data.errorDetails
          : error.response.data.message
      );
    }
  };

  return (
    <>
      <section className="w-full h-screen bg-white  flex justify-center items-center">
        <div className="w-[350px] h-[350px] bg-slate-50  drop-shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full bg-blue px-4 py-2 text-center">
            <h1 className="font-semibold text-2xl text-white">Admin Login</h1>
          </div>

          <div className="w-full h-60 px-[45px] flex justify-center items-center">
            <form className="w-full pt-8" onSubmit={logInUser}>
              <div className="mb-3">
                <label htmlFor="email" className="ml-1 ">
                  Email
                </label>
                <br />
                <input
                  className="border-2 w-full rounded-sm text-lg mt-1 px-2 py-1 border-12 focus:border-blue outline-none border-blue "
                  type="text"
                  name="email"
                  id="email"
                  onChange={inputEvent}
                  value={loginDetails.email}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="ml-1 ">
                  Password
                </label>
                <br />
                <input
                  className="border-2 w-full rounded-sm text-lg mt-1 px-2 py-1 border-12 focus:border-blue outline-none border-blue "
                  type="password"
                  name="password"
                  id="password"
                  onChange={inputEvent}
                  value={loginDetails.password}
                />
              </div>
              <div className="mb-3">
                <button
                  className="cursor-pointer w-auto rounded-0 text-lg text-white bg-blue mt-1 px-2 py-1  "
                  type="submit"
                  id="password"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
