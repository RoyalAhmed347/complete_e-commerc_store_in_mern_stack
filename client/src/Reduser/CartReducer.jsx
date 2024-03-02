const CartReducer = (state, action) => {
  switch (action.type) {
    case "get localstorage data": {
      const data = action.payload;
      return {
        ...state,
        cartItem: [...data],
      };
    }
    case "add to cart": {
      let newItem = action.payload;
      const { id, quantity } = newItem;

      let exsist = state.cartItem.find((elem) => elem.id === id);

      if (exsist) {
        let newData = state.cartItem.map((elem) => {
          const { quantity: OldQuantity } = elem;
          if (elem.id === id) {
            return {
              ...elem,
              quantity: OldQuantity + quantity,
            };
          } else {
            return elem;
          }
        });

        return {
          ...state,
          cartItem: [...newData],
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, { ...newItem }],
        };
      }
    }
    case "add qauantity": {
      const { newQuanyity, id } = action.payload;
      let newData = state.cartItem.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            quantity: newQuanyity,
          };
        } else {
          return elem;
        }
      });
      return {
        ...state,
        cartItem: [...newData],
      };
    }
    case "sub qauantity": {
      const { newQuanyity, id } = action.payload;
      let newData = state.cartItem.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            quantity: newQuanyity,
          };
        } else {
          return elem;
        }
      });
      return {
        ...state,
        cartItem: [...newData],
      };
    }
    case "del item": {
      let newCartItems = [...state.cartItem];
      newCartItems = newCartItems.filter((elem) => {
        return elem.id !== action.payload;
      });

      return {
        ...state,
        cartItem: [...newCartItems],
      };
    }
    case "clear cart": {
      return {
        ...state,
        cartItem: [],
      };
    }

    default:
      break;
  }
};
export default CartReducer;
