import React from "react";
import twitterIcon from "../img/shareTwitter.png";
import nCentLogo from "../img/ncentLogo.png";

class Hunt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      mouseHover: false,
      embedTransitioning: false
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
    this.switchToDetails = this.switchToDetails.bind(this);

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
    console.log("Challenge.jsx, image loaded");
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

  switchToDetails(e) {
    // console.log("switchDetails in challenge.jsx", e.target.dataset.clicktarget, e.target.dataset, e.target);
    // this.props.switchTabs(e, this.props.data);
    this.props.switchToDetails(this.props.idx);
  }

  render() {
    return (
      <div className="huntContainerDashboard" onClick={this.switchToDetails} data-clicktarget="Hunt Details">
        <div className="huntImageLoading">
          <img src={this.props.data.challengeSettings.imageUrl} className="huntImage" 
          onError={this.imgError} onLoad={this.imgLoad} />
        </div>
        <div className="huntDashboardDetails">

          <div className="huntDashboardNameAndReward">
            <div className="huntName">
              {this.props.data.challengeSettings.name}
            </div>
            <div className="huntMaxRewards" title="Max Reward">
              <b>${this.props.data.challengeSettings.maxRewards}</b>
            </div>
          </div>
          
          <div className="huntDashboardExpiryAndSponsor">
            <div className="huntExpiration" title="Expiration Date">
              <i>Expires {this.props.data.challengeSettings.expiration.split("T")[0]}</i>
            </div>
            <div className="huntSponsorName">
              Sponsored by {this.props.data.challengeSettings.sponsorName}
            </div>
          </div>
          
        </div>

      </div>
    )
  }
}

export default Hunt;