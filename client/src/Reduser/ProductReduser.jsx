const ProductReduser = (state, action) => {
  switch (action.type) {
    case "product_loading":
      return {
        ...state,
        isLoading: true,
      };

    case "set_api_data":

    

      const featureposts = action.payload.filter((elem) => {
        return elem.feature === true;
      });
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuresProducts: featureposts,
      };

    case "singel_product_loading":
      return {
        ...state,
        productIsLoading: true,
      };

    case "singel_set_api_data":
      return {
        ...state,
        productIsLoading: false,
        productIsError: false,
        singelProduct: action.payload,
      };

    case "singel_product_error":
      return {
        ...state,
        productIsLoading: false,
        productIsError: true,
      };
    default:
      break;
  }
  return state;
};

export default ProductReduser;
