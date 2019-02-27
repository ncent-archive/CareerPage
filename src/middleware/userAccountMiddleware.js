import {
  CREATE_USER,
  RECEIVE_USER,
  SEND_OTP,
  LOGIN_USER,
  createUser,
  receiveUser,
  loggedInUser
} from "./../actions/userActions.js";

import {
  registerUser,
  upsertVerifyUser,
  sendOTP,
  loginUser
} from "./../util/apiUtil.js";

const UserAccountMiddleware = ({ getState, dispatch }) => next => action => {

  let receiveUserSuccess = (user) => {
    console.log("receiveUserSuccess", user);
    dispatch(receiveUser(user.data));
  }

  let loginUserSuccess = (user) => {
    console.log("loginUserSuccess", user);
    dispatch(loggedInUser());
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
    default:
      return next(action);
  }
}

export default UserAccountMiddleware;