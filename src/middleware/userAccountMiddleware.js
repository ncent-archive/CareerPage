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
    dispatch(receiveUser(user));
  }

  let loginUserSuccess = (user) => {
    console.log("loginUserSuccess", user);
    dispatch(loggedInUser());
  }

  switch(action.type) {
    case CREATE_USER:
      upsertVerifyUser(action.email, receiveUserSuccess);
    case SEND_OTP:
      sendOTP(action.userId);
    case LOGIN_USER:
      loginUser(action.userId, action.conformationCode, loginUserSuccess);
    default:
      return next(action);
  }
}

export default UserAccountMiddleware;