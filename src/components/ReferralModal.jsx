import React from "react";
import {
    createUser,
    sendOTP,
    loginUser,
    verifyingSession,
    emailUserRefferalLink
} from "./../actions/userActions.js";
import store from "./../store/initializeStore.js";
import {BitlyClient} from 'bitly';

const bitly = new BitlyClient(process.env.BITLY, {});

const apiUtil = require("./../util/apiUtil.js");

class ReferralModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStage: "loading",
            referralLink: "",
            email: "",
            code: "",
            loaded: true
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
        this.emailUser = this.emailUser.bind(this);
        this.codeKey = this.codeKey.bind(this);
        this.copyReferralLink = this.copyReferralLink.bind(this);
        this.generateShare = this.generateShare.bind(this);
        this.createShortUrl = this.createShortUrl.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.componentRedemptionCodeUpdate = this.componentRedemptionCodeUpdate.bind(this);
        this.loading = this.loading.bind(this)
    }

    //functions

    async componentWillMount() {
        console.log("IN componentWillMount");
        if (this.props.user.sessionStatus && this.props.user.sessionStatus.user) {
            let referralRes = await apiUtil.createReferralCode(this.props.jobId);

            let referralCode = referralRes.data.challengeParticipant.referralCode;
            this.setState({referralCode}, async function () {
                const shortLink = await this.generateReferralLink();
                this.setState({referralLink: shortLink, loaded: true}, function () {
                    this.setState({modalStage: "displayLink"})
                }.bind(this))
            }.bind(this))
        } else {
            this.setState({modalStage: "sendMail"});
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log("IN componentDidUpdate");
        if(!prevProps) {
            return;
        }
        const prevSessionStatus = prevProps.user.sessionStatus;
        const currentSessionStatus = this.props.user.sessionStatus;
        console.log(this.props);
        console.log(this.state);
        if(prevSessionStatus && prevSessionStatus.user &&
            (prevSessionStatus.user.apiId !== currentSessionStatus.user.apiId)) {
            await this.componentRedemptionCodeUpdate()
        } else if(!prevSessionStatus && currentSessionStatus && currentSessionStatus.user.apiId) {
            await this.componentRedemptionCodeUpdate()
        } else if(!currentSessionStatus && this.props.user.userData.apiId) {
            store.dispatch(verifyingSession());
        } else if(this.props.user.userData.invalid === true) {
            // invalid user
            this.setState({modalStage: "sendMail"});
        }
    }

    async componentRedemptionCodeUpdate() {
        let referralRes = await apiUtil.createReferralCode(this.props.jobId);

        if (referralRes.status === 201) {
            this.generateShare();
        }

        //send above when a query param is in URL
        //otherwise send where baseUser is sponsor, needs embedded call

        let referralCode = referralRes.data.challengeParticipant.referralCode;
        this.setState({referralCode}, async function () {
            const shortLink = await this.generateReferralLink();
            if(referralRes.status === 201) {
                this.emailUser(shortLink);
            }
            this.setState({referralLink: shortLink, loaded: true}, function () {
                this.setState({modalStage: "displayLink"})
            }.bind(this))
        }.bind(this))
    }

    async createShortUrl(url) {
        try {
            let result = await bitly.shorten(url);
            console.log("short url: " + result.url);
            return result.url;
        } catch (e) {
            console.log(e);
            return url;
        }
    }

    async generateShare() {
        // console.log("generateShare")
        let sponsor = await apiUtil.findOneUser(this.props.challenge.challengeSettings.admin).data;
        if (this.props.referralCode) {
            let shareChallengeRes = await apiUtil.shareChallenge(
                this.props.jobId,
                1,
                this.props.challenge.challengeSettings.expiration,
                this.props.referralCode
            );
            console.log("\nReferralModal.jsx, shareChallengeRes returned in login workflow, case YES referralCodeId\n", shareChallengeRes.data);
        } else {
            let shareChallengeRes = await apiUtil.shareChallenge(
                this.props.jobId,
                1,
                this.props.challenge.challengeSettings.expiration
            );
            console.log("\nReferralModal.jsx, shareChallengeRes returned in login workflow, case NO referralCodeId\n", shareChallengeRes.data);
        }
    }

    renderModalContent() {
        switch (this.state.modalStage) {
            case "sendMail":
                return (
                    <div className="referralModal">
                        <div className="referralModalInformation">
                            Enter your email address to receive your personal sharing url.
                        </div>
                        <div className="referralModalInputBtnWrapper">
                            <input className="referralModalInput" placeholder="Your Email Address"
                                   onKeyDown={this.emailKey} ref={el => this.emailInput = el}
                                   onChange={this.changeEmail}
                            />
                            <button className="referralModalSendBtn" onClick={this.sendMail}>
                                Generate Personal Link
                            </button>
                        </div>
                    </div>
                );
            case "loading":
                return this.renderSpinner();
            // case "sendCode":
            //     return (
            //         <div className="referralModal">
            //             <div className="referralModalInformation">
            //                 Email sent! <br/>
            //                 Please enter the code you received.
            //             </div>
            //             <div className="referralModalInputBtnWrapper">
            //                 <input className="referralModalInput" placeholder="Your Code"
            //                        onKeyDown={this.codeKey} ref={el => this.codeInput = el} onChange={this.changeCode}
            //                 />
            //                 <button className="referralModalSendBtn" onClick={this.sendCode}>
            //                     Send Code
            //                 </button>
            //             </div>
            //         </div>
            //     );
            // case "evaluatingCode":
            //     return (
            //         <div className="referralModalLoading">
            //             <div className="referralModalLoadingInformation">
            //                 Evaluating Code
            //             </div>
            //             <div className="spinnerCode"></div>
            //         </div>
            //     );
            case "displayLink":
                return (
                    <div className="referralModal">
                        <span className="referralModalLink">Your Referral Link</span>
                        <span className="referralModalLinkAnchor">{this.state.referralLink}</span>
                        <button className="copyReferralLink" onClick={this.copyReferralLink}>Copy</button>
                        <div className="referralModalInformation">Send this referral link to any good candidates you
                            know!
                        </div>
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
        this.setState({email: e.target.value});
    }

    changeCode(e) {
        this.setState({code: e.target.value});
    }

    emailKey(e) {
        if (e.key === "Enter") this.sendMail();
    }

    codeKey(e) {
        if (e.key === "Enter") this.sendCode();
    }

    sendMail() {
        //creating user
        console.log('sending mail', this.state.email);
        store.dispatch(createUser(this.state.email));

        //mail is sent through updates

        this.setState({modalStage: "loading", loaded: false});

        this.emailInput.value = "";
    }

    async emailUser(shortUrl) {
        console.log('emailing user their refferal link', shortUrl);
        store.dispatch(emailUserRefferalLink(this.state.email, shortUrl));
    }

    loading() {
        if(this.props.user.sessionStatus.user.id) {
            this.componentWillMount()
        } else {
            this.sendMail()
        }
    }

    async sendCode() {
        console.log('sending code', this.state.code);
        store.dispatch(loginUser(this.props.user.userData.apiId, this.state.code));

        this.setState({modalStage: "evaluatingCode"});

        //send code api call
        //await apiCall(this.state.code);
        //let referralNum = await apiCall(this.props.jobId);
        let referralNum = 347237434;

        await this.delay();

    }

    async generateReferralLink() {
        const url = `${window.location.origin}/detail?jobId=${this.props.jobId}&referralCode=${this.state.referralCode}`;
        return await this.createShortUrl(url);
    }

    copyReferralLink(e) {
        let newInput = document.createElement("input");
        newInput.value = this.state.referralLink;
        document.querySelector("body").appendChild(newInput);
        newInput.select();
        document.execCommand("copy");
        newInput.remove();
    }

    closeModal(e) {
        if (e.target === this.modalContainer) {
            this.props.closeModal(e);
        }
    }

    delay() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1200);
        })
    }

    renderSpinner() {
        return (
            <div className="spinnerContainer">
                <div className="spinner">
                </div>
            </div>
        )
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