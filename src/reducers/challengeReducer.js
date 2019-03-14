import {
    RECEIVE_CHALLENGE,
    RECEIVE_CHALLENGES,
    RECEIVE_SHARE_TRANSACTION,
    RECEIVE_REFERRAL_CODE
} from "../actions/challengeActions";
import {merge} from "lodash";

export default(state = {
    challengeData: {},
    challengesData: [],
    referralCodeData: {},
    shareTransactionData: {},
    challengeReceived: false,
    challengesReceived: false
}, action) => {
    let newState;
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CHALLENGE:
            console.log("challengeReducer, case RECEIVE_CHALLENGE", action);
            const challengeData = action.challengeData;
            newState = merge({}, state, {challengeData});
            newState.challengeReceived = true;
            return newState;
        case RECEIVE_CHALLENGES:
            const challengesData = action.challengesData;
            const newChallenges = action.challengesData;
            // newState = merge({}, state, {challengesData});
            newState = {
                ...state,
                challengesData: state.challengesData.concat(newChallenges),
                challengesReceived: true
            }
            return newState;
        case RECEIVE_SHARE_TRANSACTION:
            const shareTransactionData = action.shareTransactionData;
            newState = merge({}, state, {shareTransactionData});
            return newState;
        case RECEIVE_REFERRAL_CODE:
            const referralCodeData = action.referralCodeData;
            newState = merge({}, state, {referralCodeData});
            return newState;
        default:
            return state;
    }
}