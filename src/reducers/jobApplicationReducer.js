import {
  SEND_JOB_APPLICATION_SUCCESS,
  INVALID_JOB_APPLICATION,
  CLEAR_INVALID_APPLICATION
} from "./../actions/jobApplicationActions.js";
import {merge} from "lodash";

export default (state={
  jobApplicationSuccessful: false,
  invalidJobApplication: false
}, action) => {
  let newState;
  Object.freeze(state);
  switch(action.type) {
    case SEND_JOB_APPLICATION_SUCCESS:
      console.log("jobApplicationReducer, case SEND_JOB_APPLICATION_SUCCESS", action);
      newState = merge({}, state, {});
      newState.jobApplicationSuccessful = true;
      return newState;
    case INVALID_JOB_APPLICATION:
      console.log("jobApplicationReducer, case INVALID_JOB_APPLICATION", action);
      newState = merge({}, state, {});
      newState.invalidJobApplication = true;
      return newState;
    case CLEAR_INVALID_APPLICATION:
      console.log("jobApplicationReducer, case CLEAR_INVALID_APPLICATION", action);
      newState = merge({}, state, {});
      newState.invalidJobApplication = false;
      return newState;
    default:
      return state;
  }
}