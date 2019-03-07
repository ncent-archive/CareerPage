import React from "react";
const apiUtil = require("./../util/apiUtil.js");

class CreateChallenge extends React.Component {
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
      subJobs: []
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
                "subJobs": [this.state.subJobs]
              }
            }
          ],
          "name": this.state.name,
          "offChain": false,
          "shareExpiration": this.state.shareExpiration || "2020-02-02T00:35:01.441Z",
          "sponsorName": this.state.sponsorName
        },
        // "completionCriteria": {
        //   "address": "[B@28e7acf0",
        //   "prereq": [],
        //   "reward": {
        //     "type": {
        //       "audience": "PROVIDENCE",
        //       "type": "EVEN"
        //     }
        //   }
        // },
        // "distributionFeeReward": {
        //   "type": {
        //     "audience": "PROVIDENCE",
        //     "type": "SINGLE"
        //   }
        // },
        "subChallenges": []
      }
    }
    console.log("\nchallenge about to be dispatched from CreateChallenge.jsx", obj);
    let response = await apiUtil.createChallenge(obj);
    console.log("\nin CreateChallenge.jsx, createChallenge api call just returned", response.data);
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

    // newSubJob.innerHTML = `
    //     <span class="addSubJob">Sub-Job Title</span>
    //     <input class="addSubJobInput" type="text" placeholder="Name for sub-job" 
    //       onchange="subJobTitleChange()" 
    //     />
    //     <button class="addDataCollectionButton" onclick="addDataCollection()">Add Data Collection</button>
    // `;
    let newSubJobsState = this.state.subJobs.concat({
      title: "",
      data: []
    });
    this.setState({ subJobs: newSubJobsState });
    console.log("\naddSubJob in CreateChallenge.jsx, newSubJob before adding is", newSubJob);
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

    // let newDataCollection = (
    //   <div className="addSubJobDataCollectionContainer" data-num={idx}>
    //     <span className="addSubJobDataCollectionTitle">Data Collection Title</span>
    //     <input className="addSubJobDataCollectionInput" onChange={this.subJobDataCollectionTitleChange} />
    //     <button className="addSubJobDataPointButton" onClick={this.addDataPoint}>Add Data Point</button>
    //   </div>
    // )
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

    // let newDataPoint = (
    //   <div className="addSubJobDataPointContainer" data-num={idx}>
    //     • <input className="addSubJobDataPointInput" onChange={this.subJobDataPointChange} />
    //   </div>
    // )
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

  render() {
    return (
      <div className="addHuntContainer">

        <div className="addHuntHeader">
          Sponsor a New Challenge
        </div>

        <div className="addHuntFormsContainer">

          <div className="addHuntFormHeader">Challenge Metadata</div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Position</span>
            <input className="addHuntFormInput" type="text" placeholder="General name for position" id="name"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Description</span>
            <textarea className="addHuntFormInput addHuntDescription" type="text" placeholder="Job Description" id="description"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Image Url</span>
            <input className="addHuntFormInput" type="text" placeholder="Icon for job posting" id="imageUrl"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Name of Sponsor</span>
            <input className="addHuntFormInput" type="text" placeholder="Company hiring" id="sponsorName"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Challenge Expiration Date</span>
            <input className="addHuntFormInput" type="text" placeholder="2020-07-25T12:36:40.623-08:00 (nullable)" id="expiration"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Challenge Share Expiration Date</span>
            <input className="addHuntFormInput" type="text" placeholder="2020-01-25T12:36:40.623-08:00 (nullable)" id="shareExpiration"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Challenge Administrator</span>
            <input className="addHuntFormInput" type="text" placeholder="1 (nullable for now)" id="admin"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Hold Challenge Off Chain?</span>
            <input className="addHuntFormInput" type="text" placeholder="false (nullable for now)" id="offChain"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Location</span>
            <input className="addHuntFormInput" type="text" placeholder="Location of job" id="location"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Share Message</span>
            <input className="addHuntFormInput" type="text" placeholder="Custom message on sharing" id="shareText"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Shares</span>
            <input className="addHuntFormInput" type="text" placeholder="100 (nullable for now)" id="maxShares"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Total Reward (USD)</span>
            <input className="addHuntFormInput" type="text" placeholder="Total reward for entire chain (nullable for now)" id="totalReward"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Reward</span>
            <input className="addHuntFormInput" type="text" placeholder="null" id="maxRewards"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Distribution Fee Reward</span>
            <input className="addHuntFormInput" type="text" placeholder="null" id="maxDistributionFeeReward"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Shares Per Received Share</span>
            <input className="addHuntFormInput" type="text" placeholder="null" id="maxSharesPerReceivedShare"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Depth</span>
            <input className="addHuntFormInput" type="text" placeholder="null" id="maxDepth"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <div className="addHuntFormContainer">
            <span className="addHuntFormFieldName">Maximum Nodes</span>
            <input className="addHuntFormInput" type="text" placeholder="null" id="maxNodes"
              onChange={this.inputChange}
            />
            <br />
          </div>

          <button className="addSubJobButton" onClick={this.addSubJob}>Add Sub-Job</button>

          <div className="addSubJobsContainer" ref={el => this.subJobsContainer = el}>
            {/* Content created by addSubJob */}
          </div>

          <button className="addHuntButton" onClick={this.addHunt}>Sponsor Challenge</button>

        </div>
      </div>
    )
  }
}

export default CreateChallenge;