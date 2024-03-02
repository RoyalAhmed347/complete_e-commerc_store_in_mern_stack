import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [logInUser, setLogInUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getSingelUser = async (BToken) => {
    const result = await axios.get("http://localhost:3002/api/auth/user", {
      headers: {
        Authorization: `Bearer ${BToken}`,
      },
    });
    return result.data.user;
  };

  useEffect(() => {
    const BToken = JSON.parse(localStorage.getItem("auth"));
    if (BToken) {
      setToken(BToken);
      getSingelUser(BToken).then((res) => {
        setLogInUser(res);
        setIsLoading(false);
      });
    }
  }, []);

  const setLSToken = (userToken) => {
    setToken(userToken);
    return localStorage.setItem("auth", JSON.stringify(userToken));
  };
  const removeLSToken = () => {
    setToken(null);
    return localStorage.removeItem("auth");
  };
  const setLSUser = (u_user) => {
    setLogInUser(u_user);
  };
  const removeLSUser = () => {
    setLogInUser(null);
    console.log("🚀 ~ removeLSUser ~ setLogInUser:", logInUser);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setLSToken,
        setLSUser,
        logInUser,
        setLogInUser,
        removeLSToken,
        isLoading,
        removeLSUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthHook = () => {
  return useContext(AuthContext);
};

export { useAuthHook, AuthContext, AuthProvider };
