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
    console.log("findAllChallenges apiutil.js");
    try {
        const res = await axios.get('api/challenges');
        return dispatch(res);
    } catch(e) {
        return err(e);
    }
};

export const createReferralCode = async (challengeId) => {
    return await axios.post(`api/challenges/referralCode/${challengeId}`);
};

export const retrieveReferralCode = async (challengeId) => {
    return await axios.get(`api/challenges/referralCode/${challengeId}`);
};