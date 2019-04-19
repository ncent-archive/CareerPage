import {
  SEND_APPLICATION,
  INVALID_JOB_APPLICATION,
  sendJobApplicationSuccess,
  invalidJobApplication
} from "./../actions/jobApplicationActions.js";
import { sendApplication } from "./../util/apiUtil.js";

const JobApplicationMiddleware = ({ getState, dispatch }) => next => action => {

  let sendApplicationSuccess = (success) => {
    console.log("\n\njobApplicationMiddleware sendApplicationSuccess");
    dispatch(sendJobApplicationSuccess());
  }

  let error = (e) => {
    console.log("Error in Job Applications Middleware!", e);
    dispatch(invalidJobApplication(e));
  }

  switch(action.type) {
    case SEND_APPLICATION:
      console.log("jobApplication middleware reducer case SEND_APPLICATION");
      sendApplication(action.data, sendApplicationSuccess, error);
      return next(action);
    case INVALID_JOB_APPLICATION:
      console.log("jobApplication middleware reducer case INVALID_JOB_APPLICATION", action);
      return next(action);
    default:
      return next(action);
  }
}

export default JobApplicationMiddleware;