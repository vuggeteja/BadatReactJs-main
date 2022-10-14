import {
  CATEGORY_DATA_FAIL,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_REQUEST,
} from "../../Constant";

const initialState = {
  data: [],
  error: {},
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_DATA_REQUEST:
      return {
        ...state,
      };
    case CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case CATEGORY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
