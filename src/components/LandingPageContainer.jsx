import { connect } from 'react-redux';
// import {  } from './../actions/challengeActions.js';
import Landing from './Landing.jsx';

const mapStateToProps = state => ({
  challengesData: state.challenge.challengesData,
  testing: "testing"
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);