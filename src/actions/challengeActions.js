export const FETCH_CHALLENGE = "FETCH_CHALLENGE";
export const FETCH_ALL_CHALLENGES = "FETCH_ALL_CHALLENGES";
export const SHARE_CHALLENGE = "SHARE_CHALLENGE";
export const CREATE_REFERRAL_CODE = "CREATE_REFERRAL_CODE";
export const FETCH_REFERRAL_CODE = "FETCH_REFERRAL_CODE";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";
export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_SHARE_TRANSACTION = "RECEIVE_SHARE_TRANSACTION";
export const RECEIVE_REFERRAL_CODE = "RECEIVE_REFERRAL_CODE";

export const fetchChallenge = challengeId => ({
    type: FETCH_CHALLENGE,
    challengeId
});

export const fetchAllChallenges = () => ({
    type: FETCH_ALL_CHALLENGES
});

export const shareChallenge = (challengeId, publicKeyToShareWith, shares, expiration, emailToShareWith) => ({
    type: SHARE_CHALLENGE,
    challengeId,
    publicKeyToShareWith,
    shares,
    expiration,
    emailToShareWith
});

export const createReferralCode = challengeId => ({
    type: CREATE_REFERRAL_CODE,
    challengeId
});

export const fetchReferralCdoe = challengeId => ({
    type: FETCH_REFERRAL_CODE,
    challengeId
});

export const receiveChallenge = challengeData => ({
    type: RECEIVE_CHALLENGE,
    challengeData
});

export const receiveChallenges = challengesData => ({
    type: RECEIVE_CHALLENGES,
    challengesData
});

export const receiveShareTransaction = transactionData => ({
    type: RECEIVE_SHARE_TRANSACTION,
    transactionData
});

export const receiveReferralCode = referralCodeData => ({
    type: RECEIVE_REFERRAL_CODE,
    referralCodeData
});