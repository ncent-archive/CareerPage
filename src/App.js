import React from "react";
import Landing from "./components/Landing.jsx";
import JobDetails from "./components/JobDetails.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from "./store/initializeStore.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    //bindings

  }
  //functions

  componentDidMount() {
    console.log("<App /> mounted", this.props.store, this.props, store, JSON.stringify(store.getState()));
    store.dispatch({
      type: "FETCH_JOB_DATA",
      data: "dummyData"
    });
  }


  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/detail" component={JobDetails} />
        </div>
      </Router>
    )
  }
}

export default App;