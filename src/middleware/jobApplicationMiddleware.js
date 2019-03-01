import {
  SEND_APPLICATION,
  sendJobApplicationSuccess
} from "./../actions/jobApplicationActions.js";
import { sendApplication } from "./../util/apiUtil.js";

const JobApplicationMiddleware = ({ getState, dispatch }) => next => action => {

  let sendApplicationSuccess = (success) => {
    console.log("\n\njobApplicationMiddleware sendApplicationSuccess");
    dispatch(sendJobApplicationSuccess());
  }

  switch(action.type) {
    case SEND_APPLICATION:
      console.log("jobApplication middleware reducer case SEND_APPLICATION");
      sendApplication(action.data, sendApplicationSuccess);
      return next(action);
    default:
      return next(action);
  }
}

export default JobApplicationMiddleware;