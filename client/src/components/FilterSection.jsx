import React from "react";
import { useFilterContext } from "../context/FilterContext";
import { FaCheck } from "react-icons/fa6";
import FormatePrice from "../Helper/FormatePrice";

const FilterSection = () => {
  const {
    filter: { category, colors, minPrice, maxPrice, price },
    all_products,
    inputEvent,
    clearFilter,
  } = useFilterContext();

  const flterUniqeList = (data, prop) => {
    let newData = data.map((elem) => {
      return elem[prop];
    });

    if (prop === "colors") {
      return (newData = [...new Set([].concat(...newData))]);
    }
    return (newData = ["all", ...new Set(newData)]);
  };

  const categoryList = flterUniqeList(all_products, "category");
  const companyList = flterUniqeList(all_products, "brand");
  const colorList = flterUniqeList(all_products, "colors");

  return (
    <>
      <div className="filter_section">
        <div className="search_box">
          <input
            type="text"
            name="search"
            placeholder="SEARCH"
            onChange={inputEvent}
          />
        </div>
        <div className="category">
          <h2 className="sub_heading">Category</h2>
          <ul>
            {categoryList.map((elem, index) => {
              return (
                <button
                  name="category"
                  value={elem}
                  key={index}
                  onClick={inputEvent}
                  className={category === elem ? "active" : null}
                >
                  {elem}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="company">
          <h2 className="sub_heading">Company</h2>
          <select onChange={inputEvent} name="company">
            {companyList.map((elem, index) => {
              return (
                <option name="company" value={elem} key={index}>
                  {elem.slice(0, 19)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="color">
          <h2 className="sub_heading">Colors</h2>
          <ul>
            <button
              name="colors"
              className="all_color"
              value="all"
              onClick={inputEvent}
            >
              All
            </button>
            {colorList.map((elem, index) => {
              return (
                <button
                  key={index}
                  name="colors"
                  value={elem}
                  style={{ backgroundColor: elem }}
                  className={elem === colors ? "btn_color active" : "btn_color"}
                  onClick={inputEvent}
                >
                  {elem === colors && <FaCheck className="check" />}
                </button>
              );
            })}
          </ul>
        </div>

        <div className="price">
          <h2 className="sub_heading">Price</h2>
          <p className="text">
            <FormatePrice price={price} />
          </p>
          <input
            type="range"
            name="price"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={inputEvent}
            className="price_hendler"
            step="1"
          />
        </div>
        <div className="reset">
          <button className="btn" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
