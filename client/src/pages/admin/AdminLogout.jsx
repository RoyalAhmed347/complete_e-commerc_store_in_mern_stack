import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogout = () => {
  useEffect(() => {
    localStorage.removeItem("adminToken");
    toast.success('succssful logout')
  }, []);

  return (
    <>
      <Navigate to="/admin/login" />
    </>
  );
};

export default AdminLogout;
