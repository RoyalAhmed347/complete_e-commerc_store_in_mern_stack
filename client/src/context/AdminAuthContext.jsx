import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState("");
  const [cruntAdmin, setCruntAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAdminData = async (adminAuthToken) => {
    const result = await axios({
      method: "GET",
      url: "http://localhost:3002/api/admin/auth/admin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminAuthToken}`,
      },
    });

    return result.data.admin;
  };

  useEffect(() => {
    const BLSToken = JSON.parse(localStorage.getItem("adminToken"));

    if (BLSToken) {
      setIsLoading(true);
      setAdminToken(BLSToken);

      const allUsers = getAdminData(BLSToken);
      allUsers
        .then((result) => {
          setCruntAdmin(result);
          setIsLoading(false);
        })
        .catch((e) => {});
    }
  }, []);

  const setWSAdmin = (admin) => {
    setCruntAdmin(admin);
  };

  const setLSToken = (userToken) => {
    setAdminToken(userToken);
    return localStorage.setItem("adminToken", JSON.stringify(userToken));
  };
  const removeLSToken = () => {
    setAdminToken("");
    setCruntAdmin("");
    alert("admin is logout");
    return localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isLoading,
        adminToken,
        cruntAdmin,
        setLSToken,
        setWSAdmin,
        removeLSToken,
        setCruntAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

const useAdminAuthHook = () => {
  return useContext(AdminAuthContext);
};

export { AdminAuthContext, AdminAuthProvider, useAdminAuthHook };
