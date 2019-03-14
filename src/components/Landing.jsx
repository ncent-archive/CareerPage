import React from "react";
import Positions from "./Positions.jsx";
import store from "./../store/initializeStore.js";
import {fetchAllChallenges} from "./../actions/challengeActions.js";
import logo from "../img/ncent_NOsubline_500px_white.png";
import impact from "../img/impact-icon-15.jpg";
import downArrow from "../img/Scroll Down-595b40b75ba036ed117d58fa.svg";
import $ from "jquery";

function scrollDown(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#positions').offset().top}, 500, 'linear');
}

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.positionsByType = this.positionsByType.bind(this);
    }

    async componentWillMount() {
        store.dispatch(fetchAllChallenges());
    }

    positionsByType() {
        const challenges = this.props.challengesData;
        const positionTypesMap = {};

        challenges.forEach(function(challenge) {
            let department = challenge.challengeSettings.metadatas[0].value.company.department;
            if (positionTypesMap[department]) {
                positionTypesMap[department].push(challenge);
            } else {
                positionTypesMap[department] = [challenge];
            }
        });

        return positionTypesMap;
    }

    render() {
        if (!this.props.challengesData) {
            return (
                <div className="spinnerContainer">
                    <div className="spinner">
                    </div>
                </div>
            )
        } else {
            return (
                <div className="appContainer">
                    <div className="headerContainer">
                        <img className="landingLogoImg" src={logo} onError={this.imgError}/>
                        <span className="openPositionsBtn" onClick={scrollDown}>Openings</span>
                    </div>
                    <div className="main">

                        <div className="mainHeader">
                            <div className="titleBullets">
                                <span className="titleBullet">Help us recruit</span><br/>
                                <span className="titleBullet">Share your network</span><br/>
                                <span className="titleBullet">Share the rewards</span><br/>
                            </div>
                            <div onClick={scrollDown}>
                                <div className="scrollBtnContainer">
                                    <img className="downArrow" src={downArrow}/>
                                    <span className="shareNow">View Openings</span>
                                </div>
                            </div>
                        </div>

                        <div id="moreInfo" className="moreInfo">

                            <div className="infoItem">
                                <div className="infoIcon">
                                    <img className="landingImage" src="https://cdn2.iconfinder.com/data/icons/bitcoin-and-mining-1/44/cloud-512.png"/>
                                </div>
                                <div className="infoHeader">
                                    Work on the latest technology!
                                </div>
                                <div className="infoText">
                                    We're a crypto blockchain protocol company, you'll be working on the latest technical advancements in the industry and making advancements in them yourself! We are always trying to find the best technology for whatever problem we are solving.
                                </div>
                            </div>

                            <div className="infoItem">
                                <div className="infoIcon">
                                    <img className="landingImage" src="https://lh3.googleusercontent.com/T65ixGjGIcvx_Il2s1p0advcXv4qefZXCZGa6ic1UtLGliGDQariIzyE0MIWpdBs1pVJd0yvyZejTm_N0UXilYo=w1024"/>
                                </div>
                                <div className="infoHeader">
                                    Do your best work from anywhere
                                </div>
                                <div className="infoText">
                                    We're a fully remote and completely distributed team, so we can work wherever we're happiest. Also, night owls rejoice! We're dedicated to working asynchronously, so we can contribute from anywhere at anytime.
                                </div>
                            </div>

                            <div className="infoItem">
                                <div className="infoIcon">
                                    <img className="landingImage" src={impact}/>
                                </div>
                                <div className="infoHeader">
                                    High empathy, high impact
                                </div>
                                <div className="infoText">
                                    A culture of results, not hours spent: Flexible hours let us schedule our days so that we do our best work without missing out on life's important moments. With a small, nimble, team you will have major impact and opportunity for learning all new technologies.
                                </div>
                            </div>
                        </div>

                        <div className="divider">
                            <div className="dividerLine">
                            </div>
                            <div className="dividerSpace">
                            </div>
                        </div>

                        <div className="positionsContainer" id="positions">
                            <div className="positionsHeader">
                                Open Positions
                            </div>
                            {Object.keys(this.positionsByType()).map((key, i) => {
                                return <Positions jobType={key} data={this.positionsByType()[key]} key={i}/>
                            })}
                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default Landing;