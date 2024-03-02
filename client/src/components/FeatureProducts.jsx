import React from "react";
import { useProductContext } from "../context/ProductContext";
import GridViewProduct from "./GridViewProduct";
const FeatureProducts = () => {
  const { featuresProducts, isLoading } = useProductContext();

  if (isLoading) {
    return (
      <div className="container">
        <div className="feature_section">
          <div className="feature_intro">
            <p className="text">Check Now!</p>
            <h2 className="sub_heading">Our feature section</h2>
          </div>
          <div className="feature_posts">
            <div className="featureLoading">
              <p className="text">...Loading</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="feature_section">
        <div className="feature_intro">
          <p className="text">Check Now!</p>
          <h2 className="sub_heading">Our feature section</h2>
        </div>
        <div className="feature_posts">
          {featuresProducts.map((elem) => {
            return <GridViewProduct key={elem.id} elem={elem} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
