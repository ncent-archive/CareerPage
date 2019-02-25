import {combineReducers} from "redux";
import userReducer from "./userReducer.js";
import challengeReducer from "./challengeReducer.js";

export default combineReducers({
    user: userReducer,
    challenge: challengeReducer
});
