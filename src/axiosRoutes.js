// front-end routing
import store from "./store/initializeStore.js";
import dummyData from "./dummyJobData2.json";

import {receiveChallenge} from "./actions/challengeActions.js";

//Job routes

export default {
  getJob: function(id) {
    //real call
    // return axios.get("/dummyRoute").then(res => {
    //   let obj = fetchJobAction(res.body);
    //   store.dispatch(obj);
    // });

    //dummy call
    console.log("dummyGettingJobCall in axios routes");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let obj = receiveChallenge(dummyData);
        store.dispatch(obj);
        resolve();
      }, 900);
    });
  }
}