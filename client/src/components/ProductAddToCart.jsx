import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CartAmountToggler from "./CartAmountToggler";
import { useCartContext } from "../context/CartContext";

const ProductAddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors } = product;
  const [color, setcolor] = useState(colors[0]);
  const [totalitem, settotalitem] = useState(1);

  const Increacs = () => {
    totalitem < stock ? settotalitem(totalitem + 1) : settotalitem(stock);
  };
  const Decreacs = () => {
    totalitem > 1 ? settotalitem(totalitem - 1) : settotalitem(1);
  };
  return (
    <>
      <div className="product_colors">
        {colors.map((elem, index) => {
          return (
            <button
              key={index}
              style={{ backgroundColor: elem }}
              className={elem === color ? "btn_color active" : "btn_color"}
              onClick={() => setcolor(elem)}
            >
              {elem === color && <FaCheck className="check" />}
            </button>
          );
        })}
      </div>
      <CartAmountToggler
        key={id}
        totalitem={totalitem}
        Decreacs={Decreacs}
        Increacs={Increacs}
      />
      <Link to="/cart" style={{ maxWidth: "max-content" }}>
        <button
          className="btn"
          onClick={() => addToCart(id, color, totalitem, product)}
        >
          Add to cart
        </button>
      </Link>
    </>
  );
};

export default ProductAddToCart;
