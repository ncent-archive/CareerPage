import React from "react";
import dummyData from "./../dummyJobData.json";
import routes from "./../axiosRoutes.js";
import ReferralModal from "./ReferralModal.jsx";
import store from "./../store/initializeStore.js";
import { fetchChallenge } from "./../actions/challengeActions.js";
import { verifyingSession } from "./../actions/userActions.js";
import formLink from "./../formLink.js";
import ApplicationForm from "./ApplicationForm.jsx";

// let formHTML = require("./../testForm.html");
// import testForm from "./../testForm.js";

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
      subIdx: 0,
      formLoaded: false
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
    this.getChallenge = this.getChallenge.bind(this);
    this.handleGetChallenge = this.handleGetChallenge.bind(this);
    this.formLoad = this.formLoad.bind(this);

  }
  //functions

  componentWillMount() {
    let paramsObj = this.parseParams();
    this.setState(paramsObj, this.handleGetChallenge);

    //session verification
    store.dispatch(verifyingSession());
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.received && this.props.received) this.setTabs();
  }

  getChallenge() {
    return new Promise((resolve, reject) => {
      resolve(fetchChallenge(this.state.jobId));
    })
  }

  async handleGetChallenge() {
    let obj = await this.getChallenge();
    store.dispatch(obj);
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
      return <ReferralModal closeModal={this.triggerModalOff} jobId={this.state.jobId} 
        user={this.props.user} challenge={this.props.challengeData} referralCode={this.state.referralCode}
        />;
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

  formLoad() {
    console.log("iframe from google loaded");
    this.setState({ formLoaded: true });
  }

  formSpinner() {
    if (this.state.formLoaded) {
      return <div className="emptySpinner"></div>;
    } else {
      return (
        <div className="formSpinner">
        </div>
      )
    }
  }

  render() {

    if (!this.props.received) {
      console.log("spinner condition", this.props.challengeData);
      return (
        <div className="spinnerContainer">
          <div className="spinner">
          </div>
        </div>
      )
    } else {

      // console.log(this.props);
      const jobState = this.props.challengeData.challengeSettings.metadatas[0].value;
      const idx = this.state.subIdx;

      //for idiosyncratic default challenge
      let Benefits = "";
      if (jobState.company.benefits) {
        Benefits = (
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
        )
      }

      return (
        <div className="jobDetailContainer">

          {this.renderModal()}

          <div className="logoAndReferBtn">
            <div className="logo">
              <img className="logoImg" src={jobState.company.iconUrl} onError={this.imgError} />
            </div>
            <a className="referA" onClick={this.triggerModalOn}>Share Now</a>
          </div>

          <div className="jobDetailContentContainer">
            <div className="jobTitle">
              {jobState.company.jobTitle} 
              {/* - {jobState.subJobs[idx].title} */}
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

          <div className="qualificationsContainer">

            {/* {change way data is in subJobs - have title and array of other data}  */}
            {jobState.subJobs[idx].data.map((el, i) => {
              return (
                <div className="qualContainer" key={i}>
                  <div className="qualsHeader">
                    {el.title}:
                  </div>
                  <div className="qualsListing">
                    {el.list.map((str, i) => {
                      return (
                        <div className="qualText" key={i}>
                          • <span className="qualTextStr">{str}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
           

            {/* <div className="qualContainer">
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
           */}
          </div>

          {Benefits}

          <ApplicationForm referralCode={this.state.referralCode} 
            status={this.props.jobApplication.jobApplicationSuccessful}
            position={jobState.company.jobTitle} subPosition={jobState.subJobs[idx].title}
          />

        </div>
      )
    }
  }
}

export default JobDetails;