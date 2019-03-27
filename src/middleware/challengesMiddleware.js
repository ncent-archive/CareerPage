import {
    FETCH_ALL_CHALLENGES,
    FETCH_CHALLENGE,
    receiveChallenges,
    receiveChallenge
} from './../actions/challengeActions.js';

import {
    findAllChallenges,
    findOneChallenge
} from '../util/apiUtil.js';

const ChallengesMiddleware = ({getState, dispatch}) => next => action => {

    let receiveChallengesSuccess = (challenges) => {
        // .challengeSettings.metadatas[0].value);
        if (typeof challenges.data[0].challengeSettings.metadatas[0].value === "string") {
            //running idiosyncratic regex
            let newStr = challenges.data[0].challengeSettings.metadatas[0].value
                .replace("shipping robust code. \n We're looking", "shipping robust code. \\n We're looking")
                .replace('Expertise in Javascript, NodeJS, React"', 'Expertise in Javascript, NodeJS, React",');

            //changing idiosyncratic data on challenges object before dispatching
            challenges.data[0].challengeSettings.metadatas[0].value = JSON.parse(newStr);

            //changing format of JSON to generalized format
            challenges.data[0].challengeSettings.metadatas[0].value.subJobs = challenges.data[0].challengeSettings.metadatas[0].value.subJobs.map(subJob => {
                subJob.data = [subJob.niceToHave, subJob.requirements, subJob.responsibilities];
                return subJob;
            });
            // dispatch(receiveChallenges(challenges.data[0]));
        }

        if (challenges.data[1] && typeof challenges.data[1].challengeSettings.metadatas[0].value === "string") {
            //running idiosyncratic regex
            let newStr = challenges.data[1].challengeSettings.metadatas[0].value
                .replace("shipping robust code. \n We're looking", "shipping robust code. \\n We're looking")
                .replace('Expertise in Javascript, NodeJS, React"', 'Expertise in Javascript, NodeJS, React",');

            //changing idiosyncratic data on challenges object before dispatching
            challenges.data[1].challengeSettings.metadatas[0].value = JSON.parse(newStr);

            //changing format of JSON to generalized format
            challenges.data[1].challengeSettings.metadatas[0].value.subJobs = challenges.data[1].challengeSettings.metadatas[0].value.subJobs.map(subJob => {
                subJob.data = [subJob.niceToHave, subJob.requirements, subJob.responsibilities];
                return subJob;
            });
            // dispatch(receiveChallenges(challenges.data[0]));
        }

        for (let challenge of challenges.data) {
            if (typeof challenge.challengeSettings.metadatas[0].value === "string") {
                let newStr = challenge.challengeSettings.metadatas[0].value.replace(/\\"/g, '"').replace(/\n/g, "\\n");
                console.log(newStr);
                challenge.challengeSettings.metadatas[0].value = JSON.parse(newStr);
            }
        }

        dispatch(receiveChallenges(challenges.data));
    };

    let receiveChallengeSuccess = (challenge) => {
        if (typeof challenge.data.challengeSettings.metadatas[0].value === "string") {
            let newStr = challenge.data.challengeSettings.metadatas[0].value
                .replace("shipping robust code. \n We're looking", "shipping robust code. \\n We're looking")
                .replace('Expertise in Javascript, NodeJS, React"', 'Expertise in Javascript, NodeJS, React",');

            challenge.data.challengeSettings.metadatas[0].value = JSON.parse(newStr);

            challenge.data.challengeSettings.metadatas[0].value.subJobs = challenge.data.challengeSettings.metadatas[0].value.subJobs.map(subJob => {
                subJob.data = [subJob.niceToHave, subJob.requirements, subJob.responsibilities];
                return subJob;
            });
            dispatch(receiveChallenge(challenge.data));
        } else {
            let newStr = challenge.data.challengeSettings.metadatas[0].value.replace(/\\"/g, '"').replace(/\n/g, "\\n");
            challenge.data.challengeSettings.metadatas[0].value = JSON.parse(newStr);
            dispatch(receiveChallenge(challenge.data));
        }
    };

    let error = e => console.log("Error in Challenges Middleware!", e);

    switch (action.type) {
        case FETCH_ALL_CHALLENGES:
            console.log("challengesMiddleware.js, case FETCH_ALL_CHALLENGES", action);
            findAllChallenges(null, receiveChallengesSuccess, error);
            return next(action);
        case FETCH_CHALLENGE:
            console.log("challengesMiddleware.js, case FETCH_CHALLENGE", action);
            findOneChallenge(action.challengeId, receiveChallengeSuccess, error);
            return next(action);
        default:
            return next(action);
    }
};

export default ChallengesMiddleware;


// import {
//   FETCH_USER,
//   receiveUser
// } from '../actions/user_actions';

// import {
//   fetchUser
// } from '../util/user_api_util';

// const UserMiddleware = ({ getState, dispatch }) => next => action => {
//   let receiveUserSuccess = user => dispatch(receiveUser(user));
//   let error = e => console.log(e.responseJSON);

//   switch (action.type) {
//     case FETCH_USER:
//       fetchUser(action.id, receiveUserSuccess, error);
//       return next(action);
//     default:
//       return next(action);
//   }
// };

// export default UserMiddleware;