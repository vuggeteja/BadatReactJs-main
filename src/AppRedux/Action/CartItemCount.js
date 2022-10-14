import { getCartCount } from "../../Util";

const cartItemCount = (data) => ({ type: "CART_ITEM_COUNT", payload: data });

export const cartItemCountHandle = () => async (dispatch) => {
  const length = await getCartCount();
  dispatch(cartItemCount(length || 0));
};
