import React from "react";
import twitterIcon from "../img/shareTwitter.png";
import nCentLogo from "../img/ncentLogo.png";
const apiUtil = require("./../util/apiUtil.js");

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      mouseHover: false,
      embedTransitioning: false,
      stage: "default"
    }

    //bindings
    this.generateTweetObj = this.generateTweetObj.bind(this);
    this.generateTweetURL = this.generateTweetURL.bind(this);
    this.generateTweetRequest = this.generateTweetRequest.bind(this);
    this.executeTweetWorkflow = this.executeTweetWorkflow.bind(this);
    this.tweetButtonColor = this.tweetButtonColor.bind(this);
    this.tweetButtonGray = this.tweetButtonGray.bind(this);
    this.imgError = this.imgError.bind(this);
    this.imgLoad = this.imgLoad.bind(this);
    this.generateEmbedHTML = this.generateEmbedHTML.bind(this);
    this.copyText = this.copyText.bind(this);
    this.displayEmbedMsg = this.displayEmbedMsg.bind(this);
    this.removeEmbedMsg = this.removeEmbedMsg.bind(this);
    this.scheduleRemoveEmbedMsg = this.scheduleRemoveEmbedMsg.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.redeemChallenge = this.redeemChallenge.bind(this);
    this.shareChallenge = this.shareChallenge.bind(this);
    this.renderChallengeAction = this.renderChallengeAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.copyReferralLink = this.copyReferralLink.bind(this);

  }
  //functions

  generateTweetObj() {
    return {
      original_referer: window.location.origin,
      text: `Follow me and join ${this.props.data.challengeSettings.name}! https://www.nCent.com/hunts/${this.props.data.cryptoKeyPair.publicKey}`,
      tw_p: "tweetbutton"
    };
  }

  generateTweetURL(hunt) {
    let str = "";
    let baseURL = "https://twitter.com/intent/tweet?";
    // str += baseURL;
    for (let param in hunt) {
      let newStr = `&${param}=${hunt[param]}`;
      str += newStr;
    }
    return baseURL + encodeURIComponent(str);
  }

  generateTweetRequest(url) {
    window.open(decodeURIComponent(url), "_blank");
  }

  executeTweetWorkflow() {
    let tweetObj = this.generateTweetObj();
    let tweetURL = this.generateTweetURL(tweetObj);
    this.generateTweetRequest(tweetURL);
  }

  tweetButtonColor(e) {
    e.target.classList.remove("tweetButtonGray");
    e.target.classList.add("tweetButtonColor");
  }

  tweetButtonGray(e) {
    e.target.classList.remove("tweetButtonColor");
    e.target.classList.add("tweetButtonGray");
  }

  imgError(e) {
    e.target.src = nCentLogo;
  }

  imgLoad(e) {
    console.log("hunt.jsx, image loaded");
    e.target.parentNode.classList.remove("huntImageLoading");
    e.target.parentNode.classList.add("huntImageLoaded");
    e.target.style.visibility = "unset";
  }

  copyText() {
    let textInput = document.createElement("input");
    let text = this.generateEmbedHTML();
    textInput.value = text;
    document.querySelector("body").appendChild(textInput);
    textInput.select();
    document.execCommand("copy");
    textInput.remove();
    this.displayEmbedMsg();
  }

  generateEmbedHTML() {
    //dummy return string, need hosting for absolute path
    return `
      <script src="./../../dist/widgetEmbed.js"></script>
      <div className="nCentEmbedBtn" data-id="${this.props.data.cryptoKeyPair.publicKey}">
        Join me to ${this.props.data.challengeSettings.name}!
      </div>
    `;
  }

  displayEmbedMsg() {
    this.embedMsg.style.zIndex = "2";
    this.embedMsg.style.opacity = "1.0";
    this.scheduleRemoveEmbedMsg();
  }

  scheduleRemoveEmbedMsg() {
    setTimeout(this.removeEmbedMsg, 2000);
  }

  removeEmbedMsg() {
    if (this.state.mouseHover) {
      this.scheduleRemoveEmbedMsg();
    } else {
      this.embedMsg.style.opacity = "0.0";
      this.setState({ embedTransitioning: true });
      let timeout = setTimeout(() => {
        this.embedMsg.style.zIndex = "-1";
        this.setState({ embedTransitioning: false });
      }, 1500);
      this.setState({ timeout: timeout });
    }
  }

  mouseEnter() {
    this.setState({ mouseHover: true });
    if (this.state.embedTransitioning) {
      clearTimeout(this.state.timeout);
      this.displayEmbedMsg();
    }
  }

  mouseLeave() {
    this.setState({ mouseHover: false });
  }

  renderChallengeAction() {
    if (this.state.stage === "sharing") {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModalLoading">
            <div className="referralModalLoadingInformation">
              Generating link
            </div>
            <div className="spinnerCode"></div>
          </div>
        </div>
      )
    } else if (this.state.stage === "shared") {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModal">
            <span className="referralModalLink">Your Referral Link</span>
            <span className="referralModalLinkAnchor">{this.state.referralLink}</span>
            <button className="copyReferralLink" onClick={this.copyReferralLink}>Copy</button>
            <div className="referralModalInformation">Send this referral link to any good candidates you know!</div>
          </div>
        </div>
      )
    } else if (this.state.stage === "redeemListLoading") {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModalLoading">
            <div className="referralModalLoadingInformation">
              Fetching list of users
            </div>
            <div className="spinnerCode"></div>
          </div>
        </div>
      )
    } else if (this.state.stage === "redeemListLoaded") {

    } else if (this.state.stage === "redeeming") {

    } else if (this.state.stage === "redeemed") {

    } else {
      return (
        <div></div>
      )
    }
  }

  closeModal(e) {
    if (e.target === this.modal) {
      this.setState({ stage: "default" });
    }
  }

  copyReferralLink() {
    let textInput = document.createElement("input");
    let text = this.generateEmbedHTML();
    textInput.value = this.state.referralLink;
    document.querySelector("body").appendChild(textInput);
    textInput.select();
    document.execCommand("copy");
    textInput.remove();
  }

  async redeemChallenge() {
    //completeChallenge for now
    //first findAllBalancesForChallenge for challenge to get list, then choose among list => completeChallenge
    this.setState({ stage: "redeemListLoading" });

    let allBalancesRes = await apiUtil.findAllBalancesForChallenge(this.props.data.id);
    console.log("\nredeeming challenge in ChallengeDetails.jsx, response", allBalancesRes);

    let challengeId = this.props.data.completionCriteria.id;
    let completerPublicKey = this.props.data.completionCriteria.address;
    // await apiUtil.completeChallenge(challengeId, completerPublicKey);
  }

  async shareChallenge() {
    this.setState({ stage: "sharing" });
    let referralRes = await apiUtil.createReferralCode(this.props.data.id);
    let referralCode = referralRes.data.challengeParticipant.referralCode;
    this.setState({ referralLink: `${window.location.origin}/detail?jobId=${this.props.data.id}&referralCode=${referralCode}` }, () => {
      this.setState({ stage: "shared" });
    });
  }

  closeChallengeAction() {
    this.setState({ stage: "default" });
  }

  render() {
    return (
      <div className="huntContainer" data-clicktarget="Hunt Details">
        {this.renderChallengeAction()}
        <div className="switchToCollection" onClick={this.props.switchToCollection}>
          X
        </div>
        <div className="huntImageLoading">
          <img src={this.props.data.challengeSettings.imageUrl} className="huntImage"
            onError={this.imgError} onLoad={this.imgLoad} />
        </div>
        <div className="huntName">
          {this.props.data.challengeSettings.name}
        </div>
        <div className="huntDescription">
          {this.props.data.challengeSettings.description}
        </div>
        <div className="huntSponsorName">
          Sponsored by {this.props.data.challengeSettings.sponsorName}
        </div>
        {/* <div className="huntExpiration huntText">
          <b>Expiration Date:</b> <i>{this.props.data.challengeSettings.expiration.split("T")[0]}</i>
        </div> */}
        <div className="huntAdmin huntText">
          <b>Challenge Administrator:</b> <i>{this.props.data.challengeSettings.admin}</i>
        </div>
        <div className="huntOffChain huntText">
          <b>{this.props.data.challengeSettings.offChain === "true" ? "Off Chain" : "On Chain"}</b>
        </div>
        <div className="huntMaxShares huntText">
          <b>Max Shares:</b> <i>{this.props.data.challengeSettings.maxShares === "null" ? "Unlimited" : this.props.data.challengeSettings.maxShares}</i>
        </div>
        <div className="huntMaxRewards huntText">
          <b>Max Rewards:</b> <i>{this.props.data.challengeSettings.maxRewards}</i>
        </div>
        <div className="huntMaxDistributionFeeReward huntText">
          <b>Max Distribution Fee Reward:</b> <i>{this.props.data.challengeSettings.maxDistributionFeeReward}</i>
        </div>
        <div className="huntMaxSharesPerReceivedShare huntText">
          <b>Max Shares Per Received Share:</b> <i>{this.props.data.challengeSettings.maxSharesPerReceivedShare}</i>
        </div>
        <div className="huntMaxDepth huntText">
          <b>Max Depth:</b> <i>{this.props.data.challengeSettings.maxDepth === "null" ? "Unlimited" : this.props.data.challengeSettings.maxDepth}</i>
        </div>
        <div className="huntMaxNodes huntText">
          <b>Max Nodes:</b> <i>{this.props.data.challengeSettings.maxNodes === "null" ? "Unlimited" : this.props.data.challengeSettings.maxNodes}</i>
        </div>
        <div className="huntShareExpiration huntText">
          <b>Share Expiration:</b> <i>{this.props.data.challengeSettings.shareExpiration.split("T")[0]}</i>
        </div>
        <div className="challengeActions">
          <button onClick={this.redeemChallenge} className="challengeAction">Redeem</button>
          <button onClick={this.shareChallenge} className="challengeAction">Share</button>
        </div>
        <div className="huntShareRow">

          <div className="huntShareRowTextButtonContainer">
            <span className="huntShareRowText">
              Share:
            </span>

            <div className="huntShareRowButtons">
              <div className="huntShareRowButton">
                <img className="tweetButtonGray" onClick={this.executeTweetWorkflow}
                  src={twitterIcon} onMouseEnter={this.tweetButtonColor}
                  onMouseLeave={this.tweetButtonGray}
                />
              </div>

              <div className="huntShareRowButton">
                <img className="tweetButtonGray" onClick={this.executeTweetWorkflow}
                  src={twitterIcon} onMouseEnter={this.tweetButtonColor}
                  onMouseLeave={this.tweetButtonGray}
                />
              </div>

              <div className="huntShareRowButton">
                <img className="tweetButtonGray" onClick={this.executeTweetWorkflow}
                  src={twitterIcon} onMouseEnter={this.tweetButtonColor}
                  onMouseLeave={this.tweetButtonGray}
                />
              </div>

              <div className="huntShareRowButton">
                <img className="tweetButtonGray" onClick={this.executeTweetWorkflow}
                  src={twitterIcon} onMouseEnter={this.tweetButtonColor}
                  onMouseLeave={this.tweetButtonGray}
                />
              </div>

            </div>
          </div>
          <div className="huntEmbed" title="Embed a subscription button to this hunt on any page."
            onClick={this.copyText}
          >
            {this.state.copied ? "Copied!" : "Embed"}
          </div>

        </div>

        <div className="huntEmbedded" ref={el => { this.embedMsg = el }}
          onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
        >
          <span className="huntEmbeddedText">
            The code has been copied to your clipboard. Paste this code directly into your HTML.
          </span>
        </div>

      </div>
    )
  }
}

export default ChallengeDetails;