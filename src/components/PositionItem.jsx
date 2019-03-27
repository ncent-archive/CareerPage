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
        <div className="positionItemLocation">
          <span className="positionItemDetail">{this.props.location}</span>
            <span className="positionItemDetail">{this.props.salaryRange}</span>
            <span className="positionItemDetail">{this.props.equityRange}</span>
        </div>
      </div>
    )
  }
}

export default PositionItem;