import {
  CREATE_USER,
  RECEIVE_USER,
  SEND_OTP,
  LOGIN_USER,
  VERIFYING_SESSION,
  createUser,
  receiveUser,
  loggedInUser, 
  verifiedSession,
  unverifiedSession
} from "./../actions/userActions.js";

import {
  registerUser,
  upsertVerifyUser,
  sendOTP,
  loginUser,
  verifySession
} from "./../util/apiUtil.js";

const UserAccountMiddleware = ({ getState, dispatch }) => next => action => {

  let receiveUserSuccess = (user) => {
    console.log("\nreceiveUserSuccess in userAccountMiddleware", user.data);
    dispatch(receiveUser(user.data));
  }

  let loginUserSuccess = (user) => {
    console.log("\nloginUserSuccess in userAccountMiddleware", user.data);
    dispatch(loggedInUser(user.data));
  }

  let verifySessionSuccess = (res) => {
    console.log("\nverifySessionSuccess in userAccountMiddleware", res.data);
    dispatch(verifiedSession(res.data));
  }

  let verifySessionError = (res) => {
    console.log("\nverifySessionError in userAccountMiddleware", res);
    dispatch(unverifiedSession(res.data));
  }

  switch(action.type) {
    case CREATE_USER:
      console.log("\n\nuserAccountMiddleware reducer case CREATE_USER", action);
      upsertVerifyUser(action.email, receiveUserSuccess);
      return next(action);
    case SEND_OTP:
      console.log("\n\nuserAccountMiddleware reducer case SEND_OTP", action);
      sendOTP(action.userId);
      return next(action);
    case LOGIN_USER:
      console.log("\n\nuserAccountMiddleware reducer case LOGIN_USER", action);
      loginUser(action.userId, action.confirmationCode, loginUserSuccess);
      return next(action);
    case VERIFYING_SESSION:
      console.log("verifying session in userAccountMiddleware reducer", action);
      verifySession(verifySessionSuccess, verifySessionError);
      return next(action);
    default:
      return next(action);
  }
}

export default UserAccountMiddleware;