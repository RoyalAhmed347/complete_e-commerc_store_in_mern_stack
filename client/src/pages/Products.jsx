import React from "react";
import FilterSection from "../components/FilterSection";
import ProductShort from "../components/ProductShort";
import ProductList from "../components/ProductList";
const Products = () => {
  return (
    <section>
      <div className="container">
        <div className="products">
          <div className="filered_section">
            <FilterSection />
          </div>
          <section className="short_view_section">
            <div className="short_section">
              <ProductShort />
            </div>
            <div className="product_view_section">
              <ProductList />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Products;
