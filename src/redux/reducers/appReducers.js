import { combineReducers } from "redux";
import appDataReducers from "./appDataReducers";
import currentElemReducer from "./currentElemReducer";

export default combineReducers({
  appData: appDataReducers,
  currentElem: currentElemReducer
})
