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
      expiration: "",
      shareExpiration: "",
      admin: "",
      offChain: "",
      location: "",
      shareText: "",
      totalReward: "",
      maxShares: "",
      maxRewards: "",
      maxDistributionFeeReward: "",
      maxSharesPerReceivedShare: "",
      maxDepth: "",
      maxNodes: "",
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
      stageIdx: 0
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
                  "shareText": this.state.shareText,
                  "totalUsdReward": this.state.totalReward || "1000.00"
                },
                "subJobs": this.state.subJobs
              }
            }
          ],
          "name": this.state.name,
          "offChain": true,
          "shareExpiration": this.state.shareExpiration || "2020-02-02T00:35:01.441Z",
          "sponsorName": this.state.sponsorName
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
            <input className="addHuntFormInput" type="text" placeholder="nCent Labs" id="sponsorName"
              onChange={this.inputChange} value={this.state.sponsorName}
            />
            <br />
          </div>
        );
      case "name":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">What general position are you hiring for?</span>
            <input className="addHuntFormInput" type="text" placeholder="Senior Software Engineer" id="name"
              onChange={this.inputChange} value={this.state.name}
            />
            <br />
          </div>
        );
      case "location":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Where is this position geographically?</span>
            <input className="addHuntFormInput" type="text" placeholder="Redwood City, CA" id="location"
              onChange={this.inputChange} value={this.state.location}
            />
            <br />
          </div>
        );
      case "description":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Please provide a general description for this position.</span>
            <textarea className="addHuntFormInput addHuntDescription" type="text" placeholder="Job Description" id="description"
              onChange={this.inputChange} value={this.state.description}
            />
            <br />
          </div>
        );
      case "imageUrl":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">Give us a link to your company logo so we can add it to the posting</span>
            <input className="addHuntFormInput" type="text" placeholder="Image URL (nCent logo if empty)" id="imageUrl"
              onChange={this.inputChange} value={this.state.imageUrl}
            />
            <br />
          </div>
        );
      case "subJobs":
        return (
          <div className="addChallengeFormContainer">
            <button className="addSubJobButton" onClick={this.addSubJob}>Add Sub-Job</button>

            <div className="addSubJobsContainer" ref={el => this.subJobsContainer = el}>
              {/* Content created by addSubJob */}
            </div>
          </div>
        );
      case "final":
        return (
          <div className="addChallengeFormContainer">
            <span className="addChallengeFormFieldName">
              That's everything!
              <br />
              Submit whenever you are ready.
            </span>
            <button className="addHuntButton" onClick={this.addHunt}>Create Job Posting</button>
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

  renderLeftArrow() {
    if (this.state.stageIdx > 0) {
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
    if (this.state.stageIdx < this.state.stage.length - 1) {
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