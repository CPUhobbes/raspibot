import React from "react";
import ReactDOM from "react-dom";

//Bootstrap Components
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {NavItem} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import {ControlLabel} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";

// Import sub-components
import Index from "./children/home";
import About from "./children/about";
import Contact from "./children/contact";
import Dashboard from "./children/dashboard";
import Controls from "./children/controls";

import Cookies from "react-cookie";


// Helper Function
//import helpers from "./utils/helpers";

//import Perf from 'react-addons-perf';

// Create the Parent Component
class Main extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			//Default search states
			loginText: "Log in",
			user:"",
			pass:"",
			showModal:false
		};

		//Bind this to functions
		
		this.setLoginName = this.setLoginName.bind(this);
		this.loginHelper = this.loginHelper.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
	}

	//Check for updated states
	componentDidUpdate(prevProps, prevState) {
		
	}


	handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

	setLoginName(data) {
		console.log(data.name);
    	this.setState({
      		loginText:data.name
    	});
  	}

  	loginHelper(event){
  		//event.preventDefault();
  		//ReactDOM.findDOMNode(this.refs.userUrl).removeAttribute("data-toggle");

  		//ReactDOM.findDOMNode(this.refs.userUrl).setAttribute("href", "#/user/Eric");
  		//ReactDOM.findDOMNode(this.refs.userUrl).blur();

  		//window.location.replace("#/user/Eric");
  		console.log("hit")
  	}

  	triggerModal(){
  		this.setState({showModal:!this.state.showModal});

  	}
	

	// Create the render function for what will be displayed on page.
	render(){

		return(
			
			<div>
				<Navbar id="main-nav">
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">Raspi-Bot</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <NavItem eventKey={1} href="#/">Home</NavItem>
				        <NavItem eventKey={2} href="#/about">About</NavItem>
				        <NavItem eventKey={3} href="#/contact">Contact</NavItem>
				        <NavItem eventKey={4} onClick={this.triggerModal}>Log in</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			    	

			     {React.cloneElement(this.props.children, {setLoginName: this.setLoginName})}
		    
			     
			    {/*MODAL HERE*/}
			    <Modal  show={this.state.showModal} onHide={this.triggerModal}>
			      <Modal.Header closeButton>
			        <Modal.Title>Log In to Raspi-Bot</Modal.Title>
			      </Modal.Header>

			      <Modal.Body>
			        <Form>
			        	<FormGroup>
			        		<ControlLabel>Email</ControlLabel>
			        	 	<FormControl type="text" placeholder="Jane Doe" />
			        	 </FormGroup>
			        	 <FormGroup>
			        	 	<ControlLabel>Password</ControlLabel>
			        	 	<FormControl type="text" placeholder="Jane Doe" />
			        	 </FormGroup>
			        	 <div className="text-center">
						    <Button bsStyle="primary">Go!</Button>
						</div>
			        </Form>
			      </Modal.Body>
			    </Modal>

			
			{/* -- END OF RENDER -- */}
			</div>

		)	
	}
}

// Export the component back for use in other files
export default Main;