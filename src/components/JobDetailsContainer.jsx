import { connect } from 'react-redux';
// import {  } from './../actions/challengeActions.js';
import JobDetails from './JobDetails.jsx';

const mapStateToProps = state => ({
  challengeData: state.challenge.challengeData,
  received: state.challenge.challengeReceived,
  user: state.user,
  jobApplication: state.jobApplication
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDetails);