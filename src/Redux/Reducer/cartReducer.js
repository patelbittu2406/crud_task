const initialState={
    cart:0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_CART':
        return {
          ...state,
          cart: state.cart + 1,
        };
      default:
        return state;
    }
  };

export default cartReducer