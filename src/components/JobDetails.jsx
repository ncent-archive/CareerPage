import React from "react";
import dummyData from "./../dummyJobData.json";
import state from "./../store/initializeStore.js"
import routes from "./../axiosRoutes.js";
import ReferralModal from "./ReferralModal.jsx";

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      renderModal: false,
      name: "",
      description: "",
      sponsor: "",
      minQuals: [],
      prefQuals: [],
      location: "",
      subIdx: 0
    }
    //bindings
    this.parseParams = this.parseParams.bind(this);
    this.dummyAPICall = this.dummyAPICall.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.triggerModalOn = this.triggerModalOn.bind(this);
    this.triggerModalOff = this.triggerModalOff.bind(this);
    this.tabSwitch = this.tabSwitch.bind(this);
    this.imgError = this.imgError.bind(this);
    this.setTabs = this.setTabs.bind(this);

  }
  //functions

  componentWillMount() {
    let paramsObj = this.parseParams();
    this.setState(paramsObj);

    // this.dummyAPICall();
    routes.getJob("dummyId").then(res => {
      this.setState({ spinner: false });
      this.setTabs();
    });

    // setTimeout(function() {
    //   this.setState({ spinner: false });
    // }.bind(this), 2000);
  }

  setTabs() {
    this.jobTabs.children[0].style.zIndex = "2";
    this.jobTabs.children[0].children[0].classList.remove("jobTabLeftInactive");
    this.jobTabs.children[0].children[0].classList.add("jobTabLeftActive");
    this.jobTabs.children[0].children[1].classList.remove("jobTabInactive");
    this.jobTabs.children[0].children[1].classList.add("jobTabActive");
    this.jobTabs.children[0].children[2].classList.remove("jobTabRightInactive");
    this.jobTabs.children[0].children[2].classList.add("jobTabRightActive");
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

  imgError(e) {
    e.target.remove();
  }

  triggerModalOn(e) {
    this.setState({ renderModal: true });
  }

  triggerModalOff(e) {
    e.stopPropagation();
    if (this.state.renderModal) {
      this.setState({ renderModal: false });
    }
  }

  renderModal() {
    if (this.state.renderModal) {
      return <ReferralModal closeModal={this.triggerModalOff} jobId={this.state.jobId} />;
    }
  }

  tabSwitch(e, i) {
    this.setState({ subIdx: i });
    Array.from(this.jobTabs.children).forEach((el, idx) => {
      if (idx === i) {
        el.style.zIndex = "2";
        el.children[0].classList.remove("jobTabLeftInactive");
        el.children[0].classList.add("jobTabLeftActive");
        el.children[1].classList.remove("jobTabInactive");
        el.children[1].classList.add("jobTabActive");
        el.children[2].classList.remove("jobTabRightInactive");
        el.children[2].classList.add("jobTabRightActive");
      } else {
        el.style.zIndex = "0";
        el.children[0].classList.remove("jobTabLeftActive");
        el.children[0].classList.add("jobTabLeftInactive");
        el.children[1].classList.remove("jobTabActive");
        el.children[1].classList.add("jobTabInactive");
        el.children[2].classList.remove("jobTabRightActive");
        el.children[2].classList.add("jobTabRightInactive");
      }
    })
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
      const jobState = state.getState().challenge.challengeData;
      const idx = this.state.subIdx;

      return (
        <div className="jobDetailContainer">

          {this.renderModal()}

          <div className="logoAndReferBtn">
            <div className="logo">
              <img className="logoImg" src={jobState.company.iconUrl} onError={this.imgError} />
            </div>
            <a className="referA" onClick={this.triggerModalOn}>Refer Now</a>
          </div>

          <div className="jobTabs" ref={el => this.jobTabs = el}>
            {jobState.subJobs.map((el, i) => {
              const containerClass = i % 2 === 0 ? 
              "jobTabContainer jobTabContainerRight" : 
              "jobTabContainer jobTabContainerLeft";
              return (
                <div className={containerClass} key={i} style={{}}>
                  <div className="jobTabLeftInactive"></div>
                  <div className="jobTabInactive" key={i} onClick={(e) => {this.tabSwitch(e, i)}}>{el.title}</div>
                  <div className="jobTabRightInactive"></div>
                </div>
              )
            })}
          </div>

          <div className="jobDetailContentContainer">
            <div className="jobTitle">
              {jobState.company.jobTitle} - {jobState.subJobs[idx].title}
            </div>
            <div className="jobSponsor">
              at {jobState.company.name}
            </div>
            <div className="jobLocation">
              {jobState.company.location}
            </div>
            <div className="jobDescription">
              {jobState.company.description.split("\n").map((el, i) => {
                return (
                  <p key={i}>{el.trim()}</p>
                )
              })}
            </div>
          </div>

          <div className="qualificationsContainer">

            <div className="qualContainer">
              <div className="qualsHeader">
                Responsibilities:
              </div>
              <div className="qualsListing">
                {jobState.subJobs[idx].responsibilities.list.map((str, i) => {
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
                Minimum Qualifications:
              </div>
              <div className="qualsListing">
                {jobState.subJobs[idx].requirements.list.map((str, i) => {
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
                {jobState.subJobs[idx].niceToHave.list.map((str, i) => {
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
            <div className="moreInfoP">
              <div className="moreInfoPHeader">
                {jobState.company.benefits.title}
              </div>
              <div className="moreInfoPBody">
                {jobState.company.benefits.description}
              </div>
            </div>
          </div>

          <iframe id="refer"></iframe>

        </div>
      )
    }
  }
}

export default JobDetails;