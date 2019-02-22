import React from "react";
import Landing from "./components/Landing.jsx";
import JobDetails from "./components/JobDetails.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    //bindings

  }
  //functions


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