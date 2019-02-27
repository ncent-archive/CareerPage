import {
    RECEIVE_USER,
    LOGGED_IN_USER
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
            const userData = action.userData;
            newState = merge({}, state, {userData});
            newState.userData.userCreated = true;
            return newState;
        case LOGGED_IN_USER:
            newState = merge({}, state);
            newState.userData.loggedIn = true;
        default:
            return state;
    }
}