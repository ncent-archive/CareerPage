import React from "react";

class ReferralModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStage: "sendMail",
      referralLink: "",
      email: "",
      code: "",
      referralNum: null
    };
    //bindings
    this.renderModalContent = this.renderModalContent.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.generateReferralLink = this.generateReferralLink.bind(this);
    this.delay = this.delay.bind(this);
    this.emailKey = this.emailKey.bind(this);
    this.codeKey = this.codeKey.bind(this);
    this.copyReferralLink = this.copyReferralLink.bind(this);

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
              <input className="referralModalInput" placeholder="Your Email Address" 
                onKeyDown={this.emailKey} ref={el => this.emailInput = el} onChange={this.changeEmail}
              />
              <button className="referralModalSendBtn" onClick={this.sendMail}>
                Send Mail
              </button>
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
              <input className="referralModalInput" placeholder="Your Code" 
                onKeyDown={this.codeKey} ref={el => this.codeInput = el} onChange={this.changeCode}
              />
              <button className="referralModalSendBtn" onClick={this.sendCode}>
                Send Code
              </button>
            </div>
          </div>
        );
      case "evaluatingCode":
        return (
          <div className="referralModalLoading">
            <div className="referralModalLoadingInformation">
              Evaluating Code
            </div>
            <div className="spinnerCode"></div>
          </div>
        );
      case "displayLink":
        return (
          <div className="referralModal">
            <span className="referralModalLink">Your Referral Link</span>
            <span className="referralModalLinkAnchor">{this.state.referralLink}</span>
            <button className="copyReferralLink" onClick={this.copyReferralLink}>Copy</button>
            <div className="referralModalInformation">Send this referral link to any good candidates you know!</div>
          </div>
        );
      default:
        return (
          <div className="referralModal">
            <span className="referralModalError">
              There was an error. Please try again.
            </span>
          </div>
        );
    }
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changeCode(e) {
    this.setState({ code: e.target.value });
  }

  emailKey(e) {
    if (e.key === "Enter") this.sendMail();
  }

  codeKey(e) {
    if (e.key === "Enter") this.sendCode();
  }

  sendMail() {
    //send mail api call
    //apiCall(this.state.email)
    this.setState({ modalStage: "sendCode" });
    this.emailInput.value = "";
  }

  async sendCode() {
    this.setState({ modalStage: "evaluatingCode" });

    //send code api call
    //await apiCall(this.state.code);
    //let referralNum = await apiCall(this.props.jobId);
    let referralNum = 347237434;

    await this.delay();

    this.setState({ referralNum: referralNum }, function() {
      this.setState({ referralLink: this.generateReferralLink() }, function() {
        this.setState({ modalStage: "displayLink" })
      })
    })
  }

  generateReferralLink() {
    return `${window.location.origin}/detail?jobId=${this.props.jobId}&referralCode=${this.state.referralNum}`;
  }

  copyReferralLink(e) {
    let newInput = document.createElement("input");
    newInput.value = this.state.referralLink;
    document.querySelector("body").appendChild(newInput);
    newInput.select();
    document.execCommand("copy");
    newInput.remove();
    e.target.innerText = "Copied!";
  }

  closeModal(e) {
    if (e.target === this.modalContainer) {
      this.props.closeModal(e);
    }
  }

  delay() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    })
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