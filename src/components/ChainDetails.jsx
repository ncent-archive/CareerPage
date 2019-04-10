import React from "react";
import store from "./../store/initializeStore.js";
import { fetchChallengeChain, fetchAllChallenges } from "./../actions/challengeActions.js";
import $ from "jquery";

$(function () {
    $('a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});

class ChainDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	stage: "default",
        };
    }

    async componentWillMount() {
        await store.dispatch(fetchChallengeChain(114));
    }

    render() {
        const chainData = this.props.challengeChainData;

		if (!this.props.challengeChainData) {
            return (
                <div className="spinnerContainer">
                    <div className="spinner">
                    </div>
                </div>
            )
        } else {
        	return (
	            <div className="chainDetailsContainer">
	                <span>{JSON.stringify(chainData)}</span>
	            </div>
	        )
        }
    }
}

export default ChainDetails;
