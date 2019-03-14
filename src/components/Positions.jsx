import React from "react";
import PositionItem from "./PositionItem.jsx";

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
        this.renderPositionList = this.renderPositionList.bind(this);

    }

    //functions

    handleExpansion(e) {
        e.stopPropagation();
        this.setState({arrowUp: !this.state.arrowUp});
        this.setState({renderListing: !this.state.renderListing});
    }

    renderArrow() {
        if (this.state.arrowUp) {
            return (
                <svg className="positionArrow arrowUp" viewBox="0 0 10 16" version="1.1" width="12" height="20">
                    <path fillRule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path>
                </svg>
            )
        } else {
            return (
                <svg className="positionArrow arrowDown" viewBox="0 0 10 16" version="1.1" width="12" height="20">
                    <path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
                </svg>
            )
        }
    }

    renderPositionList() {
        if (this.state.renderListing) {
            return this.props.data.map((el, i) => {
                return (
                    <PositionItem jobTitle={el.challengeSettings.metadatas[0].value.company.jobTitle}
                                  location={el.challengeSettings.metadatas[0].value.company.location}
                                  link={el.challengeSettings.metadatas[0].value.company.jobsUrl ||
                                  `${window.location.origin}/detail?jobId=${el.id}`}
                                  key={i}
                    />
                )
            })
        }
    }

    render() {
        return (
            <div className="positionContainer">

                <div className="positionDefaultContainer" onClick={this.handleExpansion}>
                    <div className="positionName">
                        {this.props.jobType}
                    </div>
                    <div className="positionOpenings">
            <span className="positionOpeningsText">
              1 Opening
            </span>
                        {this.renderArrow()}
                    </div>
                </div>

                <div className="positionsList">
                    {this.renderPositionList()}
                </div>

            </div>
        )
    }
}

export default Positions;