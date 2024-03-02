import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductImgs from "../components/ProductImgs";
import FormatePrice from "../Helper/FormatePrice";
import PerDescount from "../Helper/PerDescount";
import { TbReplace, TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiTcs } from "react-icons/si";
import CountStartRating from "../Helper/CountStartRating";
import ProductAddToCart from "../components/ProductAddToCart";

const SingleProduct = () => {
  const { id } = useParams();
  const { getSingelProduct, productIsLoading, singelProduct, productIsError } =
    useProductContext();
  useEffect(() => {
    getSingelProduct(id);
  }, []);
  const {
    _id: alips,
    title,
    images,
    price,
    reviews,
    thumbnail,
    rating,
    stock,
    description,
    discountPercentage,
    brand,
  } = singelProduct;

  if (productIsLoading) {
    return (
      <div className="lodingProduct">
        <p className="text">...Loading</p>
      </div>
    );
  } else if (productIsError) {
    return (
      <div className="container">
        <div className="error">
          {/* <h1 className="main_heading">Product is not found</h1> */}
          <h2 className="sub_heading">Product is not found</h2>
          <p className="text">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <Link to="/products">
            <button className="btn"> Go To Products </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <section>
          <div className="page_navigation">
            <p className="text">
              <Link to="/products">
                <span className="S_nav_heading">Products</span>
              </Link>
              /{title}
            </p>
          </div>
          <div className="container">
            <div className="single_product_data">
              <div className="product_imgs">
                <ProductImgs
                  key={alips}
                  id={alips}
                  thumbnail={thumbnail}
                  images={images}
                />
              </div>

              <div className="product_details">
                <h2 className="title">{title}</h2>
                <div className="text">
                  <CountStartRating rating={rating} reviews={reviews} />
                </div>
                <p className="text ">
                  <span>MRP: </span>
                  <del>
                    <FormatePrice price={price} />
                  </del>
                </p>
                <p className="text deal_of_day">
                  <span>Deal of the Day: </span>
                  <ins>
                    <PerDescount
                      price={price}
                      Percentage={discountPercentage}
                    />
                  </ins>
                </p>
                <p className="text">{description}</p>
                <div className="product_services">
                  <div className="product_service">
                    <TbTruckDelivery size={25} className="icon" />
                    <p className="text">Free Delivery</p>
                  </div>

                  <div className="product_service">
                    <TbReplace size={25} className="icon" />
                    <p className="text">30 Days Replacement</p>
                  </div>
                  <div className="product_service">
                    <SiTcs size={25} className="icon" />
                    <p className="text">TCS Delivered</p>
                  </div>
                  <div className="product_service">
                    <RiSecurePaymentFill size={25} className="icon" />
                    <p className="text">2 years warranty</p>
                  </div>
                </div>
                <p className="text">
                  Availabel:
                  <span> {stock > 0 ? "In Stock" : "Out of Stock"}</span>
                </p>
                <p className="text">
                  ID:
                  <span> {alips}</span>
                </p>
                <p className="text">
                  Brand:
                  <span> {brand}</span>
                </p>
                <hr />
                {stock > 0 && <ProductAddToCart product={singelProduct} />}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

// {
//   "id": "13cbc7ed-a61b-4883-9d42-82d7d8642b86",
//   "seller": "Addidas",
//   "reviews": 4355,
//   "shipping": 14,
//   "quantity": 0,
//   "title": "iPhone 9",
//   "description": "An apple mobile which is nothing like apple",
//   "price": 549,
//   "discountPercentage": 12.96,
//   "rating": 4.69,
//   "stock": 94,
//   "brand": "Apple",
//   "category": "smartphones",
//   "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//   "color": ["#808080", "#C0C0C0", "#000000"],
//   "images": [
//     "https://i.dummyjson.com/data/products/1/1.jpg",
//     "https://i.dummyjson.com/data/products/1/2.jpg",
//     "https://i.dummyjson.com/data/products/1/3.jpg",
//     "https://i.dummyjson.com/data/products/1/4.jpg",
//     "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//   ]
// }
export default SingleProduct;
