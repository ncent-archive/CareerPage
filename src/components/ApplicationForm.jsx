import React from "react";

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bindings

  }
  //functions

  render() {
    return (
      <div className="applicationFormContainer">
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
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              Last Name <span className="asterisk">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              Email <span className="asterisk">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              Phone <span className="asterisk">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              Resume URL <span className="asterisk">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              Cover Letter URL <span className="asterisk">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

        </div>

        <hr className="applicationFormDivider" />

        <div className="applicationFormLinksContainer">

          <div className="applicationFormLinkContainer">
            <div className="applicationFormLinkText">
              Github URL
            </div>
            <input className="applicationFormLinkInput" />
          </div>

          <div className="applicationFormLinkContainer">
            <div className="applicationFormLinkText">
              LinkedIn URL
            </div>
            <input className="applicationFormLinkInput" />
          </div>

        </div>

        <button className="submitButton">Submit Application</button>

      </div>
    )
  }
}

export default ApplicationForm;

//firstName, lastname. email, phone, resumeURL, coverletterURL
//position(radio, include 'other' option), 
//github, linkedin,  - hidden referenceCode field