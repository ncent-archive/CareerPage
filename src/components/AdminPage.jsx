import React from "react";
import store from "./../store/initializeStore.js";
import { fetchAllChallenges } from "./../actions/challengeActions.js";
import Challenge from "./Challenge.jsx";
import ChallengeDetails from "./ChallengeDetails.jsx";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      challengeDetail: false,
      challengeDetailIdx: null
    };
    //bindings
    this.switchToDetails = this.switchToDetails.bind(this);    
    this.switchToCollection = this.switchToCollection.bind(this);      

  }
  //functions

  async componentWillMount() {
    store.dispatch(fetchAllChallenges());
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("compDidUpdate in AdminPage", "\nprevProps", prevProps, "\nthis.props", this.props);
    if (!prevProps.challengesReceived && this.props.challengesReceived) {
      console.log("\nAdminPage.jsx, turning off spinner");
      this.setState({ spinner: false });
    }
  }

  switchToDetails(idx) {
    this.setState({
      challengeDetail: true,
      challengeDetailIdx: idx
    });
  }

  switchToCollection() {
    this.setState({
      challengeDetail: false,
      challengeDetailIdx: null
    });
  }

  render() {
    if (this.state.spinner) {
      return (
        <div className="spinnerContainer">
          <div className="spinner">
          </div>
        </div>
      )
    } else {
      if (this.state.challengeDetail) {
        return (
          <ChallengeDetails
            data={this.props.challengesData[this.state.challengeDetailIdx]}
            switchToCollection={this.switchToCollection}
          />
        )
      } else {
        return (
          <div className="huntCollectionContainer">
            {this.props.challengesData.map((challenge, i) => {
              return (
                <Challenge
                  data={challenge}
                  key={i}
                  switchToDetails={this.switchToDetails}
                  idx={i}
                />
              )
            })}
          </div>
        )
      }
    }
  }
}

export default AdminPage;