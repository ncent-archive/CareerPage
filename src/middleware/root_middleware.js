import { applyMiddleware } from "redux";
import { logger } from "redux-logger";
import ChallengesMiddleware from "./challengesMiddleware.js";
import UserAccountMiddleware from "./userAccountMiddleware.js";
import JobApplicationMiddleware from "./jobApplicationMiddleware.js";

const RootMiddleware = applyMiddleware(
  logger, 
  ChallengesMiddleware, 
  UserAccountMiddleware, 
  JobApplicationMiddleware
);

export default RootMiddleware;