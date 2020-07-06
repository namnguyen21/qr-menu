import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import restaurantReducer from "./restaurantReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  restaurant: restaurantReducer,
});
