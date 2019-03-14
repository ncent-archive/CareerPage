import { connect } from 'react-redux';
// import {  } from './../actions/challengeActions.js';
import AdminPage from './AdminPage.jsx';

const mapStateToProps = state => ({
  challengesData: state.challenge.challengesData,
  challengesReceived: state.challenge.challengesReceived,
  testing: "testing"
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);