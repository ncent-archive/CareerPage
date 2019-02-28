import {
    RECEIVE_USER,
    LOGGED_IN_USER,
    VERIFIED_SESSION,
    UNVERIFIED_SESSION
} from "./../actions/userActions.js";
import {merge} from "lodash";

export default (state = {
    userData: {
        userCreated: false,
        loggedIn: false
    }
}, action) => {
    let newState;
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_USER:
            console.log("userReducer, case RECEIVE_USER", action);
            const userData = action.userData;
            newState = merge({}, state, {userData});
            newState.userData.userCreated = true;
            return newState;
        case LOGGED_IN_USER:
            console.log("userReducer, case LOGGED_IN_USER", action);
            const loggedInUserData = action.userData;
            newState = merge({}, state, { userData: loggedInUserData });
            // newState.userData.loggedIn = true;
            return newState;
        case VERIFIED_SESSION:
            console.log("userReducer, case VERIFIED_SESSION", action);
            newState = merge({}, state, {sessionStatus: action.status, userData: action.status.user});
            return newState;
        case UNVERIFIED_SESSION:
            console.log("userReducer, case UNVERIFIED_SESSION", action);
            newState = merge({}, state, {sessionStatus: action.status});
            return newState;
        default:
            return state;
    }
}