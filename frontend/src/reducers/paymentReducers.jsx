import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
} from "../constants/paymentConstants";

export const paymentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return { loading: true };
    case PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        payment: action.payload,
      };
    case PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
