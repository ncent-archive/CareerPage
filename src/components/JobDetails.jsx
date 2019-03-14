import React from "react";
import dummyData from "./../dummyJobData.json";
import routes from "./../axiosRoutes.js";
import ReferralModal from "./ReferralModal.jsx";
import store from "./../store/initializeStore.js";
import { fetchChallenge } from "./../actions/challengeActions.js";
import { verifyingSession } from "./../actions/userActions.js";
import formLink from "./../formLink.js";
import ApplicationForm from "./ApplicationForm.jsx";
import $ from "jquery";
import downArrow from "../img/Scroll Down-595b40b75ba036ed117d58fa.svg";

// let formHTML = require("./../testForm.html");
// import testForm from "./../testForm.js";

const invisible = {
  visibility: "none"
};

// $(function () {
//   $('a').on('click', function (e) {
//     console.log('link clicked');
//     e.preventDefault();
//     $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
//   });
// });

// function scrollToDetails(e) {
//   e.preventDefault();
//   $('html, body').animate({ scrollTop: $('#jobDetails').offset().top }, 500, 'linear');
// }

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
      formLoaded: false,
      arrowUp: true,
      renderExplainer: false,
      showInstructions: true
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
    this.renderArrow = this.renderArrow.bind(this);
    this.handleExpansion = this.handleExpansion.bind(this);
    this.renderPreviewTitle = this.renderPreviewTitle.bind(this);
    this.switchInstructions = this.switchInstructions.bind(this);
    
  }
  //functions

  componentWillMount() {
    let paramsObj = this.parseParams();
    this.setState(paramsObj, this.handleGetChallenge);

    //session verification
    store.dispatch(verifyingSession());
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.received && this.props.received && !this.state.showInstructions) this.setTabs();
  }

  handleExpansion(e) {
    e.stopPropagation();
    this.setState({ arrowUp: !this.state.arrowUp });
    this.setState({ renderExplainer: !this.state.renderExplainer });
  }

  renderArrow() {
    if (this.state.arrowUp) {
      return (
        <svg className="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
          <path fillRule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path>
        </svg>
      )
    } else {
      return (
        <svg className="positionArrow arrowDown" viewBox="0 0 10 16" version="1.1" width="12" height="20">
          <path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
        </svg>
      )
    }
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

  renderPreviewTitle() {
    if (this.state.referralCode) {
      return (
        <span className="previewTitle">You Were Referred To Help Us Fill This Job!</span>
      );
    } else {
      return (
        <span className="previewTitle">Help Us Fill This Job</span>
      );
    }
  }

  switchInstructions() {
    this.setState({ showInstructions: !this.state.showInstructions }, () => {
      if (!this.state.showInstructions) this.setTabs();
    });
  }

  render() {
    let explainerClass = this.state.renderExplainer ? "visibleExplainer" : "invisibleExplainer";
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

      if (this.state.showInstructions) {
        return (
          <section id="section03" className="demo">
            {this.renderPreviewTitle()}
            <div className="infoContainer">
              <span className="infoSpan">Step 1: SHARE this job with your network</span>
              <span className="infoSpan">Step 2: If anyone in your sharing network finds the person we hire... YOU will share the rewards!</span>
              <div className="exampleContainer" onClick={this.handleExpansion}>
                <div className="seeHowThisWorks">
                  <span>See how this works</span>
                  {this.renderArrow()}
                </div>
                <div className={explainerClass}>
                  <span className="infoSpan">Person 0: Gets hired by nCent Labs</span>
                  <span className="infoSpan">Person 1: Shares this listing with Person 0 and earns a $4,000 reward.</span>
                  <span className="infoSpan">Person 2: Shares this listing with Person 1 and earns a $2K reward.</span>
                  <span className="infoSpan">Person 3: Shares this listing with Person 2 and earns a $1K reward.</span>
                  <span className="infoSpan">... and so on...</span>
                </div>
              </div>
            </div>
            <a href="#jobDetails" onClick={() => {}}>
              <div className="scrollBtnContainer">
                <img className="downArrow" src={downArrow} onClick={this.switchInstructions} />
                <span className="shareNow">Get Started</span>
              </div>
            </a>
          </section>
        )
      } else {
        return (
          <div className="jobDetailContainer">
  
            {this.renderModal()}
  
            {/* <div id="jobDetails" className="logoAndReferBtn">
              <a className="referA" onClick={this.triggerModalOn}>Share Now
                <img className="shareIcon" src="https://cdn1.iconfinder.com/data/icons/media-icons-23/100/share-512.png" />
              </a>
            </div> */}
  
            <div className="logoAndReferBtn" id="jobDetails">
              <div className="logo">
                <img className="logoImg" src={jobState.company.iconUrl} onError={this.imgError} />
              </div>
              <div className="referAndInstructions">
                <a className="referA" onClick={this.triggerModalOn}>
                  Share Now 
                  <img className="shareIcon" src="https://cdn1.iconfinder.com/data/icons/media-icons-23/100/share-512.png" />
                </a>
                <div className="questionMark" onClick={this.switchInstructions}>
                  ?
                </div>
              </div>
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
                const containerClass = i === 0 ? 
                "jobTabContainer jobTabContainerRight" : 
                "jobTabContainer jobTabContainerLeft";
                return (
                  <div className={"jobTabContainer"} key={i} style={{right: i * 25}}>
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
}

export default JobDetails;