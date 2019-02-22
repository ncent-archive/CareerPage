import React from "react";
import dummyData from "./../dummyJobData.json";

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      name: "",
      description: "",
      sponsor: "",
      minQuals: [],
      prefQuals: [],
      location: ""
    }
    //bindings
    this.parseParams = this.parseParams.bind(this);
    this.dummyAPICall = this.dummyAPICall.bind(this);

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
    setTimeout(this.setState.bind(this), 10, {
      spinner: false,
      name: dummyData.body.challengeSettings.name,
      description: dummyData.body.challengeSettings.description,
      sponsor: dummyData.body.challengeSettings.sponsorName,
      minQuals: dummyData.body.completionCriteria.reward.metadatas[0].minQuals,
      prefQuals: dummyData.body.completionCriteria.reward.metadatas[0].prefQuals,
      location: dummyData.body.completionCriteria.reward.metadatas[0].location,
      extraParas: dummyData.body.completionCriteria.reward.metadatas[0].extraParas
    });
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

          <div className="logoAndReferBtn">
            <div className="logo">
              {/* Placeholder for icon */}
            </div>
            <a className="referA" href="#refer">Refer Now</a>
          </div>

          <div className="jobDetailContentContainer">
            <div className="jobTitle">
              {this.state.name}
            </div>
            <div className="jobSponsor">
              at {this.state.sponsor}
            </div>
            <div className="jobLocation">
              {this.state.location}
            </div>
            <div className="jobDescription">
              {this.state.description.replace(/\\n/g, <br />)}
            </div>
          </div>

          <div className="qualificationsContainer">

            <div className="qualContainer">
              <div className="qualsHeader">
                Minimum Qualifications:
              </div>
              <div className="qualsListing">
                {this.state.minQuals.map(str => {
                  return (
                    <div className="qualText">
                      • <span className="qualTextStr">{str}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="qualContainer">
              <div className="qualsHeader">
                Preferred Qualifications:
              </div>
              <div className="qualsListing">
                {this.state.prefQuals.map(str => {
                  return (
                    <div className="qualText">
                      • <span className="qualTextStr">{str}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          
          </div>

          <div className="moreInfoPs">
            {this.state.extraParas.map(el => {
              return (
                <div className="moreInfoP">
                  <div className="moreInfoPHeader">
                    {el.header}
                  </div>
                  <div className="moreInfoPBody">
                    {el.body}
                  </div>
                </div>
              )
            })}
          </div>

          <iframe id="refer"></iframe>

        </div>
      )
    }
  }
}

export default JobDetails;