"use strict";

import React from "react";

import {Jumbotron, Grid, Row, Col, Image} from "react-bootstrap";

import {hashHistory} from "react-router";

class Search extends React.Component {
	constructor(props) {
	super(props);

	this.state = {
		robotList:['qaz123']
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("CLICK");
		//console.log(this.state.searchTerm, this.state.numArticles);
		this.props.setLoginName({name:"Testing"});
	}

	runBot(id){
		hashHistory.push("/user/Eric/"+id);

		//console.log("hit");
	}

	// Create the render function for what gets displayed on page.
	render() {

		return(
			
			<div>
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<Jumbotron>
								<h1>Welcome {this.props.params.userID}</h1>
								<Grid>
									<Row>
										<Col sm={10} smOffset={1}>
											<h2>Your Raspi-bots</h2>
										</Col>
									</Row>
									<Row>
										<Col sm={10} smOffset={1}>
											<Image src="/img/bot.png" className="botImg" responsive onClick={()=>this.runBot(this.state.robotList[0])} />
										</Col>
									</Row>

								</Grid>


								
							</Jumbotron>
						</Col>
					</Row>
				</Grid>
			</div>	
			
		)
	}
}
// Export the component back for use in other files
export default Search;