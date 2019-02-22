//combining all reducers for export
import { combineReducers } from "redux";
import jobReducer from "./jobReducer.js";

export default combineReducers({
  job: jobReducer
});
