import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuthHook } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginSection = () => {
  const { setLSToken, setLSUser, logInUser } = useAuthHook();
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setUserData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:3002/api/auth/login",
        headers: {},
        data: userData,
      });

      setLSToken(result.data.token);
      setLSUser(result.data.user);

      setUserData({
        email: "",
        password: "",
      });
      navigate("/");
      toast.success("login succesful");
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
      {logInUser ? (
        <Navigate to="/" />
      ) : (
        <div className="container">
          <div className="register">
            <h1 className="main_heading">Login your account</h1>
            {/* <div className=""> */}
            <div className="register_form">
              <form onSubmit={createUser}>
                <div className="register_main_row">
                  <label className="text" htmlFor="email">
                    Email
                  </label>
                  <br />
                  <input
                    placeholder="Email"
                    type="email"
                    className="text"
                    name="email"
                    value={userData.email}
                    id="email"
                    onChange={inputEvent}
                    required
                  />
                </div>

                <div className="register_form_row">
                  <div className="form_sub_row">
                    <label className="text" htmlFor="password">
                      Password
                    </label>
                    <br />
                    <input
                      placeholder="Password"
                      type={showPass ? "password" : "text"}
                      className="text"
                      name="password"
                      value={userData.password}
                      id="password"
                      onChange={inputEvent}
                      required
                    />
                  </div>
                </div>
                <div className="cheack_box_row show_pass">
                  <div onClick={() => setshowPass(!showPass)}>
                    <input type="checkbox" id="showPass" />
                  </div>
                  <label className="text" htmlFor="showPass">
                    Show Password
                  </label>
                </div>

                <button className="btn" type="submit">
                  Login
                </button>
              </form>
              {/* </div> */}
            </div>
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSection;
