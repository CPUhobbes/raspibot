import React from "react";
import ReactDOM from "react-dom";
import {hashHistory} from "react-router";


//Bootstrap Components
import {Nav, Navbar, NavItem, Modal,Button, Form, FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import {IndexLinkContainer} from "react-router-bootstrap";

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
			user:"Log In",
			pass:"",
			modal:{
				showModal:false,
				enable:true
			},
			
			homeLink:"/"
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

  		this.setState({user:"Hi, "+"Eric"});
  		this.setState({homeLink:"/user/Eric/"});
  		this.triggerModal();
  		let modalState = {showModal:false, enable:false};
  		this.setState({modal: modalState});
  		hashHistory.push("/user/Eric/");
  	}

  	triggerModal(){
  		let modalState = {showModal:!this.state.modal.showModal, enable:true};
  		if(this.state.modal.enable){
  			this.setState({modal: modalState});
  		} 		
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
				      	<IndexLinkContainer to={this.state.homeLink} activeHref="active">
				        	<NavItem eventKey={1}>Home</NavItem>
				        </IndexLinkContainer>
				        <IndexLinkContainer to="/about" activeHref="active">
				        	<NavItem eventKey={2}>About</NavItem>
				        </IndexLinkContainer>
				        <IndexLinkContainer to="/contact" activeHref="active">
				        	<NavItem eventKey={3}>Contact</NavItem>
				        </IndexLinkContainer>
				        <NavItem eventKey={4} onClick={this.triggerModal}>{this.state.user}</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			    	

			     {React.cloneElement(this.props.children, {setLoginName: this.setLoginName})}
		    
			     
			    {/*MODAL HERE*/}
			    <Modal show={this.state.modal.showModal} onHide={this.triggerModal}>
			      <Modal.Header closeButton>
			        <Modal.Title>Log In to Raspi-Bot</Modal.Title>
			      </Modal.Header>

			      <Modal.Body>
			        <Form onSubmit={this.loginHelper}>
			        	<FormGroup>
			        		<ControlLabel>Email</ControlLabel>
			        	 	<FormControl type="text" placeholder="Jane Doe" />
			        	 </FormGroup>
			        	 <FormGroup>
			        	 	<ControlLabel>Password</ControlLabel>
			        	 	<FormControl type="text" placeholder="Jane Doe"/>
			        	 </FormGroup>
			        	 <div className="text-center">
						    <Button bsStyle="primary" type="submit">Go!</Button>
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