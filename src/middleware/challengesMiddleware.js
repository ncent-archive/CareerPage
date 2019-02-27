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

const ChallengesMiddleware = ({ getState, dispatch }) => next => action => {

  let receiveChallengesSuccess = (challenges) => {
    // console.log("challengesmiddleware", challenges.data[0].challengeSettings.metadatas[0].value);
    let newStr = challenges.data[0].challengeSettings.metadatas[0].value.replace("challengesmiddleware {", '{"challengesmiddleware": {')
      .replace("shipping robust code. \n We're looking", "shipping robust code. \\n We're looking")
      .replace('Expertise in Javascript, NodeJS, React"', 'Expertise in Javascript, NodeJS, React",');
    // newStr += "}";
    // console.log("newStr", newStr);
    dispatch(receiveChallenges(JSON.parse(newStr)));
  };

  let receiveChallengeSuccess = (challenge) => {
    // console.log("challengesmiddleware", challenge.data.challengeSettings.metadatas[0].value);
    let newStr = challenge.data.challengeSettings.metadatas[0].value.replace("shipping robust code. \n We're looking", "shipping robust code. \\n We're looking")
    .replace('Expertise in Javascript, NodeJS, React"', 'Expertise in Javascript, NodeJS, React",');

    dispatch(receiveChallenge(JSON.parse(newStr)));
  }

  let error = e => console.log("Error in Challenges Middleware!", e);

  switch (action.type) {
    case FETCH_ALL_CHALLENGES:
      findAllChallenges(null, receiveChallengesSuccess, error);
      return next(action);
    case FETCH_CHALLENGE:
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