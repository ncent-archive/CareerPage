import {
    RECEIVE_CHALLENGE,
    RECEIVE_CHALLENGES,
    RECEIVE_SHARE_TRANSACTION,
    RECEIVE_REFERRAL_CODE
} from "../actions/challengeActions";
import {merge} from "lodash";

export default(state = {
    challengeData: {},
    challengesData: {},
    referralCodeData: {},
    shareTransactionData: {}
}, action) => {
    let newState;
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CHALLENGE:
            const challengeData = action.challengeData;
            newState = merge({}, state, {challengeData});
            return newState;
        case RECEIVE_CHALLENGES:
            const challengesData = action.challengesData;
            newState = merge({}, state, {challengesData});
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