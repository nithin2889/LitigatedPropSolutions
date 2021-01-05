import axios from "axios";
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
} from "../constants/paymentConstants";

export const createPayment = (customerId, payment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PAYMENT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/payment/customer/${customerId}`,
      payment,
      config
    );

    dispatch({ type: PAYMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
