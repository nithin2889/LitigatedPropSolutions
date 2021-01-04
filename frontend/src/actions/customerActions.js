import axios from "axios";
import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_PROPERTY_FAIL,
  CUSTOMER_CREATE_PROPERTY_REQUEST,
  CUSTOMER_CREATE_PROPERTY_SUCCESS,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_PROPERTY_FAIL,
  CUSTOMER_UPDATE_PROPERTY_REQUEST,
  CUSTOMER_UPDATE_PROPERTY_SUCCESS,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_SAVE_PAYMENT_METHOD,
} from "../constants/customerConstants";
import { logout } from "./userActions";

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

export const listCustomerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/customers/${id}`);
    dispatch({
      type: CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/customers/${id}`, config);

    dispatch({ type: CUSTOMER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCustomer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/customers`, {}, config);

    dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_UPDATE_REQUEST,
    });

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
      `/api/customers/${customer._id}`,
      customer,
      config
    );

    dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProperty = (customerId, property) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_CREATE_PROPERTY_REQUEST,
    });

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
      `/api/customers/${customerId}/properties`,
      property,
      config
    );

    dispatch({
      type: CUSTOMER_CREATE_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_CREATE_PROPERTY_FAIL,
      payload: message,
    });
  }
};

export const updateProperty = (customerId, property) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_UPDATE_PROPERTY_REQUEST,
    });

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
      `/api/customers/${customerId}/properties`,
      property,
      config
    );

    dispatch({ type: CUSTOMER_UPDATE_PROPERTY_SUCCESS });
    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_UPDATE_PROPERTY_FAIL,
      payload: message,
    });
  }
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CUSTOMER_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
