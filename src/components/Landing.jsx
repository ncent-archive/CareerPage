import React from "react";
import Positions from "./Positions.jsx";
import store from "./../store/initializeStore.js";
import {fetchAllChallenges} from "./../actions/challengeActions.js";
import logo from "../img/ncent_NOsubline_500px_white.png";

class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        store.dispatch(fetchAllChallenges());
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
                        <a className="openPositionsBtn" href="#positions">Open Positions</a>

                    </div>
                    <div className="main">

                        <div className="mainHeader">
                            Help us find the perfect candidate. Share your network, share the rewards
                        </div>
                        <p className="mainDescription">
                            The internet was created to democratize access to information and opportunity. It grew to be a platform where central actors now monetize the value of our connections, data and networks. We are building a new protocol to provide the correct incentives online so that you can own the value of your networks. Join us.
                        </p>

                        <div className="rolesAnchorsList">
                            <a href="#positions" className="role">
                                Open positions
                            </a>
                        </div>

                        <div className="moreInfo">

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
                                    <img className="landingImage" src="http://chittagongit.com//images/impact-icon/impact-icon-15.jpg"/>
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
                            {this.props.challengesData.map((el, i) => {
                                return <Positions jobType="Engineering" data={el} key={i}/>
                            })}
                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default Landing;