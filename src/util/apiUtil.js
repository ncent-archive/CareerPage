import axios from "axios";

export const createUser = async (email, firstname, lastname) => {
    return await axios.post("api/users", {
        email,
        firstname,
        lastname
    });
};

export const findOneUser = async (userId) => {
    return await axios.get(`api/users/${userId}`);
};

export const sendOTP = async (userId) => {
    return await axios.post(`api/users/${userId}`);
};

export const loginUser = async () => {
    return await axios.post('api/users/login');
};

export const logoutUser = async () => {
    return await axios.post('api/users/logout');
};

export const findOneChallenge = async (challengeId) => {
    return await axios.get(`api/challenges/${challengeId}`);
};

export const findAllChallenges = async () => {
    return await axios.get('api/challenges');
};

export const createReferralCode = async (challengeId) => {
    return await axios.post(`api/challenges/referralCode/${challengeId}`);
};

export const retrieveReferralCode = async (challengeId) => {
    return await axios.get(`api/challenges/referralCode/${challengeId}`);
};