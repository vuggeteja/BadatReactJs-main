import { combineReducers } from "redux";
import CategoryReducer from "./CategoryReducer";
import CartItemCount from "./CartItemCount";

export default combineReducers({ CategoryReducer, CartItemCount });
