import React from "react";
import { CiGrid41 } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";

import { useFilterContext } from "../context/FilterContext";
const ProductShort = () => {
  const {
    filter_products,
    grid_view,
    setGridView,
    setListView,
    setShortValue,
  } = useFilterContext();
  return (
    <>
      <div className="view_icons">
        <p className="text">View: </p>
        <div className={grid_view ? `view_icon active` : `view_icon`}>
          <CiGrid41 className="icon " onClick={() => setGridView()} size={20} />
        </div>
        <div className={!grid_view ? `view_icon active` : `view_icon`}>
          <CiCircleList
            className="icon "
            onClick={() => setListView()}
            size={20}
          />
        </div>
      </div>
      <p className="text total_length">{filter_products.length} total length</p>
      <div className="short_section_style">
        <p className="text">Sort By: </p>
        <select className="short_main" onChange={setShortValue}>
          <option className="short_item" value="a to z">
            Short(A to Z)
          </option>
          {/* <option value="" disabled></option> */}
          <option className="short_item" value="z to a">
            Short(Z to A)
          </option>
          {/* <option value="" disabled></option> */}
          <option className="short_item" value="low to high">
            Price Low to High
          </option>
          {/* <option value="" disabled></option> */}
          <option className="short_item" value="high to low">
            Price High to Low
          </option>
        </select>
      </div>
    </>
  );
};

export default ProductShort;
