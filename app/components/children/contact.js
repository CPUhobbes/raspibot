"use strict";

import React from "react";
import {Image, Button, Form, FormControl, ControlLabel, FormGroup, Col, Row, Grid, HelpBlock, Jumbotron} from "react-bootstrap";

import ContactHelper from ".././utils/ContactHelper"

class Search extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
		name: "",
		email:"",
		messsage:"",
		status:null
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

	ContactHelper.submitForm(this.state.name, this.state.email, this.state.message).then((data)=>{

		if(data === 200){
			this.setState({status: true});
		}
		else{
			this.setState({status: false});
		}

	});
	this.setState({name: ""});
	this.setState({email:""});
	this.setState({messsage:""});
  }

	// Create the render function for what gets displayed on page.
	render() {

		let message=null;

		if(this.state.status===null){
			message=(<div></div>);
		}

		else if(this.state.status){
			message = (<div className="text-center"><FormGroup validationState="success" > 
							<HelpBlock><h2>Message Sent!</h2></HelpBlock>
						</FormGroup></div>);
		}
		
		else if (!this.state.status){
			message = (<div className="text-center"><FormGroup validationState="error" > 
							<HelpBlock><h2>Error Sending Message!</h2></HelpBlock>
						</FormGroup></div>);
		
		}

		return(


			
			<div>
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<Jumbotron>
								<Image src="/img/text/contact.png" className="pagesLogo" responsive />
								<p className="lineBreak"><br /></p>	

								<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
			                        <FormGroup>
			        					<ControlLabel bsStyle="contact">Name</ControlLabel>
			        	 				<FormControl type="name" id="name" placeholder="Name" />
			        	 			</FormGroup>
			                        <FormGroup>
			        					<ControlLabel bsStyle="contact">Email</ControlLabel>
			        	 				<FormControl type="email" id="email" placeholder="user@internet.com" />
			        	 			</FormGroup>
			                        <FormGroup>
      									<ControlLabel bsStyle="contact">Message</ControlLabel>
      									<FormControl componentClass="textarea" id="message" placeholder="Your Message" />
    								</FormGroup>
			                        
			                        <Row>
								    	<Col sm={12} className="text-center">
								    		<Button bsStyle="success" type="submit" bsSize='lg'>Send!</Button>
								    	</Col>
								    </Row>
								    {message}
								</Form>
								



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