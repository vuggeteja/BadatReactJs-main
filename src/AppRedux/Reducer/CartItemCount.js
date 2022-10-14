import { checkLogin } from "../../Util";

const initialState = {
  count: null,
  login: null,
};

function CartItemCount(state = initialState, action) {
  const login = checkLogin();
  switch (action.type) {
    case "CART_ITEM_COUNT":
      return { ...state, count: action.payload, login: login };
    default:
      return { ...state, login: login };
  }
}

export default CartItemCount;
