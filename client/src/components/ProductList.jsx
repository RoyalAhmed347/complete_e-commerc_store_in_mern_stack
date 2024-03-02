import React from "react";
import { useFilterContext } from "../context/FilterContext";
import GridViewProduct from "./GridViewProduct";
import ListViewProduct from "./ListViewProduct";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view) {
    return (
      <>
        {filter_products.length ? (
          <div className="product_list">
            {filter_products.map((elem, index) => {
              return <GridViewProduct key={index} elem={elem} />;
            })}
          </div>
        ) : (
          <div className="product_list_error">
            <p className="text">Item not found</p>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {filter_products.length ? (
          <div className="product_list">
            {filter_products.map((elem, index) => {
              return <ListViewProduct key={index} elem={elem} />;
            })}
          </div>
        ) : (
          <div className="product_list_error">
            <p className="text">Item not found</p>
          </div>
        )}
      </>
    );
  }
};

export default ProductList;
