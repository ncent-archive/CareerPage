import React from "react";

class ReferralModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStage: "sendMail",
      referralLink: ""
    };
    //bindings
    this.renderModalContent = this.renderModalContent.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }
  //functions

  renderModalContent() {
    switch(this.state.modalStage) {
      case "sendMail":
        return (
          <div className="referralModal">
            <div className="referralModalInformation">
              Enter your email address, and we'll send you a login code.
            </div>
            <div className="referralModalInputBtnWrapper">
              <input className="referralModalInput" placeholder="Your Email Address" />
              <button className="referralModalSendBtn" onClick={this.sendMail}>Send Mail</button>
            </div>
          </div>
        );
      case "sendCode":
        return (
          <div className="referralModal">
            <div className="referralModalInformation">
              Email sent! <br />
              Please enter the code you received.
            </div>
            <div className="referralModalInputBtnWrapper">
              <input className="referralModalInput" placeholder="Your Code" />
              <button className="referralModalSendBtn" onClick={this.sendCode}>Send Code</button>
            </div>
          </div>
        );
      case "displayLink":
        return (
          <div className="referralModal">
            <span className="referralModalLink">Your Referral Link</span>
            <span className="referralModalLink">{this.state.referralLink}</span>
            <div className="referralModalInformation">Send this referral link to any good candidates you know!</div>
          </div>
        )
      default:
        return (
          <div className="referralModal">
            <span className="referralModalError">
              There was an error. Please try again.
            </span>
          </div>
        )
    }
  }

  sendMail() {
    //send mail api call
    this.setState({ modalStage: "sendCode" });
  }

  sendCode() {
    //send code api call
    this.setState({ modalStage: "displayLink" });
  }

  closeModal(e) {
    if (e.target === this.modalContainer) {
      this.props.closeModal(e);
    }
  }

  render() {
    return (
      <div className="referralModalContainer" onClick={this.closeModal} ref={el => this.modalContainer = el}>
        {this.renderModalContent()}
      </div>
    )
  }
}

export default ReferralModal;