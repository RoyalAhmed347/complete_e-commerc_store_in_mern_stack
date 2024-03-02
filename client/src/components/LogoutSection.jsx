import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthHook } from "../context/AuthContext";
import { toast } from "react-toastify";
const LogoutSection = () => {
  const navigate = useNavigate();
  const { removeLSToken, removeLSUser, setLogInUser } = useAuthHook();
  useEffect(() => {
    localStorage.removeItem("auth");

    removeLSToken();
    removeLSUser();
    setLogInUser(null);
    navigate("/login");
    toast.success("Logout succesful");
  }, []);

  return (
    <>
      <Navigate />
    </>
  );
};

export default LogoutSection;
