import React, { useEffect } from "react";
import ProfileUpdate from "../components/admin/ProfileUpdate";
import { useAuthHook } from "../context/AuthContext";
import UpdateProfile from "../components/UpdateProfile";
import { useNavigate } from "react-router-dom";

const UserProfileUpdate = () => {
  const { isLoading, logInUser } = useAuthHook();

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <p>Waiting...</p>
        </div>
      ) : (
        <UpdateProfile />
      )}
    </>
  );
};

export default UserProfileUpdate;
