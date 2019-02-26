import { applyMiddleware } from "redux";
import { logger } from "redux-logger";

const RootMiddleware = applyMiddleware(logger);

export default RootMiddleware;