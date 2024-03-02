import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";

import CartItems from "../components/CartItems";
import FormatePrice from "../Helper/FormatePrice";
import { useAuthHook } from "../context/AuthContext";

const Cart = () => {
  const { cartItem = [] } = useCartContext();
  const { logInUser } = useAuthHook();
  const [subTotal, setsubTotal] = useState(0);

  useEffect(() => {
    let newSubTotal = cartItem.reduce((total, elem) => {
      return total + elem.price * elem.quantity;
    }, 0);
    setsubTotal(newSubTotal);
  }, [cartItem]);

  return (
    <div className="container">
      {logInUser && (
        <div className="user_profile mt-2">
          <img src="assets\images\user.png" alt='user_profile' />
          <p className="text">
           
            {logInUser.firstName} {logInUser.lastName}
          </p>
        </div>
      )}
      <div className="cart_page">
        <CartItems />
        <div className="amount_box">
          <div className="total_amonut">
            <div className="row">
              <p className="text">Sutotal: </p>
              <p className="text">
                <span>
                  <FormatePrice price={subTotal} />
                </span>
              </p>
            </div>
            <div className="row">
              <p className="text">Shiping Fee: </p>
              <p className="text">
                <span>
                  <FormatePrice price={(subTotal / 100) * 2} />
                </span>
              </p>
            </div>
            <hr />
            <div className="row">
              <p className="text">Total: </p>
              <p className="text">
                <span>
                  <FormatePrice price={subTotal + (subTotal / 100) * 2} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
