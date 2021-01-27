import { combineReducers } from "redux";
import auth from "./auth";
import prostore from "./prostore";

export default combineReducers({
  auth,
  prostore,
});
