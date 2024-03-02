import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../Reduser/FilterReducer";
const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const inilState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    short_value: "a to z",
    filter: {
      search: "",
      category: "all",
      company: "all",
      colors: "all",
      price: 0,
      minPrice: 0,
      maxPrice: 0,
    },
  };
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, inilState);

  const setGridView = () => {
    dispatch({ type: "set_grid_view" });
  };
  const setListView = () => {
    dispatch({ type: "set_list_view" });
  };

  const setShortValue = (e) => {
    dispatch({ type: "set_short_value", payload: e.target.value });
  };

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    return dispatch({ type: "set_filter_value", payload: { name, value } });
  };

  const clearFilter = () => {
    dispatch({ type: "clear_filter" });
  };

  useEffect(() => {
    dispatch({ type: "set_filter_product_data" });
  }, [products, state.filter]);

  useEffect(() => {
    dispatch({ type: "Load_fillter_products", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        setShortValue,
        inputEvent,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, FilterContextProvider, useFilterContext };
