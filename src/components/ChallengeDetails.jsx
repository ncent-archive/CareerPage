import React from "react";
import twitterIcon from "../img/shareTwitter.png";
import nCentLogo from "../img/ncentLogo.png";
const apiUtil = require("./../util/apiUtil.js");

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseHover: false,
      embedTransitioning: false,
      stage: "default",
      selectedEmail: null,
      generatingTweet: false,
      emails: null
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
    this.completeChallengeRedemption = this.completeChallengeRedemption.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.tweetSpinner = this.tweetSpinner.bind(this);

  }
  //functions

  generateTweetObj() {
    console.log("in generateTweetObj", this.state.referralLink)
    let encodedReferralLink = this.state.referralLink.replace("&referralCode", "%26referralCode");
    return {
      original_referer: window.location.origin,
      text: `Follow me and sign up for ${this.props.data.challengeSettings.name}!`,
      tw_p: "tweetbutton",
      url: encodedReferralLink,
      hashtags: "nCent, blockchain"
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
    console.log("\n\ngeneratingTweetRequest in ChallengeDetails", url)
    window.open(decodeURIComponent(url), "_blank");
    this.setState({ generatingTweet: false });
  }

  async executeTweetWorkflow() {
    this.setState({ generatingTweet: true });

    if (!this.state.referralLink) {
      console.log("\n\nChallengeDetails, getting referral link for tweet");
      let referralRes = await apiUtil.createReferralCode(this.props.data.id);
      let referralCode = referralRes.data.challengeParticipant.referralCode;
      console.log("referralCode just returned to tweet generation", referralCode);
      this.setState({ referralLink: `${window.location.origin}/detail?jobId=${this.props.data.id}&referralCode=${referralCode}` }, () => {
        let tweetObj = this.generateTweetObj();
        let tweetURL = this.generateTweetURL(tweetObj);
        this.generateTweetRequest(tweetURL);
      });
    } else {
      let tweetObj = this.generateTweetObj();
      let tweetURL = this.generateTweetURL(tweetObj);
      this.generateTweetRequest(tweetURL);
    }
  }

  tweetSpinner() {
    if (this.state.generatingTweet) {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModalLoading">
            <div className="referralModalLoadingInformation">
              Generating Tweet
            </div>
            <div className="spinnerCode"></div>
          </div>
        </div>
      )
    } else {
      return;
    }
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
      if (this.state.emails) {
        return (
          <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
            <div className="referralModal">
              <div className="redeemListContainer">
                <div className="redeemListItems" ref={el => this.redeemList = el}>
                  {Object.keys(this.state.emails).map((el, i) => {
                    return (
                      <div className="redeemListItem" onClick={this.selectEmail} key={i} data-num={i}>
                        {el}
                      </div>
                    )
                  })}
                </div>
                <button className="activateRedeem" 
                  onClick={this.completeChallengeRedemption}
                >
                  Redeem Challenge
                </button>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
            <div className="referralModal">
              <div className="referralModalInformation">
                There are no users associated with this challenge!
                <br />
                <br />
                <br />
                <br />
                Please share this challenge.
              </div>
            </div>
          </div>
        )
      }
    } else if (this.state.stage === "redeeming") {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModalLoading">
            <div className="referralModalLoadingInformation">
              Redeeming Challenge
            </div>
            <div className="spinnerCode"></div>
          </div>
        </div>
      )
    } else if (this.state.stage === "redeemed") {
      return (
        <div className="referralModalContainer" ref={el => this.modal = el} onClick={this.closeModal}>
          <div className="referralModal">
            <div className="referralModalInformation">
              The challenge has been redeemed successfully!
            </div>
          </div>
        </div>
      )
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
    console.log("\nredeeming challenge, findingAllBalances in ChallengeDetails.jsx, response", allBalancesRes);

    let user = await apiUtil.findOneUser(this.props.data.challengeSettings.admin);
    console.log("\nfinding sponsor of challenge in ChallengeDetails.jsx, response", user);

    let emailsCollection = allBalancesRes.data.emailToChallengeBalances;
    //removing sponsor from collection
    console.log("emailCollection before delete", emailsCollection);
    delete emailsCollection[user.data.userMetadata.email];
    console.log("emailCollection after delete", emailsCollection);
    this.setState({ emails: emailsCollection });

    this.setState({ stage: "redeemListLoaded" });

  }

  async completeChallengeRedemption() {
    if (this.state.selectedEmail === null) {
      //error message
    } else {
      let challengeId = this.props.data.completionCriteria.id;
      let completerEmail = this.state.selectedEmail;
      console.log("\nabout to call completeChallenge from ChallengeDetails.jsx", challengeId, completerEmail);
      let completionRes = await apiUtil.completeChallenge(challengeId, completerEmail);
      console.log("\nChallengeDetails.jsx, challengeRedemption returned", completionRes.data);
      this.setState({ stage: "redeemed" });
    }
  }

  selectEmail(e) {
    this.setState({ selectedEmail: e.target.innerText });
    let idx = e.target.dataset.num;
    Array.from(this.redeemList.children).forEach((el, i) => {
      if (i === Number(idx)) {
        el.classList.add("redeemListItemSelected");
        el.style.fontWeight = "bolder";
      } else {
        el.classList.remove("redeemListItemSelected");
        el.style.fontWeight = "unset";
      }
    })
  }

  async shareChallenge() {
    this.setState({ stage: "sharing" });
    if (!this.state.referralLink) {
      let referralRes = await apiUtil.createReferralCode(this.props.data.id);
      let referralCode = referralRes.data.challengeParticipant.referralCode;
      this.setState({ referralLink: `${window.location.origin}/detail?jobId=${this.props.data.id}&referralCode=${referralCode}` }, () => {
        this.setState({ stage: "shared" });
      });
    } else {
      this.setState({ stage: "shared" });
    }
  }

  closeChallengeAction() {
    this.setState({ stage: "default" });
  }

  render() {
    if (this.props.data.challengeSettings.metadatas[0].value.challengeType === "jobSimplified") {
      return (
        <div className="huntContainerSimple" data-clicktarget="Hunt Details">
          {this.renderChallengeAction()}
          {this.tweetSpinner()}
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
          <div className="huntSponsorNameSimple">
            Sponsored by {this.props.data.challengeSettings.sponsorName}
          </div>
          <div className="challengeActionsSimple">
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

          </div>

        </div>
      )
    } else {
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
  
          </div>
  
        </div>
      )
    }
  }
}

export default ChallengeDetails;