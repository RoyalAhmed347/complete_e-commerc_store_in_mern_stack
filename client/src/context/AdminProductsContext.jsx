import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AdminProductsContext = createContext();

const AdminProductsProvider = ({ children }) => {
  const [allproducts, setAllProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});

  const getAllProducts = async () => {
    const result = await axios({
      method: "GET",
      url: "http://localhost:3002/api/data/allproducts",
    });
    return result.data.allproducts;
  };

  useEffect(() => {
    getAllProducts().then((result) => {
      setAllProducts(result);
      setTempProduct(allproducts);
    });
  }, []);

  useEffect(() => {
    if (allproducts.length) {
      setTempProduct(allproducts);
    }
  }, [allproducts]);

  const onScarch = (value) => {
    const newProduct = allproducts.filter((elem) => {
      return elem.title.toLowerCase().includes(value);
    });
    setTempProduct(newProduct);
  };

  const getSingleProduct = async (id) => {
    const result = await axios({
      method: "GET",
      url: `http://localhost:3002/api/data/getProduct/${id}`,
    });
    setSingleProduct(result);
    return result;
  };

  return (
    <AdminProductsContext.Provider
      value={{
        tempProduct,
        onScarch,
        getAllProducts,
        getSingleProduct,
        singleProduct,
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
};

const useAdminProductHook = () => {
  return useContext(AdminProductsContext);
};

export { AdminProductsProvider, useAdminProductHook };
