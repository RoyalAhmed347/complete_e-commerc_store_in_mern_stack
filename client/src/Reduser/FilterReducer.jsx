const FilterReducer = (state, action) => {
  switch (action.type) {
    case "Load_fillter_products":
      let priceArr = action.payload.map((elem) => {
        return elem.price;
      });
      let maxPriceArr = Math.max(...priceArr);
      let minPriceArr = Math.min(...priceArr);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filter: {
          ...state.filter,
          minPrice: minPriceArr,
          maxPrice: maxPriceArr,
          price: maxPriceArr,
        },
      };
    case "set_grid_view":
      return {
        ...state,
        grid_view: true,
      };
    case "set_list_view":
      return {
        ...state,
        grid_view: false,
      };

    case "set_short_value":
      let tempproductdeta = [...state.all_products];

      const shortData = (a, b) => {
        if (action.payload === "a to z") {
          return a.title.localeCompare(b.title);
        }
        if (action.payload === "z to a") {
          return b.title.localeCompare(a.title);
        }
        if (action.payload === "low to high") {
          return a.price - b.price;
        }
        if (action.payload === "high to low") {
          return b.price - a.price;
        }
      };

      const newData = tempproductdeta.sort(shortData);

      return {
        ...state,
        filter_products: newData,
      };

    case "set_filter_value":
      const { name, value } = action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };

    case "set_filter_product_data":
      const { all_products } = state;
      const { search, category, company, colors, price } = state.filter;
      let tempProduct = [...all_products];
      if (search) {
        tempProduct = tempProduct.filter((elem) => {
          return elem.title.toLowerCase().includes(search);
        });
      }
      if (category !== "all") {
        tempProduct = tempProduct.filter((elem) => {
          return elem.category === category;
        });
      }
      if (company !== "all") {
        tempProduct = tempProduct.filter((elem) => {
          return elem.brand === company;
        });
      }
      if (colors !== "all") {
        tempProduct = tempProduct.filter((elem) => {
          return elem.colors.includes(colors);
        });
      }
      if (price) {
        tempProduct = tempProduct.filter((elem) => {
          return elem.price <= price;
        });
      }

      return {
        ...state,
        filter_products: tempProduct,
      };

    case "clear_filter":
      return {
        ...state,
        filter: {
          search: "",
          category: "all",
          company: "all",
          colors: "all",
          price: state.filter.maxPrice,
          minPrice: state.filter.minPrice,
          maxPrice: state.filter.maxPrice,
        },
      };
    default:
      break;
  }
};
export default FilterReducer;
