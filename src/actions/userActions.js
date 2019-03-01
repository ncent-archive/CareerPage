export const FETCH_USER = "FETCH_USER";
export const CREATE_USER = "CREATE_USER";
export const SEND_OTP = "SEND_OTP";
export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const VERIFYING_SESSION = "VERIFYING_SESSION";
export const VERIFIED_SESSION = "VERIFIED_SESSION";
export const UNVERIFIED_SESSION = "UNVERIFIED_SESSION";


export const fetchUser = userId => ({
    type: FETCH_USER,
    userId
});

export const createUser = (email, firstname="firstName", lastname="lastName") => ({
    type: CREATE_USER,
    email,
    firstname,
    lastname
});

export const sendOTP = userId => ({
    type: SEND_OTP,
    userId
});

export const loginUser = (userId, confirmationCode) => ({
    type: LOGIN_USER,
    userId,
    confirmationCode
});

export const receiveUser = userData => ({
    type: RECEIVE_USER,
    userData
});

export const loggedInUser = userData => ({
    type: LOGGED_IN_USER,
    userData
});

export const verifyingSession = () => ({
    type: VERIFYING_SESSION
});

export const verifiedSession = (status) => ({
    type: VERIFIED_SESSION,
    status
});

export const unverifiedSession = (status) => ({
    type: UNVERIFIED_SESSION,
    status
})