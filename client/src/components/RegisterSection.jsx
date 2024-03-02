import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuthHook } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const RegisterSection = () => {
  const { setLSToken, setLSUser, logInUser } = useAuthHook();
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
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
        url: "http://localhost:3002/api/auth/register",
        headers: {},
        data: userData,
      });

      toast.success(result.data.message);
      setLSToken(result.data.token);
      setLSUser(result.data.user);
      toast.success("login succesful");

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        c_password: "",
      });

      navigate("/");
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
            <h1 className="main_heading">Register Now</h1>
            {/* <div className=""> */}
            <div className="register_form">
              <form onSubmit={createUser}>
                <div className="register_form_row">
                  <div className="form_sub_row">
                    <label className="text" htmlFor="f_name">
                      First Name
                    </label>
                    <br />
                    <input
                      placeholder="First name"
                      type="text"
                      className="text"
                      name="firstName"
                      value={userData.firstName}
                      id="f_name"
                      onChange={inputEvent}
                      required
                    />
                  </div>

                  <div className="form_sub_row">
                    <label className="text" htmlFor="l_name">
                      Last Name
                    </label>
                    <br />
                    <input
                      placeholder="Last name"
                      type="text"
                      className="text"
                      value={userData.lastName}
                      name="lastName"
                      id="l_name"
                      onChange={inputEvent}
                      required
                    />
                  </div>
                </div>
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
                <div className="register_main_row">
                  <label className="text" htmlFor="number">
                    Phone Number
                  </label>
                  <br />
                  <input
                    placeholder="Phone number"
                    type="tel"
                    className="text"
                    name="phone"
                    value={userData.phone}
                    id="number"
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

                  <div className="form_sub_row">
                    <label className="text" htmlFor="c_password">
                      Confirm Password
                    </label>
                    <br />
                    <input
                      placeholder="Confirm password"
                      type={showPass ? "password" : "text"}
                      className="text"
                      name="c_password"
                      value={userData.c_password}
                      id="c_password"
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
                <hr />
                <div className="cheack_box_row show_pass">
                  <div className="">
                    <input type="checkbox" id="terms" required />
                  </div>
                  <label className="text" htmlFor="terms">
                    I agree terms and conditions
                  </label>
                </div>

                <button className="btn" type="submit">
                  Register
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

export default RegisterSection;
