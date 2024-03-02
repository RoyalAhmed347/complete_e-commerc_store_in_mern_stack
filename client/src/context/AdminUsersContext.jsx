import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsersContext = createContext();

const AdminUserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const getAllProducts = async () => {
    const result = await axios({
      method: "GET",
      url: "http://localhost:3002/api/data/allusers",
    });
    return result.data.allUsers;
  };

  useEffect(() => {
    setisLoading(true);
    const AllProducts = getAllProducts();
    AllProducts.then((result) => {
      setAllUsers(result);
      setisLoading(false);
    }).catch((e) => {
      setisLoading(true);
    });
  }, []);

  return (
    <AdminUsersContext.Provider value={{ allUsers, isLoading }}>
      {children}
    </AdminUsersContext.Provider>
  );
};

const useAdminUserHook = () => {
  return useContext(AdminUsersContext);
};

export { AdminUserProvider, useAdminUserHook };
