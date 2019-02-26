//setting up redux store
import {createStore, applyMiddleware} from "redux";
import reducer from "./../reducers/combinedReducer.js";
import defaultState from "./../reducers/defaultState.json";
import RootMiddleware from "./../middleware/root_middleware.js";

function initializeStore() {
  return createStore(reducer, defaultState || {}, RootMiddleware);
}

export default createStore(reducer, defaultState || {}, RootMiddleware);