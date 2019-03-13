import React from "react";
import { withRouter } from "react-router-dom";
const apiUtil = require("./../util/apiUtil.js");


class CreateChallengeSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageUrl: "",
      sponsorName: "",
      admin: "",
      location: "",
      subJobs: [],
      spinner: false,
      challengeCreated: false,
      stage: [
        "initial",
        "sponsorName",
        "name",
        "location",
        "description",
        "imageUrl",
        "subJobs",
        "final"
      ],
      stageIdx: 0,
      subJobsStage: 0,
      currentSubJobTitle: "",
      currentSubJobDataCollection: "",
      currentSubJobDataPoint: ""
    }

    //bindings
    this.addHunt = this.addHunt.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.addSubJob = this.addSubJob.bind(this);
    this.subJobTitleChange = this.subJobTitleChange.bind(this);
    this.addDataCollection = this.addDataCollection.bind(this);
    this.subJobDataCollectionTitleChange = this.subJobDataCollectionTitleChange.bind(this);
    this.addDataPoint = this.addDataPoint.bind(this);
    this.subJobDataPointChange = this.subJobDataPointChange.bind(this);
    this.redirectToAdminPage = this.redirectToAdminPage.bind(this);
    this.renderCurrentStage = this.renderCurrentStage.bind(this);
    this.advanceStage = this.advanceStage.bind(this);
    this.regressStage = this.regressStage.bind(this);
    this.advanceSubJobStage = this.advanceSubJobStage.bind(this);
    this.regressSubJobStage = this.regressSubJobStage.bind(this);
    this.revertToNewHeader = this.revertToNewHeader.bind(this);
    this.revertToNewSubJob = this.revertToNewSubJob.bind(this);
    this.addNewSubJobSimple = this.addNewSubJobSimple.bind(this);
    this.addNewDataCollectionSimple = this.addNewDataCollectionSimple.bind(this);
    this.addNewDataPointSimple = this.addNewDataPointSimple.bind(this);
    this.renderLeftArrow = this.renderLeftArrow.bind(this);
    this.renderRightArrow = this.renderRightArrow.bind(this);

  }

  //functions

  async addHunt() {
    console.log("\n\nCreateChallenge.jsx, adding challenge");
    let obj = {
      "challengeNamespace": {
        "challengeSettings": {
          "admin": this.state.admin || 1,
          "description": this.state.description,
          "expiration": this.state.expiration || "2020-02-02T00:35:01.441Z",
          "imageUrl": this.state.imageUrl || "https://ncent.io/Applications/landingPage/img/ncent_NOsubline_500px_white.png",
          "maxShares": this.state.maxShares || 100,
          "metadatas": [
            {
              "key": "jobDetails",
              "value": {
                "company": {
                  "description": this.state.description,
                  "iconUrl": this.state.imageUrl || "https://ncent.io/Applications/landingPage/img/ncent_NOsubline_500px_white.png",
                  "jobTitle": this.state.name,
                  "jobsUrl": "",
                  "location": this.state.location,
                  "name": this.state.sponsorName,
                  "shareText": this.state.shareText || "",
                  "totalUsdReward": this.state.totalReward || "1000.00"
                },
                "subJobs": this.state.subJobs
              }
            }
          ],
          "name": this.state.name,
          "offChain": true,
          "shareExpiration": this.state.shareExpiration || "2020-02-02T00:35:01.441Z",
          "sponsorName": this.state.sponsorName,
          "challengeType": "jobSimplified"
        },
        "completionCriteria": {
          "address": "[B@708f5957",
          "prereq": [],
          "reward": {
            "type": {
              "audience": "PROVIDENCE",
              "type": "N_OVER_2"
            }
          }
        },
        "distributionFeeReward": {
          "type": {
            "audience": "PROVIDENCE",
            "type": "SINGLE"
          }
        },
        "subChallenges": []
      }
    }
    console.log("\nchallenge about to be dispatched from CreateChallenge.jsx", obj);
    obj.challengeNamespace.challengeSettings.metadatas[0].value = JSON.stringify(obj.challengeNamespace.challengeSettings.metadatas[0].value).replace(/"/g, '\\"');
    console.log(obj.challengeNamespace.challengeSettings.metadatas[0].value);

    //setting spinner
    this.setState({ spinner: true });

    let response = await apiUtil.createChallenge(obj);
    console.log("\nin CreateChallenge.jsx, createChallenge api call just returned", response.data);

    this.setState({ challengeCreated: true });
    setTimeout(this.redirectToAdminPage.bind(this), 850);
  }

  redirectToAdminPage() {
    this.props.history.push("/admin?redirect=latest");
  }

  inputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  addSubJob(e) {
    console.log("adding subjob...");
    let container = this.subJobsContainer;

    let newSubJob = document.createElement("div");
    newSubJob.classList.add("addSubJobContainer");
    newSubJob.dataset.num = this.state.subJobs.length;

    let newSpan = document.createElement("span");
    newSpan.classList.add("addSubJob");
    newSpan.innerText = "Sub-Job Title";
    newSubJob.appendChild(newSpan);

    let newInput = document.createElement("input");
    newInput.classList.add("addSubJobInput");
    newInput.type = "text";
    newInput.placeholder = "Name for this sub-job";
    newInput.addEventListener("change", this.subJobTitleChange);
    newSubJob.appendChild(newInput);

    let newButton = document.createElement("button");
    newButton.classList.add("addDataCollectionButton");
    newButton.innerText = "Add Data Collection";
    newButton.addEventListener("click", this.addDataCollection);
    newSubJob.appendChild(newButton);

    let newSubJobsState = this.state.subJobs.concat({
      title: "",
      data: []
    });
    this.setState({ subJobs: newSubJobsState });
    // console.log("\naddSubJob in CreateChallenge.jsx, newSubJob before adding is", newSubJob);
    container.appendChild(newSubJob);
  }

  subJobTitleChange(e) {
    let idx = e.target.parentNode.dataset.num;
    let newSubJobsState = this.state.subJobs;
    newSubJobsState[idx].title = e.target.value;
    this.setState({ subJobs: newSubJobsState });
  }

  addDataCollection(e) {
    let container = e.target.parentNode;
    let majorIdx = container.dataset.num;
    let minorIdx = this.state.subJobs[container.dataset.num].data.length;

    let newContainer = document.createElement("div");
    newContainer.classList.add("addSubJobDataCollectionContainer");
    newContainer.dataset.num = minorIdx;

    let newSpan = document.createElement("span");
    newSpan.classList.add("addSubJobDataCollectionTitle");
    newSpan.innerText = "Data Collection Title";
    newContainer.appendChild(newSpan);

    let newInput = document.createElement("input");
    newInput.classList.add("addSubJobDataCollectionInput");
    newInput.addEventListener("change", this.subJobDataCollectionTitleChange);
    newContainer.appendChild(newInput);
    newInput.placeholder = "";

    let newButton = document.createElement("button");
    newButton.classList.add("addSubJobDataPointButton");
    newButton.innerText = "Add Data Point";
    newButton.addEventListener("click", this.addDataPoint);
    newContainer.appendChild(newButton);

    container.appendChild(newContainer);

    let newSubJobsState = this.state.subJobs;
    // console.log("adding new data collection, state before", newSubJobsState);
    newSubJobsState[majorIdx].data.push({
      title: "",
      list: []
    });
    // console.log("adding new data collection, state after", newSubJobsState);
    this.setState({ subJobs: newSubJobsState });
  }

  subJobDataCollectionTitleChange(e) {
    let newSubJobsState = this.state.subJobs;
    newSubJobsState[e.target.parentNode.parentNode.dataset.num]
      .data[e.target.parentNode.dataset.num].title = e.target.value;
    this.setState({ subJobs: newSubJobsState });
  }

  addDataPoint(e) {
    let container = e.target.parentNode;
    let majorIdx = container.parentNode.dataset.num;
    let minorIdx = container.dataset.num;
    // console.log("addDataPoint", this.state.subJobs, this.state.subJobs[container.parentNode.dataset.num])
    let idx = this.state.subJobs[majorIdx].data[minorIdx].list.length;

    let newContainer = document.createElement("div");
    newContainer.classList.add("addSubJobDataPointContainer");
    newContainer.dataset.num = idx;
    newContainer.innerText = "• ";

    let newInput = document.createElement("input");
    newInput.classList.add("addSubJobDataPointInput");
    newInput.addEventListener("change", this.subJobDataPointChange);
    newContainer.appendChild(newInput);

    container.appendChild(newContainer);

    let newSubJobsState = this.state.subJobs;
    newSubJobsState[majorIdx].data[minorIdx].list.push("");
    this.setState({ subJobs: newSubJobsState });
  }

  subJobDataPointChange(e) {
    let newSubJobsState = this.state.subJobs;
    newSubJobsState[e.target.parentNode.parentNode.parentNode.dataset.num]
      .data[e.target.parentNode.parentNode.dataset.num]
      .list[e.target.parentNode.dataset.num] = e.target.value;
    this.setState({ subJobs: newSubJobsState });
  }

  renderCurrentStage() {
    switch(this.state.stage[this.state.stageIdx]) {
      case "initial":
        return (
          <div className="addChallengeSimpleHeader">
            This form will allow you to create a new job posting.
          </div>
        );
      case "sponsorName":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Which company is hiring?</span>
            <input className="addHuntFormInput" type="text" placeholder="e.g. nCent Labs" id="sponsorName"
              onChange={this.inputChange} value={this.state.sponsorName}
            />
            <br />
          </div>
        );
      case "name":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">
              What general position are you hiring for?
            </span>
            <input className="addHuntFormInput" type="text" placeholder="e.g. Senior Software Engineer" id="name"
              onChange={this.inputChange} value={this.state.name}
            />
            <span className="addChallengeFormFieldNameSmaller">
              We will add specific sub-jobs later, such as front-end or back-end
            </span>
            <br />
          </div>
        );
      case "location":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Where is this position geographically?</span>
            <input className="addHuntFormInput" type="text" placeholder="e.g. Redwood City, CA" id="location"
              onChange={this.inputChange} value={this.state.location}
            />
            <br />
          </div>
        );
      case "description":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Please tell us about your company</span>
            <textarea className="addChallengeSimpleDescription" type="text" placeholder="e.g. nCent Labs is a Stanford / Google / MIT PhD-led blockchain startup backed by Sequoia, SV Angel, Winklevoss Capital, MetaStable, Naval Ravikant, Steve Jurvetson, and others. We have a bold mission to..." id="description"
              onChange={this.inputChange} value={this.state.description}
            />
            <br />
          </div>
        );
      case "imageUrl":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Give us a link to your company logo so we can add it to the posting</span>
            <input className="addHuntFormInput" type="text" placeholder="Image URL" id="imageUrl"
              onChange={this.inputChange} value={this.state.imageUrl}
            />
            <span className="addChallengeFormFieldNameSmaller">
              You can leave this blank if you like
            </span>
            <br />
          </div>
        );
      case "subJobs":
        switch(this.state.subJobsStage) {
          case 0:
            return (
              <div className="addChallengeFormContainerSubJobs">
                <div className="addChallengeFormFieldName">
                  Now we're going to add sub-jobs
                  <br />
                  <br />
                  <div className="addChallengeFormFieldNameSmaller">
                    These are specific positions, such as front-end, back-end, etc.
                  </div>
                </div>
                <button className="addSubJobSimpleButtonInitial" 
                  onClick={this.advanceSubJobStage}
                >
                  Add New Sub-Job
                </button>
              </div>
            );
          case 1:
            return (
              <div className="addChallengeFormContainerSubJobs">
                <span className="addChallengeFormFieldName">
                  What is the specific position?
                </span>
                <input className="addHuntFormInput" type="text" placeholder="e.g. Front-End Engineer" 
                  id="currentSubJobTitle" onChange={this.inputChange} 
                  value={this.state.currentSubJobTitle}
                />
                <button className="addSubJobSimpleButton"
                  onClick={this.addNewSubJobSimple}
                >
                  Add Position to Sub-Job
                </button>
              </div>
            );
          case 2:
            return (
              <div className="addChallengeFormContainer">
                <span className="addChallengeFormFieldName">
                  What is a good header for a collection of bullet points?
                </span>
                <input className="addHuntFormInput" type="text" placeholder="e.g. Minimum Requirements"
                  id="currentSubJobDataCollection" onChange={this.inputChange} 
                  value={this.state.currentSubJobDataCollection}
                />
                <button className="addSubJobSimpleButton"
                  onClick={this.addNewDataCollectionSimple}
                >
                  Add Paragraph Header
                </button>
                <span className="addChallengeFormFieldNameSmaller">
                  We will build the bullet points next
                </span>
              </div>
            );
          case 3:
            return (
              <div className="addChallengeFormContainer">
                <span className="addChallengeFormFieldName">
                  Please add one data point
                </span>
                <div className="addChallengeSimpleDataPointContainer">
                  <span className="bullet">
                    •
                  </span>
                  <input className="addHuntFormInput" type="text" placeholder="e.g. 5+ years of experience" 
                    id="currentSubJobDataPoint" onChange={this.inputChange}
                    value={this.state.currentSubJobDataPoint}
                  />
                </div>
                <button className="addSubJobSimpleButton"
                  onClick={this.addNewDataPointSimple}
                >
                  Add Data Point
                </button>
              </div>
            );
          case 4:
            return (
              <div className="addChallengeFormContainerSubJobs">
                <span className="addChallengeFormFieldName">
                  Would you like to add another data point?
                </span>
                <div className="addChallengeFormSimpleButtonWrapper">
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.regressSubJobStage}
                  >
                    Yes
                  </button>
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.advanceSubJobStage}
                  >
                    No, I'm done
                  </button>
                </div>
              </div>
            );
          case 5:
            return (
              <div className="addChallengeFormContainerSubJobs">
                <span className="addChallengeFormFieldName">
                  Would you like to add another paragraph header to {this.state.currentSubJobTitle}?
                </span>
                <div className="addChallengeFormSimpleButtonWrapper">
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.revertToNewHeader}
                  >
                    Yes
                  </button>
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.advanceSubJobStage}
                  >
                    No, I'm done
                  </button>
                </div>
              </div>
            );
          case 6: 
            return (
              <div className="addChallengeFormContainerSubJobs">
                <span className="addChallengeFormFieldName">
                  Would you like to add another sub-job to {this.state.name}?
                </span>
                <div className="addChallengeFormSimpleButtonWrapper">
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.revertToNewSubJob}
                  >
                    Yes
                  </button>
                  <button className="addSubJobSimpleButtonChoice"
                    onClick={this.advanceSubJobStage}
                  >
                    No, I'm done
                  </button>
                </div>
              </div>
            );
        }
      case "final":
        return (
          <div className="addChallengeFormContainerSubJobs">
            <span className="addChallengeFormFieldName">
              That's everything!
              <br />
              <br />
              Submit whenever you are ready
            </span>
            <button className="addChallengeButtonSimple" onClick={this.addHunt}>Create Job Posting</button>
          </div>
        );
      default:
        return (
          <div>
            There was an error. Please try again.
          </div>
        )
    }
  }

  advanceStage() {
    let newIdx = this.state.stageIdx + 1 >= this.state.stage.length ? 
      this.state.stage.length - 1 : 
      this.state.stageIdx + 1;
    this.setState({ stageIdx: newIdx });
  }

  regressStage() {
    let newIdx = this.state.stageIdx - 1 <= 0 ?
      0 :
      this.state.stageIdx - 1;
    this.setState({ stageIdx: newIdx });
  }

  advanceSubJobStage() {
    let newIdx = this.state.subJobsStage + 1;
    newIdx <= 6 ? 
    this.setState({ subJobsStage: this.state.subJobsStage + 1 }) :
    this.advanceStage();
  }

  regressSubJobStage() {
    this.setState({ 
      subJobsStage: this.state.subJobsStage - 1,
      currentSubJobDataPoint: ""
     });
  }

  revertToNewHeader() {
    this.setState({ 
      subJobsStage: 2,
      currentSubJobDataCollection: "",
      currentSubJobDataPoint: ""
     });
  }

  revertToNewSubJob() {
    this.setState({ 
      subJobsStage: 1,
      currentSubJobTitle: "",
      currentSubJobDataCollection: "",
      currentSubJobDataPoint: ""
    });
  }

  addNewSubJobSimple() {
    let newSubJobsState = this.state.subJobs.concat({
      title: this.state.currentSubJobTitle,
      data: []
    });
    this.setState({ subJobs: newSubJobsState }, () => {
      this.advanceSubJobStage();
    });
  }

  addNewDataCollectionSimple() {
    let newSubJobsState = this.state.subJobs;
    let majorIdx = newSubJobsState.length - 1;
    // console.log("adding new data collection, state before", newSubJobsState);
    newSubJobsState[majorIdx].data.push({
      title: this.state.currentSubJobDataCollection,
      list: []
    });
    // console.log("adding new data collection, state after", newSubJobsState);
    this.setState({ subJobs: newSubJobsState }, () => {
      this.advanceSubJobStage();
    });
  }

  addNewDataPointSimple() {
    let newSubJobsState = this.state.subJobs;
    let majorIdx = newSubJobsState.length - 1;
    let minorIdx = newSubJobsState[majorIdx].data.length - 1;
    newSubJobsState[majorIdx].data[minorIdx].list.push(this.state.currentSubJobDataPoint);
    this.setState({ subJobs: newSubJobsState }, () => {
      this.advanceSubJobStage();
    });
  }

  renderLeftArrow() {
    if (this.state.stageIdx > 0 && this.state.stageIdx <= 6) {
      return (
        <div className="addChallengeSimpleArrow" onClick={this.regressStage}>
          ←
        </div>
      )
    } else {
      return (
        <div className="arrowPlaceHolder"></div>
      )
    }
  }

  renderRightArrow() {
    if (this.state.stageIdx < this.state.stage.length - 1 && this.state.stageIdx <= 6) {
      return (
        <div className="addChallengeSimpleArrow" onClick={this.advanceStage}>
          →
        </div>
      )
    } else {
      return (
        <div className="arrowPlaceHolder"></div>
      )
    }
  }

  render() {
    if (this.state.spinner) {
      if (!this.state.challengeCreated) {
        return (
          <div className="spinnerContainerChallenge">
            <span className="spinnerChallengeText">Posting job</span>
            <div className="spinnerChallenge">
            </div>
          </div>
        )
      } else {
        return (
          <div className="spinnerContainerChallenge">
            <span className="spinnerChallengeText">Job posted successfully!</span>
          </div>
        )
      }
    } else {
      return (
        <div className="addChallengeSimpleContainer">

          <div className="addChallengeInputContainer">
            {this.renderCurrentStage()}
          </div>

          <div className="addChallengeSimpleArrows">
            {this.renderLeftArrow()}
            {this.renderRightArrow()}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(CreateChallengeSimple);