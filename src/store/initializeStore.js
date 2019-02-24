//setting up redux store
import {createStore, applyMiddleware} from "redux";
import reducer from "./../reducers/combinedReducer.js";
import defaultState from "./../reducers/defaultState.json";
import {logger} from "redux-logger";

function initializeStore() {
  return createStore(reducer, defaultState || {}, applyMiddleware(logger));
}

// export default initializeStore;
export default createStore(reducer, defaultState || {}, applyMiddleware(logger));
// export default createStore(reducer);