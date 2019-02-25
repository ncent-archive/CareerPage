import React from "react";
import dummyData from "./../dummyJobData.json";
import state from "./../store/initializeStore.js"
import routes from "./../axiosRoutes.js";

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

    // this.dummyAPICall();
    routes.getJob("dummyId").then(res => {
      console.log("dummyCallReturned");
      console.log("new state", state.getState());
      this.setState({ spinner: false });
    });
  }

  parseParams() {
    let obj = {};
    let paramStr = window.location.href.split("?")[1].split("#")[0];
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
      const jobState = state.getState();
      const job = {
        name: jobState.jobData.currentJob.challengeSettings.name,
        description: jobState.jobData.currentJob.challengeSettings.description,
        sponsor: jobState.jobData.currentJob.challengeSettings.sponsorName,
        minQuals: jobState.jobData.currentJob.completionCriteria.reward.metadatas[0].minQuals,
        prefQuals: jobState.jobData.currentJob.completionCriteria.reward.metadatas[0].prefQuals,
        location: jobState.jobData.currentJob.completionCriteria.reward.metadatas[0].location,
        extraParas: jobState.jobData.currentJob.completionCriteria.reward.metadatas[0].extraParas
      }
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
              {job.name}
            </div>
            <div className="jobSponsor">
              at {job.sponsor}
            </div>
            <div className="jobLocation">
              {job.location}
            </div>
            <div className="jobDescription">
              {job.description.replace(/\\n/g, <br />)}
            </div>
          </div>

          <div className="qualificationsContainer">

            <div className="qualContainer">
              <div className="qualsHeader">
                Minimum Qualifications:
              </div>
              <div className="qualsListing">
                {job.minQuals.map((str, i) => {
                  return (
                    <div className="qualText" key={i}>
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
                {job.prefQuals.map((str, i) => {
                  return (
                    <div className="qualText" key={i}>
                      • <span className="qualTextStr">{str}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          
          </div>

          <div className="moreInfoPs">
            {job.extraParas.map((el, i) => {
              return (
                <div className="moreInfoP" key={i}>
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