import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reduser/CartReducer";

const CartContext = createContext();

const initialStat = {
  cartItem: [],
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStat);

  // add Quantity
  const clearCart = () => {
    dispatch({ type: "clear cart" });
  };
  // add Quantity
  const addQuantity = (newQuanyity, id) => {
    dispatch({ type: "add qauantity", payload: { newQuanyity, id } });
  };
  // sub Quantity
  const subQuantity = (newQuanyity, id) => {
    dispatch({ type: "sub qauantity", payload: { newQuanyity, id } });
  };
  // Del Item
  const delItem = (id) => {
    dispatch({ type: "del item", payload: id });
  };

  // add to cart
  const addToCart = (id, color, totalitem, product) => {
    const { price, discountPercentage, title, thumbnail, stock } = product;
    let descountprice = price * (1 - discountPercentage / 100);

    let cartItemDetails = {
      id: `${id}_${color}`,
      color: color,
      price: descountprice,
      title: title,
      img: thumbnail,
      quantity: totalitem,
      stock: stock,
    };

    dispatch({ type: "add to cart", payload: { ...cartItemDetails } });
  };
  // get localstorage data
  useEffect(() => {
    let data = localStorage.getItem("WalMart");
    data = JSON.parse(data);
    dispatch({ type: "get localstorage data", payload: data });
  }, []);
  // set localstorage data
  useEffect(() => {
    let data = state.cartItem;
    localStorage.setItem("WalMart", JSON.stringify(data));
  }, [state.cartItem]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        addQuantity,
        subQuantity,
        delItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartContextProvider, useCartContext };
