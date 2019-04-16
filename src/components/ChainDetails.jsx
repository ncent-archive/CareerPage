import React from "react";
import store from "./../store/initializeStore.js";
import { fetchChallengeChain, fetchAllChallenges } from "./../actions/challengeActions.js";
import $ from "jquery";
import * as d3 from "d3";
import d3Tip from "d3-tip"

$(function () {
    $('a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});

class ChainDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	stage: "default",
        };
    }

    async componentWillMount() {
        await store.dispatch(fetchChallengeChain(114));
    }

    // async componentDidUpdate() {
    //     const chainData = this.props.challengeChainData;
 
    // }

    async componentDidUpdate() {
	    // set the dimensions and margins of the graph
		var width = 1200
		var height = 1200

		// append the svg object to the body of the page
		var svg = d3.select("#my_dataviz")
		  .append("svg")
		    .attr("width", width)
		    .attr("height", height)
		  .append("g")
		    .attr("transform", "translate(150, 0)");

		var challengerRoot = this.props.challengeChainData
		// read json data
		d3.json(challengerRoot).then(function() {
		  // Create the cluster layout:
		  var cluster = d3.cluster()
		    .size([height, width - 150]);  // 100 is the margin I will have on the right side

		  // Give the data to this cluster layout:
		  var root = d3.hierarchy(challengerRoot, function(d) {
		      return d.receivers;
		  });
		  cluster(root);


		  // Add the links between nodes:
		  svg.selectAll('path')
		    .data( root.descendants().slice(1) )
		    .enter()
		    .append('path')
		    .attr("d", function(d) {
		        return "M" + d.y + "," + d.x
		                + "C" + (d.parent.y) + "," + d.x
		                + " " + (d.parent.y) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
		                + " " + d.parent.y + "," + d.parent.x;
		              })
		    .style("fill", 'none')
		    .attr("stroke", '#ccc')


		  // Add a circle for each node.
		  svg.selectAll("g")
		      .data(root.descendants())
		      .enter()
		      .append("g")
		      .attr("transform", function(d) {
		          return "translate(" + d.y + "," + d.x + ")"
		      })
		      .append("text")
			  	.attr("dy", 3)
			    .attr("x", function(d) { return d.data.receivers ? -8 : 8; })
			    .style("text-anchor", function(d) { return d.data.receivers ? "end" : "start"; })
			    .style("font-size", 10)
			    .text(function(d) { return d.data.challenger.userMetadata.email })
		      .append("circle")
		        .attr("r", 7)
		        .style("fill", "#69b3a2")
		        .attr("stroke", "black")
		        .style("stroke-width", 2)
		        .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
		});
	}

    render() {
        const chainData = this.props.challengeChainData;

		if (!chainData) {
            return (
                <div className="spinnerContainer">
                    <div className="spinner">
                    </div>
                </div>
            )
        } else {
        	return (
        		<div>
	    			<div id="my_dataviz"></div>
	    			<text>{JSON.stringify(chainData)}</text>
        		</div>
	      	)
        }
    }
}

export default ChainDetails;
