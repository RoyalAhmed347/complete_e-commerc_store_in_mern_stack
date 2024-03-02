import React, { useEffect, useState } from "react";
import "../../index.css";
import Sidebar from "./Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuthHook } from "../../context/AdminAuthContext";

const AdminLayout = () => {
  return (
    <>
      <Sidebar children={<Outlet />} />
    </>
  );
};
export default AdminLayout;
