import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_RESET,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_RESET,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_RESET,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_CREATE_PROPERTY_RESET,
  CUSTOMER_CREATE_PROPERTY_FAIL,
  CUSTOMER_CREATE_PROPERTY_SUCCESS,
  CUSTOMER_CREATE_PROPERTY_REQUEST,
  CUSTOMER_SAVE_PAYMENT_METHOD,
  CUSTOMER_UPDATE_PROPERTY_REQUEST,
  CUSTOMER_UPDATE_PROPERTY_SUCCESS,
  CUSTOMER_UPDATE_PROPERTY_FAIL,
  CUSTOMER_UPDATE_PROPERTY_RESET,
} from "../constants/customerConstants";

export const customerListReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { loading: true, customers: [] };
    case CUSTOMER_LIST_SUCCESS:
      return { loading: false, customers: action.payload };
    case CUSTOMER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerDetailsReducer = (
  state = { customer: { properties: [] } },
  action
) => {
  switch (action.type) {
    case CUSTOMER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_DETAILS_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_DETAILS_RESET:
      return {};
    case CUSTOMER_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const customerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_DELETE_REQUEST:
      return { loading: true };
    case CUSTOMER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_CREATE_REQUEST:
      return { loading: true };
    case CUSTOMER_CREATE_SUCCESS:
      return { loading: false, success: true, customer: action.payload };
    case CUSTOMER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const customerUpdateReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOMER_UPDATE_SUCCESS:
      return { loading: false, success: true, customer: action.payload };
    case CUSTOMER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_UPDATE_RESET:
      return { customer: {} };
    default:
      return state;
  }
};

export const customerCreatePropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_CREATE_PROPERTY_REQUEST:
      return { loading: true };
    case CUSTOMER_CREATE_PROPERTY_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case CUSTOMER_CREATE_PROPERTY_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_CREATE_PROPERTY_RESET:
      return {};
    default:
      return state;
  }
};

export const customerUpdatePropertyReducer = (
  state = { customer: { properties: [] } },
  action
) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_PROPERTY_REQUEST:
      return { loading: true };
    case CUSTOMER_UPDATE_PROPERTY_SUCCESS:
      return { loading: false, success: true, customer: action.payload };
    case CUSTOMER_UPDATE_PROPERTY_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_UPDATE_PROPERTY_RESET:
      return {
        customer: {},
      };
    default:
      return state;
  }
};
