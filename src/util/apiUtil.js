import axios from "axios";

export const registerUser = async (email, firstname, lastname) => {
    return await axios.post("api/users", {
        email,
        firstname,
        lastname
    });
};

export const upsertVerifyUser = async (email, dispatch) => {
    console.log("\n\nupsertVerifyUser in apiUtil", email);
    const res = await axios.post("api/users/verify", {
        email,
        firstname: "firstName",
        lastname: "lastName"
    });
    return dispatch(res);
};

export const findOneUser = async (userId) => {
    return await axios.get(`api/users/${userId}`);
};

export const sendOTP = async (userId) => {
    console.log("\n\nsendOTP in apiUtil, userId", userId)
    return await axios.post(`api/users/${userId}`);
};

export const loginUser = async (userId, code, dispatch) => {
    console.log("\n\nloginUser in apiUtil, userId", userId, "code", code)
    const user = await axios.post('api/users/login', {
        userId,
        code
    });
    console.log("loginUser returned in apiUtil");
    return dispatch(user);
};

export const logoutUser = async () => {
    return await axios.post('api/users/logout');
};

export const verifySession = async (dispatch, err) => {
    console.log("\n\n verifySession apiUtil");
    try {
        const res = await axios.get('/api/users/session/verify');
        return dispatch(res);
    } catch(e) {
        console.log("error in verifySession");
        return err(e);
    }
}

export const findOneChallenge = async (challengeId, dispatch, err) => {
    try {
        const res = await axios.get(`api/challenges/${challengeId}`);
        return dispatch(res);
    } catch(e) {
        console.log("error in findOneChallenge in apiUtil");
        return err(e);
    }
};

export const findAllChallenges = async (data, dispatch, err) => {
    console.log("\n\nfindAllChallenges apiutil.js");
    try {
        const res = await axios.get('api/challenges');
        console.log("\nfindAllChallenges in apiUtil, response from middleware-api is", res);
        return dispatch(res);
    } catch(e) {
        console.log("\nfindAllChallenges in apiUtil ERROR", e);
        return err(e);
    }
};

export const createReferralCode = async (challengeId) => {
    return await axios.post(`api/challenges/referralCode/${challengeId}`);
};

export const retrieveReferralCode = async (challengeId) => {
    return await axios.get(`api/challenges/referralCode/${challengeId}`);
};

export const shareChallenge = async (challengeId, shares, expiration, referralCode) => {
    console.log("\n\nshareChallenge in apiUtil", challengeId, shares, expiration, referralCode);
    return axios.patch('/api/challenges/share', {
        challengeId,
        shares,
        expiration,
        referralCode
    });
}

export const sendApplication = async (data, dispatch) => {
    console.log("\n\apiUtil, sendApplication", data);
    try {
        let res = await axios.post('/api/jobApplications', data);
        return dispatch(res);
    } catch(e) {
        console.log("apiUtil, sendApplication ERROR", e);
    }
}