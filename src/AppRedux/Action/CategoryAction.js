import {
  CATEGORY_DATA_REQUEST,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_FAIL,
} from "../../Constant";
import { getCategory } from "../../AppApi";

const categoryDataRequest = () => ({ type: CATEGORY_DATA_REQUEST });
const categoryDataSuccess = (data) => ({
  type: CATEGORY_DATA_SUCCESS,
  payload: data,
});
const categoryDataFail = (error) => ({
  type: CATEGORY_DATA_FAIL,
  error: error,
});

export const fetchCategoryData = () => async (dispatch) => {
  dispatch(categoryDataRequest());
  try {
    const res = await getCategory();
    dispatch(categoryDataSuccess(res.data.data));
  } catch (error) {
    dispatch(categoryDataFail(error));
  }
};
