import axios from "axios";

export const registerUser = async (email, firstname, lastname) => {
    return await axios.post("api/users", {
        email,
        firstname,
        lastname
    });
};

export const upsertVerifyUser = async (email, dispatch) => {
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
    return await axios.post(`api/users/${userId}`);
};

export const loginUser = async (userId, code, dispatch) => {
    const user = await axios.post('api/users/login', {
        userId,
        code
    });
    return dispatch(user);
};

export const logoutUser = async () => {
    return await axios.post('api/users/logout');
};

export const findOneChallenge = async (challengeId, dispatch, err) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`api/challenges/${challengeId}`);
            resolve(dispatch(res));
        } catch(e) {
            resolve(err(e));
        }
    });
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