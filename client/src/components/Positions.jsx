import React from "react";

class Positions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowUp: true,
      renderListing: false
    };
    //bindings
    this.handleExpansion = this.handleExpansion.bind(this);
    this.renderArrow = this.renderArrow.bind(this);

  }
  //functions

  handleExpansion(e) {
    this.setState({ arrowUp : !this.state.arrowUp });
    this.setState({ renderListing: !this.state.renderListing });
  }

  renderArrow() {
    if (this.state.arrowUp) {
      return (
        <svg className="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
          <path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
        </svg>
      )
    } else {
      return (
        <svg className="positionArrow arrowDown" viewBox="0 0 10 16" version="1.1" width="12" height="20">
          <path fillRule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path>
        </svg>
      )
    }
  }

  render() {
    return (
      <div className="positionContainer" onClick={this.handleExpansion}>

        <div className="positionName">
          {this.props.jobType}
        </div>
        <div className="positionOpenings">
          <span className="positionOpeningsText">
            {/* 3 openings */}
            {`${this.props.data.length} opening${this.props.data.length > 0 ? 's' : ''}`}
          </span>
          {this.renderArrow()}
        </div>

      </div>
    )
  }
}

export default Positions;