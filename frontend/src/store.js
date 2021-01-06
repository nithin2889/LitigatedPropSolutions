import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  customerCreatePropertyReducer,
  customerCreateReducer,
  customerDeleteReducer,
  customerDetailsReducer,
  customerListReducer,
  customerUpdatePropertyReducer,
  customerUpdateReducer,
} from "./reducers/customerReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  paymentCreateReducer,
  paymentDetailsReducer,
  paymentMyListReducer,
  paymentPayReducer,
} from "./reducers/paymentReducers";

// holds all the reducers of the application
const reducer = combineReducers({
  customerList: customerListReducer,
  customerDetails: customerDetailsReducer,
  customerDelete: customerDeleteReducer,
  customerCreate: customerCreateReducer,
  customerUpdate: customerUpdateReducer,
  customerCreateProperty: customerCreatePropertyReducer,
  customerUpdateProperty: customerUpdatePropertyReducer,
  paymentCreate: paymentCreateReducer,
  paymentDetails: paymentDetailsReducer,
  paymentPay: paymentPayReducer,
  paymentMyList: paymentMyListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// loads initially when the redux store loads
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// thunk middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
