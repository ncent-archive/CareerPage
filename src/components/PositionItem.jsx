import React from "react";

class PositionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bindings

  }
  //functions

  render() {
    return (
      <div className="positionItemContainer">
        <span className="positionItemTitleContainer">
          <a className="positionItemTitle" href={this.props.link}>
            {this.props.jobTitle}
          </a>
        </span>
        <span className="positionItemLocation">
          <span>{this.props.location}</span>
        </span>
      </div>
    )
  }
}

export default PositionItem;