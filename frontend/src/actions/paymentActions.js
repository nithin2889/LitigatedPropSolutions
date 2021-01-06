import axios from "axios";
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_DETAILS_REQUEST,
  PAYMENT_DETAILS_SUCCESS,
  PAYMENT_DETAILS_FAIL,
  PAYMENT_PAY_REQUEST,
  PAYMENT_PAY_SUCCESS,
  PAYMENT_PAY_FAIL,
  PAYMENT_LIST_MY_REQUEST,
  PAYMENT_LIST_MY_SUCCESS,
  PAYMENT_LIST_MY_FAIL,
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

export const getPaymentDetails = (id, custId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/payment/${id}/customer/${custId}`,
      config
    );

    dispatch({ type: PAYMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (paymentId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PAYMENT_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/payment/${paymentId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: PAYMENT_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyRegistrations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/payment/myregistrations", config);

    dispatch({ type: PAYMENT_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PAYMENT_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
