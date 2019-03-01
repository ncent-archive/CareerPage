import {combineReducers} from "redux";
import userReducer from "./userReducer.js";
import challengeReducer from "./challengeReducer.js";
import jobApplicationReducer from "./jobApplicationReducer.js";

export default combineReducers({
    user: userReducer,
    challenge: challengeReducer,
    jobApplication: jobApplicationReducer
});
