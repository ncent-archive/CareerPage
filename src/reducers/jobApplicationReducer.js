import {
  SEND_JOB_APPLICATION_SUCCESS
} from "./../actions/jobApplicationActions.js";

export default (state={
  jobApplicationSuccessful: false
}, action) => {
  switch(action.type) {
    case SEND_JOB_APPLICATION_SUCCESS:
      return {
        ...state,
        jobApplicationSuccessful: true
      };
    default:
      return state;
  }
}