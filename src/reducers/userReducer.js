import {
    RECEIVE_USER
} from "./../actions/userActions.js";
import {merge} from "lodash";

export default (state = {
    userData: {}
}, action) => {
    let newState;
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_USER:
            const userData = action.userData;
            newState = merge({}, state, {userData});
            return newState;
        default:
            return state;
    }
}