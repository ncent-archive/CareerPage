import React from "react";
import ReactDOM from "react-dom";
import Positions from "./components/Positions.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bindings
    this.arrowSwitch = this.arrowSwitch.bind(this);

  }
  //functions

  arrowSwitch(e) {
    if (e.target.classList.contains("positionArrowUp")) {
      e.target.classList.add("positionArrowDown");
      e.target.classList.remove("positionArrowUp");
      e.target.innerHTML = `<svg class="positionArrow arrowDown" viewBox="0 0 10 16" version="1.1" width="12" height="20">
        <path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path>
      </svg>`;
    } else {
      e.target.classList.add("positionArrowUp");
      e.target.classList.remove("positionArrowDown");
      e.target.innerHTML = `<svg class="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
        <path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
      </svg>`;
    }
  }

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

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Work happier
              </div>
              <div className="infoText">
                Build amazing things with autonomy, self-direction, and a healthy work-life balance. We offer flexible work schedules for all of our employees and unlimited PTO. We also believe that if a job allows for it, you should work wherever you’re happiest.
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Explore HQ
              </div>
              <div className="infoText">
                Our office in San Francisco’s SOMA neighborhood is designed to help you find your ideal work environment—whether that’s in a library, hammock room, or roof deck. When it’s time to fuel up, we’ve got an in-house coffee shop and several catered meals throughout the week. We also love sharing our space for community events like meetups, hackathons, and Pride Month celebrations.
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Put your health and family first
              </div>
              <div className="infoText">
                You’ll enjoy 100% coverage of health insurance premiums across our medical, dental, and vision plan offerings, including coverage for dependents. We also offer five months of paid family leave to all new parents with the option to use it all at once or throughout the baby’s first year.
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Find your zen
              </div>
              <div className="infoText">
                We cover your gym memberships and offer fitness classes in our onsite gym, the OctoDojo. In the Zen Room, you can recharge through meditation or complimentary massage.
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Invest in your future
              </div>
              <div className="infoText">
                At GitHub, you’ll have a stake in the future success of our platform with equity grants. For full-time employees, we offer competitive 401k planning with a company match of up to 4% of your year-to-date salary.
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIcon">
                {/* Icon Placeholder */}
              </div>
              <div className="infoHeader">
                Keep growing
              </div>
              <div className="infoText">
                Learn how you learn best. From books to conferences, you’ll get a yearly budget for your individual learning and development goals. If ebooks are more your style, you’ll get a brand new Kindle on your first day.
              </div>
            </div>

          </div>

          <div className="divider">
            <div className="dividerLine">
            </div>
            <div className="dividerSpace">
            </div>
          </div>

          <div className="disclaimer">
            Please note that benefits vary by country, the ones shown above are for our US based employees. Benefit information for non-US based positions will be provided to individuals who interview for those roles.
          </div>

          <div className="positionsContainer" id="positions">
            <div className="positionsHeader">
              Open Positions
            </div>
            {/* <div className="positions">
              <div className="position">
                <div className="positionName">
                  Engineering
                </div>
                <div className="positionOpenings">
                  <span className="positionOpeningsText">
                    3 openings
                  </span>
                  <span className="positionArrowContainer">
                    <span className="positionArrowUp" onClick={this.arrowSwitch}>
                      <svg className="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
                        <path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </div> */}
            <Positions />
          </div>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));