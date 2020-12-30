import axios from "axios";
import {
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
} from "../constants/customerConstants";

// Redux Thunk allows us to basically add a function within a function
// to dispatch the actions to our reducers.
export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const { data } = await axios.get("/api/customers");
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
