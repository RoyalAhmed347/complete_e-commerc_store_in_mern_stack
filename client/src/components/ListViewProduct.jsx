import React from "react";
import { Link } from "react-router-dom";
import FormatePrice from "../Helper/FormatePrice";
import CountStartRating from "../Helper/CountStartRating";

const ListViewProduct = ({ elem }) => {
  const { _id, title, thumbnail, description, rating, brand, price } = elem;

  return (
    <div className="list_card">
      <Link className="list_product_link" to={`/product/${_id}`}>
        <figure className="list_img">
          <img src={`http://localhost:3002/${thumbnail}`} alt="" />
          <figcaption className="caption">{brand}</figcaption>
        </figure>
      </Link>
      <div className="list_product_details">
        <h3 className="sub_heading">{title}</h3>
        <p className="list_card--price">
          <FormatePrice price={price} />
        </p>
        <p className="text list_data-detalis">
          {description.slice(0, 120) + "..."}
        </p>
        <div className="rating">
          <CountStartRating rating={rating} />
        </div>
        <Link to={`/product/${_id}`}>
          <button style={{ width: "100%" }} className="btn">
            More Info
          </button>
        </Link>
      </div>
    </div>
    // <Link className="list_produst_link" to={`/product/${id}`}>
    //   <figure>
    //     <img src={thumbnail} alt={title} />
    //     <figcaption className="caption">{brand}</figcaption>
    //   </figure>
    // </Link>
    // <div className="card-data">
    //   <div className="card-data-flex">
    //     <h3 className="sub_heading">{title}</h3>
    //     <p className="card-data--price">
    //       <FormatePrice price={price} />
    //     </p>
    //   </div>
    //   <div className="rating">

    //     <CountStartRating rating={rating} />
    //   </div>
    //   <Link to={`/product/${id}`}>
    //     <button style={{ width: "100%" }} className="btn">
    //       More Info
    //     </button>
    //   </Link>
    // </div>
  );
};

export default ListViewProduct;
