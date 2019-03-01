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

        <div className="applicationFormPersonalContainer">

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              First Name <span className="redText">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>

          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              First Name <span className="redText">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>
          
          <div className="applicationFormInputRow">
            <div className="applicationFormInputRowText">
              First Name <span className="redText">*</span>
            </div>
            <div className="applicationFormInputRowInput">
              <input className="applicationFormInputRowInputEl" />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default ApplicationForm;

//firstName, lastname. email, phone, resumeURL, coverletterURL
//position(radio, include 'other' option), 
//github, linkedin,  - hidden referenceCode field