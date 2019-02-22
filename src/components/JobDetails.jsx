import React from "react";
import dummyData from "./../dummyJobData.json";

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true
    }
    //bindings
    this.parseParams = this.parseParams.bind(this);
    this.dummyAPICall = this.dummyAPICall.bind(this);
    this.referralScroll = this.referralScroll.bind(this);
    
  }
  //functions

  componentWillMount() {
    let paramsObj = this.parseParams();
    this.setState(paramsObj);
    this.dummyAPICall();
  }

  parseParams() {
    let obj = {};
    let paramStr = window.location.href.split("?")[1];
    paramStr.split("&").forEach(pair => {
      let split = pair.split("=");
      obj[split[0]] = split[1];
    });
    return obj;
  }

  dummyAPICall() {
    //simulating load time
    setTimeout(this.setState.bind(this), 2500, {
      spinner: false,
      name: dummyData.body.challengeSettings.name,
      description: dummyData.body.challengeSettings.description,
      minQuals: dummyData.body.completionCriteria.reward.metadatas[0].minQuals,
      prefQuals: dummyData.body.completionCriteria.reward.metadatas[0].prefQuals,
      location: dummyData.body.completionCriteria.reward.metadatas[0].location
    })
  }

  referralScroll(e) {
    console.log("scrolling");
  }

  render() {
    if (this.state.spinner) {
      return (
        <div className="spinnerContainer">
          <div className="spinner">
          </div>
        </div>
      )
    } else {
      return (
        <div className="jobDetailContainer">
          <div className="logoAndApplyBtn">
            <div className="logo"></div>
            <button onClick={this.referralScroll}>Refer Now</button>
          </div>
        </div>
      )
    }
  }
}

export default JobDetails;