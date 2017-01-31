"use strict";

import React from "react";
import {Button, Col, Row, Grid, Image, Jumbotron} from "react-bootstrap";

class Search extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
		searchTerm: "",
		startYear:"",
		endYear:"",
		numArticles:"5"
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
	this.props.setAllTerm(this.state);
	this.setState({searchTerm: ""});
	this.setState({startYear: ""});
	this.setState({endYear: ""});
  }

	// Create the render function for what gets displayed on page.
	render() {

		return(
			
			<div>
				<Grid>
					<Row>
						<Col sm={8} smOffset={2}>
							<Jumbotron>
								<h1>Contact Us</h1>
								<p className="lineBreak"><br /></p>	

								<form name="sentMessage" id="contactForm" novalidate>
			                        <div class="row control-group">
			                            <div class="form-group col-xs-12 floating-label-form-group controls">
			                                <label>Name</label>
			                                <input type="text" className="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
			                                <p className="help-block text-danger"></p>
			                            </div>
			                        </div>
			                        <div class="row control-group">
			                            <div class="form-group col-xs-12 floating-label-form-group controls">
			                                <label>Email Address</label>
			                                <input type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." />
			                                <p className="help-block text-danger"></p>
			                            </div>
			                        </div>
			                        <div class="row control-group">
			                            <div class="form-group col-xs-12 floating-label-form-group controls">
			                                <label>Phone Number</label>
			                                <input type="tel" className="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." />
			                                <p className="help-block text-danger"></p>
			                            </div>
			                        </div>
			                        <div class="row control-group">
			                            <div class="form-group col-xs-12 floating-label-form-group controls">
			                                <label>Message</label>
			                                <textarea rows="5" className="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
			                                <p className="help-block text-danger"></p>
			                            </div>
			                        </div>
			                        <br />
			                        <div id="success"></div>
			                        <div class="row">
			                            <div class="form-group col-xs-12">
			                                <button type="submit" class="btn btn-success btn-lg">Send</button>
			                            </div>
			                        </div>
								</form>




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