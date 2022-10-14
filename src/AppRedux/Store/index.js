import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "../Reducer";

const middleware = [thunk];

export default createStore(Reducer, {}, applyMiddleware(...middleware));
