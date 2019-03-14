import React from "react";
import CreateChallengeCustom from "./CreateChallengeCustom.jsx";
import CreateChallengeSimple from "./CreateChallengeSimple.jsx";
const apiUtil = require("./../util/apiUtil.js");


class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeType: ""
    }

    //bindings
    this.changeChallengeType = this.changeChallengeType.bind(this);

  }

  //functions

  changeChallengeType(e) {
    this.setState({ challengeType: e.target.dataset.type });
  }

  render() {
    if (this.state.challengeType === "Custom") {
      return (
        <CreateChallengeCustom />
      )
    } else if (this.state.challengeType === "Job") {
      return (
        <CreateChallengeSimple />
      )
    } else {
      return (
        <div className="createChallengeOptions">
          <span className="createChallengeOptionsHeader">What kind of challenge would you like to create?</span>
          <div className="createChallengeOption" 
            onClick={this.changeChallengeType} data-type="Job"
          >
            Job Posting
          </div>
          <div className="createChallengeOption" 
            onClick={this.changeChallengeType} data-type="Custom"
          >
            Custom Challenge
          </div>
        </div>
      )
    }
  }
}

export default CreateChallenge;