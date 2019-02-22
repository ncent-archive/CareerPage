//setting up redux store
import {createStore} from "redux";
import reducer from "./../reducers/combinedReducer.js";

function initializeStore() {
  return createStore(reducer);
}

export default initializeStore;