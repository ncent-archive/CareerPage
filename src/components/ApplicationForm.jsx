import React from "react";
import store from "./../store/initializeStore.js";
import { sendApplication } from "./../actions/jobApplicationActions.js";

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStage: "Submit"
    }
    //bindings
    this.submitApplication = this.submitApplication.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.delay = this.delay.bind(this);

  }
  //functions

  async componentDidUpdate(prevProps, prevState) {
    console.log("UPDATES HAPPENED: ", this);
    if (!prevProps.status && this.props.status && !this.props.invalidApplication) {
      //for simulation of real load time
      await this.delay();

      this.setState({ currentStage: "Submitted" });
    }
    if(this.state.currentStage === "Submitting" && this.props.invalidApplication) {
      this.setState({ currentStage: "SubmitWithError" });
    }
  }

  delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3500);
    })
  }

  submitApplication() {
    let obj = {
      ...this.state,
      referralCode: this.props.referralCode || null,
      title: `${this.props.position} - ${this.props.subPosition}`
    }
    console.log("ApplicationForm.jsx, submitting application, dispatching", obj);
    this.setState({ currentStage: "Submitting" });
    store.dispatch(sendApplication(obj));
  }

  handleFormChange(e) {
    let obj = {};
    obj[e.target.dataset.inputName] = e.target.value;
    this.setState(obj);
  }

  render() {
    if (this.state.currentStage === "Submit") {

      return (
        <div id="applicationForm" className="applicationFormContainer">
          <div className="applicationFormHeaderRow">
            <div className="applicationFormHeaderRowHeader">
              Apply for this job
            </div>
            <div className="applicationFormHeaderRowRequired">
              <span className="asteriskSmall">*</span> Required
            </div>
          </div>
  
          <div className="applicationFormPersonalContainer">
  
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                First Name <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="firstName" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Last Name <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="lastName" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Email <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="email" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Phone
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="phone" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Resume URL <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="resumeURL" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Cover Letter URL
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="coverLetterURL" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
          </div>
  
          <hr className="applicationFormDivider" />
  
          <div className="applicationFormLinksContainer">
  
            <div className="applicationFormLinkContainer">
              <div className="applicationFormLinkText">
                Github URL
              </div>
              <input className="applicationFormLinkInput" 
                data-input-name="githubURL" onChange={this.handleFormChange}
              />
            </div>
  
            <div className="applicationFormLinkContainer">
              <div className="applicationFormLinkText">
                LinkedIn URL
              </div>
              <input className="applicationFormLinkInput" 
                data-input-name="linkedinURL" onChange={this.handleFormChange}
              />
            </div>
  
          </div>
  
          <button className="submitButton" onClick={this.submitApplication}>Submit Application</button>
  
        </div>
      )
    } else if (this.state.currentStage === "SubmitWithError") {

      return (
        <div id="applicationForm" className="applicationFormContainer">
          <div className="applicationFormHeaderRow">
            <div className="asterisk">You must include all required fields.</div>
            <div className="applicationFormHeaderRowHeader">
              Apply for this job
            </div>
            <div className="applicationFormHeaderRowRequired">
              <span className="asteriskSmall">*</span> Required
            </div>
          </div>
  
          <div className="applicationFormPersonalContainer">
  
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                First Name <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="firstName" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Last Name <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="lastName" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Email <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="email" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Phone
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="phone" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Resume URL <span className="asterisk">*</span>
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="resumeURL" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
            <div className="applicationFormInputRow">
              <div className="applicationFormInputRowText">
                Cover Letter URL
              </div>
              <div className="applicationFormInputRowInput">
                <input className="applicationFormInputRowInputEl" 
                  data-input-name="coverLetterURL" onChange={this.handleFormChange}
                />
              </div>
            </div>
  
          </div>
  
          <hr className="applicationFormDivider" />
  
          <div className="applicationFormLinksContainer">
  
            <div className="applicationFormLinkContainer">
              <div className="applicationFormLinkText">
                Github URL
              </div>
              <input className="applicationFormLinkInput" 
                data-input-name="githubURL" onChange={this.handleFormChange}
              />
            </div>
  
            <div className="applicationFormLinkContainer">
              <div className="applicationFormLinkText">
                LinkedIn URL
              </div>
              <input className="applicationFormLinkInput" 
                data-input-name="linkedinURL" onChange={this.handleFormChange}
              />
            </div>
  
          </div>
  
          <button className="submitButton" onClick={this.submitApplication}>Submit Application</button>
  
        </div>
      )
    }
     else if (this.state.currentStage === "Submitting") {
      return (
        <div className="applicationFormContainer">
          <div className="applicationFormSpinnerContainer">
            <span className="applicationFormLoadingText">Sending application...</span>
            <div className="applicationFormSpinner"></div>
          </div>
        </div>
      )
    } else if (this.state.currentStage === "Submitted") {
      return (
        <div className="applicationFormContainer">
          <div className="applicationFormSuccess">
            <div className="applicationFormSuccessText">Application sent!</div>
            <div className="applicationFormSuccessText">Thank you!</div>
          </div>
        </div>
      )
    } else {
      console.log("ApplicationForm: Entering error case: ", this.state, this.props);
      return (
        <div className="applicationFormContainer">
          There was an error.
        </div>
      )
    }

  }
}

export default ApplicationForm;

//firstName, lastname. email, phone, resumeURL, coverletterURL
//position(radio, include 'other' option), 
//github, linkedin,  - hidden referenceCode field