import React, { useEffect, useState } from "react";
import { FaCameraRetro } from "react-icons/fa6";
import { Form, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAdminAuthHook } from "../../context/AdminAuthContext";

const ProfileUpdate = () => {
  const { cruntAdmin, adminToken, getAdminData } = useAdminAuthHook();

  const [user, setUser] = useState("");
  const [image, setimage] = useState({
    preview: "",
    data: "",
  });

  useEffect(() => {
    const { firstName, lastName, phone, email } = cruntAdmin;
    setUser({
      firstName,
      lastName,
      phone,
      email,
      password: "",
      c_password: "",
    });
  }, []);

  const inputHendller = (e) => {
    const { name, value } = e.target;
    setUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const imgHendller = (e) => {
    const pre = URL.createObjectURL(e.target.files[0]);
    const img = e.target.files[0];
    setimage({
      preview: pre,
      data: img,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!image.data) {
      toast.info("pleas select an image");
      return;
    }
    console.log(image.preview);
    try {
      const formData = new FormData();

      formData.append("file", image.data);
      const result = await axios.patch(
        "http://localhost:3002/api/admin/auth/admin/profileImg",
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log("🚀 ~ updateProfile ~ result:", result);
      toast.success(result.data.message);
      getAdminData(adminToken);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHeandller = async (e) => {
    e.preventDefault();
    if (user.password !== user.c_password) {
      toast.info("pleas enter same Password ");
      return;
    }
    try {
      const result = await axios.patch(
        "http://localhost:3002/api/admin/auth/admin",
        user,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log(result);
      toast.success("Profile Updated");
      getAdminData(adminToken);
    } catch (error) {
      console.log("🚀 ~ submitHeandller ~ error:", error);
      toast.error(
        error.response.data.errorDetails
          ? error.response.data.errorDetails
          : error.response.data.message
      );
    }
  };

  return (
    <>
      {!cruntAdmin ? (
        <Navigate to="/admin/login" />
      ) : (
        <section className="w-full h-full">
          <div className="container py-7 px-4">
            <div className="md:px-16 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Edit Profile</h1>
              <div className="  flex flex-col justify-center items-center gap-2">
                <div className="w-28 h-28  overflow-hidden rounded-full ">
                  <label htmlFor="img_upload" className="">
                    <img
                      src={
                        image.preview
                          ? image.preview
                          : `http://localhost:3002${cruntAdmin.avtarURL}`
                      }
                      className="cursor-pointer z-[-10]"
                      alt="profile"
                    />
                    {/* <FaCameraRetro
                      className="absolute bottom-1 right-10 text-amber-text-black cursor-pointer "
                      size={22}
                    /> */}
                  </label>

                  <input
                    type="file"
                    id="img_upload"
                    onChange={imgHendller}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <button className="btn" onClick={updateProfile}>
                  Update
                </button>
              </div>
            </div>

            <div className="md:px-16">
              <form className="w-full" onSubmit={submitHeandller}>
                <div className="w-full flex py-2">
                  <div className="w-1/2 px-4">
                    <label htmlFor="">First Name</label>
                    <br />
                    <input
                      type="text"
                      name="firstName"
                      onChange={inputHendller}
                      value={user.firstName}
                      placeholder="First Name"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                  <div className="w-1/2 px-4">
                    <label htmlFor="">Last Name</label>
                    <br />
                    <input
                      type="text"
                      name="lastName"
                      onChange={inputHendller}
                      value={user.lastName}
                      placeholder="Last Name"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                </div>
                <div className="w-full flex py-2 ">
                  <div className="w-full px-4">
                    <label htmlFor="">Email</label>
                    <br />
                    <input
                      type="email"
                      onChange={inputHendller}
                      value={user.email}
                      name="email"
                      placeholder="Email"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                </div>
                <div className="w-full flex py-2 ">
                  <div className="w-full px-4">
                    <label htmlFor="">Phone Number</label>
                    <br />
                    <input
                      type="tel"
                      name="phone"
                      onChange={inputHendller}
                      value={user.phone}
                      placeholder="Phone Number"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                </div>

                <div className="w-full flex py-2">
                  <div className="w-1/2 px-4">
                    <label htmlFor="">Password</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      onChange={inputHendller}
                      placeholder="Password"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                  <div className="w-1/2 px-4">
                    <label htmlFor="">Confirm Password</label>
                    <br />
                    <input
                      type="password"
                      name="c_password"
                      onChange={inputHendller}
                      placeholder="Password"
                      className="border-2 border-gray-400 rounded-lg p-2 w-full "
                    />
                  </div>
                </div>

                <div className="w-full flex py-2">
                  <div className="w-1/2 px-4">
                    <button className="btn cursor-pointer">
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileUpdate;
