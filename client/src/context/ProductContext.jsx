import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reduser from "../Reduser/ProductReduser";
// import Products from "../ProductData/Products.json";
const initialStat = {
  isLoading: false,
  isError: false,
  products: [],
  featuresProducts: [],
  productIsLoading: false,
  productIsError: false,
  singelProduct: {},
};

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialStat);

  const getAllProducts = async () => {
    const result = await axios({
      method: "GET",
      url: "http://localhost:3002/api/data/allproducts",
    });
    return result.data.allproducts;
  };

  useEffect(() => {
    const AllProducts = getAllProducts();
    AllProducts.then((result) => {
      dispatch({ type: "product_loading" });
      dispatch({
        type: "set_api_data",
        payload: result,
      });
    }).catch((e) => console.log(e));
  }, []);

  const getSingelProduct = async (selectedId) => {
    dispatch({ type: "singel_product_loading" });
    try {
      const present = await axios({
        method: "GET",
        url: `http://localhost:3002/api/data/getProduct/${selectedId}`,
      });
      let selectedItem = present.data.Product[0];

      dispatch({ type: "singel_set_api_data", payload: selectedItem });
    } catch (error) {
      dispatch({ type: "singel_product_error" });
    }
  };

  return (
    <ProductContext.Provider value={{ ...state, getSingelProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};
export { ProductContextProvider, ProductContext, useProductContext };
