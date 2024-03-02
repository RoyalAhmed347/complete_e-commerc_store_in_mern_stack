import React from "react";
import { useCartContext } from "../context/CartContext";
import FormatePrice from "../Helper/FormatePrice";
import { IoClose } from "react-icons/io5";
import CartAmountToggler from "../components/CartAmountToggler";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    cartItem = [],
    subQuantity,
    clearCart,
    addQuantity,
    delItem,
  } = useCartContext();

  return (
    <>
      {cartItem.length ? (
        <>
          <div className="cart_items">
            {cartItem.map((elem, index) => {
              const { id, color, price, title, img, quantity, stock } = elem;

              const Increacs = () => {
                quantity < stock
                  ? addQuantity(quantity + 1, id)
                  : addQuantity(stock, id);
              };
              const Decreacs = () => {
                quantity > 1
                  ? subQuantity(quantity - 1, id)
                  : subQuantity(1, id);
              };

              return (
                <div key={index} className="item">
                  <div className="item_img">
                    <img src={img} alt="item" />
                  </div>
                  <div className="detail">
                    <div className="left">
                      <Link to={"/product/" + id.slice(0, -8)}>
                        <h2 className="sub_heading">{title}</h2>
                      </Link>
                      <button
                        className="btn_color"
                        style={{ backgroundColor: color }}
                      ></button>
                      <p className="text">
                        <b>Price: </b>
                        <FormatePrice price={price} />
                      </p>
                    </div>
                    <div className="center"></div>
                    <div className="rigth">
                      <IoClose
                        className="del_icon"
                        onClick={() => delItem(id)}
                      />

                      <CartAmountToggler
                        totalitem={quantity}
                        Increacs={Increacs}
                        Decreacs={Decreacs}
                      />
                      <p className="text">
                        <b>SubTotal: </b>
                        <FormatePrice price={price * quantity} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr className="cart_devider" />
            <div className="main_btns ">
              <Link to="/products">
                <button className="btn">Contenu shoping</button>
              </Link>
              <button className="btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty_cart">
          <img src=".\assets\images\shopping-cart.png" alt="" />
          <h1 className="main_heading">
            Your Cart is <span>Empty!</span>
          </h1>
          <p className="text">
            Must add item on the cart before youe proceed to check out.
          </p>
          <Link to="/products">
            <button className="btn flex items-center justify-center gap-2">
              <FaCartShopping /> Return to shop
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartItems;
