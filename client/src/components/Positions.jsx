import React from "react";

class Positions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    //bindings

  }
  //functions

  render() {
    return (
      <div className="positions">
        <div className="position">
          <div className="positionName">
            Engineering
                </div>
          <div className="positionOpenings">
            <span className="positionOpeningsText">
              3 openings
                  </span>
            <span className="positionArrowContainer">
              <span className="positionArrowUp" onClick={() => {}}>
                <svg className="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
                  <path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Positions;