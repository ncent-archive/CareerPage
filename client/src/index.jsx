import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bindings

  }
  //functions

  render() {
    return (
      <div className="appContainer">
        <div className="headerContainer">

          <div className="headerMain">
            <div className="icon">
              nCent icon
            </div>
            <div className="headerItems">
              <div className="headerItem">
                Item 1
              </div>
              <div className="headerItem headerItemRowEnd">
                Item 2
              </div>
            </div>
          </div>

        </div>
        <div className="main">

          <div className="mainHeader">
            Come help us make collaboration even better
          </div>

          <p className="mainDescription">
            At GitHub we build the tools that make collaborating and writing software easier for everyone. We’ve built a company we truly love working for, and we think you will too.
          </p>

          <div className="rolesAnchorsList">
            <a href="#positions" className="role">
              Open positions
            </a>
          </div>

          <div className="moreInfo">
          
            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                A diverse and inclusive workplace
              </div>
              <div className="infoText">
                At GitHub, we think that a diverse company is a strong company, and we work hard to foster a supportive and welcoming workplace. Learn more about our commitment to diversity and inclusion and see our current demographic data.
              </div>
            </div>
          </div>

          <div className="positions" id="positions">
            positions
          </div>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));