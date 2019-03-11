import React from "react";
import Landing from "./components/Landing.jsx";
import LandingContainer from "./components/LandingPageContainer.jsx";
import JobDetails from "./components/JobDetails.jsx";
import JobDetailsContainer from "./components/JobDetailsContainer.jsx";
import CreateChallenge from "./components/CreateChallenge.jsx";
import AdminPageContainer from "./components/AdminPageContainer.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from "./store/initializeStore.js";
import { fetchAllChallenges } from "./actions/challengeActions.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    //bindings

  }
  //functions

  componentDidMount() {
    // store.dispatch({
    //   type: "FETCH_JOB_DATA",
    //   data: "dummyData"
    // });
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LandingContainer} onEnter={() => {}} />
          <Route path="/detail" component={JobDetailsContainer} />
          <Route path="/createChallenge" component={CreateChallenge} />
          <Route path="/admin" component={AdminPageContainer} challenges={store.getState().challenge.challengesData} />
        </div>
      </Router>
    )
  }
}

export default App;