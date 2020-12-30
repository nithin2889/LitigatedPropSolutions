import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  customerDetailsReducer,
  customerListReducer,
} from "./reducers/customerReducers";

// holds all the reducers of the application
const reducer = combineReducers({
  customerList: customerListReducer,
  customerDetails: customerDetailsReducer,
});

// loads initially when the redux store loads
const initialState = {};

// thunk middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
