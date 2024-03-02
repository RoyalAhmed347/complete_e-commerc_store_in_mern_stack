import React from "react";
import PageTitle from "./PageTitle";
import { useAdminAuthHook } from "../../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

const DeshbordSection = () => {
  const { cruntAdmin, isLoading } = useAdminAuthHook();
  return (
    <>
      {!cruntAdmin ? (
        <Navigate to="/admin/login" />
      ) : (
        <section className="w-full p-4">
          <PageTitle />
        </section>
      )}
    </>
  );
};

export default DeshbordSection;
