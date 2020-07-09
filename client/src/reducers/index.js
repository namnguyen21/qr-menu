import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import restaurantReducer from "./restaurantReducer";
import pathReducer from "./pathReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  restaurant: restaurantReducer,
  path: pathReducer,
});
