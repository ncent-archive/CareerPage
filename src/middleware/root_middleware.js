import { applyMiddleware } from "redux";
import { logger } from "redux-logger";
import ChallengesMiddleware from "./challengesMiddleware.js";
import UserAccountMiddleware from "./userAccountMiddleware.js";

const RootMiddleware = applyMiddleware(logger, ChallengesMiddleware, UserAccountMiddleware);

export default RootMiddleware;