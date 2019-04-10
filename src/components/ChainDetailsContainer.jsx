import { connect } from 'react-redux';
// import {  } from './../actions/challengeActions.js';
import ChainDetails from './ChainDetails.jsx';

const mapStateToProps = state => ({
  challengeData: state.challenge.challengeData,
  chainData: state.challenge.chainData,
  challengesReceived: state.challenge.challengeChainReceived,
  challengeChainData: state.challenge.challengeChainData,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChainDetails);