import React from "react";
import ReactDOM from "react-dom";
import {hashHistory} from "react-router";

//Bootstrap Components
import {Nav, Navbar, NavItem, Modal,Button, Form, FormControl, ControlLabel, FormGroup, Col, Row, Grid, HelpBlock, Image} from "react-bootstrap";
import {IndexLinkContainer} from "react-router-bootstrap";

// Import sub-components
import Index from "./children/home";
import About from "./children/about";
import Contact from "./children/contact";
import Dashboard from "./children/dashboard";
import Controls from "./children/controls";

//Cookies for login persistance
import Cookies from "react-cookie";

// Helper Functions
import UserHelper from "./utils/UserHelper";

// Create the Parent Component
class Main extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			//Default states
			loginText: "Log In",
			user:"",
			pass:"",
			userData:{},
			verifyPass:"",
			modal:{
				showModal:false,
				enable:true
			},
			homeLink:"/",
			loggedIn:false,
			newUser:false,
			message:"",
			failedLogin:false
		};

		//Bind this to functions
		
		this.setLoginName = this.setLoginName.bind(this);
		this.loginHelper = this.loginHelper.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
		this.updateModal = this.updateModal.bind(this);
		this.newUser = this.newUser.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.getLogInStatus = this.getLogInStatus.bind(this);
	}

	//Check for updated states
	componentDidUpdate(prevProps, prevState) {

		//Check to see if password message needs updating
		if((prevState.pass!== this.state.pass) || (prevState.verifyPass!== this.state.verifyPass) ){
			if(this.state.pass !== this.state.verifyPass && this.state.verifyPass.length>0){
	    		this.setState({message:"Passwords Do Not Match"});
	    	}
	    	else if(this.state.pass === this.state.verifyPass && this.state.verifyPass.length>0){
	  			this.setState({message:""});
	  		}
	  		else if(this.state.pass ==='' && this.state.verifyPass ===''){
	  			this.setState({message:""});
	  		}
	  	}

	  	//Update message if failed log in
	  	if(prevState.failedLogin !== this.state.failedLogin && this.state.failedLogin && this.state.newUser){
	  		this.setState({message:this.state.message});
	  	}
	  	else if(prevState.failedLogin !== this.state.failedLogin && this.state.failedLogin && !this.state.newUser){
	  		this.setState({message:this.state.message});
	  	}
	  	else if(prevState.failedLogin !== this.state.failedLogin && !this.state.failedLogin){
	  		this.setState({message:""});
	  	}
	  	
	  	

	}

	handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

	setLoginName(data) {
    	this.setState({
      		loginText:data.name
    	});
  	}

  	loginHelper(event){
  		event.preventDefault();

  		//Check username length
  		if(this.state.user.length<3){
  			this.setState({failedLogin:true})
  			this.setState({message:"Please enter a valid email"});
  		}

  		else if(this.state.pass.length<6){
  			this.setState({failedLogin:true})
  			this.setState({message:"Password must be at least 6 characters"});
  		}
  		else{

  			let userName = this.state.user.split("@");

  			if(this.state.newUser){
  				if(this.state.pass!==this.state.verifyPass){
  					this.setState({failedLogin:true})
  					this.setState({message:"Passwords Do Not Match"});
  				}
  				else{

		  			UserHelper.createUser(userName, this.state.pass).then((data)=>{
			  			if(!data){
			  				this.setState({failedLogin:true})
			  				this.setState({message:"User Exists!"});
			  			}
			  			else{
			  				//Update states for user
			  				this.setState({failedLogin:false})
			  				this.setState({loggedIn:true});
			  				this.setState({loginText:"Hi, "+userName[0]});
			  				this.setState({homeLink:"/user/"+userName[0]+"/"});

			  				//Disable modal
			  				this.triggerModal();
			  				let modalState = {showModal:false, enable:false};
			  				this.setState({modal: modalState});

			  				//Go to Dashboard
			  				hashHistory.push("/user/"+userName[0]+"/");

			  			}
		  			});
		  		}

		  	}

		  	else{
		  		UserHelper.verifyLogIn(userName, this.state.pass).then((data)=>{
		  			if(!data){
		  				this.setState({failedLogin:true})
		  				this.setState({message:"Incorrect Username or Password"});
		  			}

		  			else{
		  				this.setState({userData:data})
		  				//Update states for user
		  				this.setState({failedLogin:false})
		  				this.setState({loggedIn:true});
		  				this.setState({loginText:"Hi, "+userName[0]});
		  				this.setState({homeLink:"/user/"+userName[0]+"/"});

		  				//Disable modal
		  				this.triggerModal();
		  				let modalState = {showModal:false, enable:false};
		  				this.setState({modal: modalState});

		  				//Go to Dashboard
		  				hashHistory.push("/user/"+userName[0]+"/");

		  			}
		  		});
		  	}
  		}
  			//console.log(ReactDOM.findDOMNode(this.refs.cool));
  	}

  	triggerModal(){
  		let modalState = {showModal:!this.state.modal.showModal, enable:true};

  		//Reset modal message states
  		this.setState({newUser:false});
  		this.setState({message:""});
  		this.setState({failedLogin:false});

  		if(this.state.modal.enable){
  			this.setState({modal: modalState});
  		} 		
  	}

  	newUser(){
  		this.setState({newUser:!this.state.newUser});
  	}

  	updateForm(event){


  		var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
  	}

  	getUserData(){
  		return this.state.userData; 
  	}

  	getLogInStatus(){
  		//console.log(this.state.loggedIn);
  		return this.state.loggedIn;
  	}


  	getValidationState(){
  		if(this.state.pass !== this.state.verifyPass && this.state.verifyPass.length>0){
  			return 'error';
  		}
  		else if(this.state.pass === this.state.verifyPass && this.state.verifyPass.length>0){
  			return 'success';
  		}
  		else{
  			return 'warning';
  		}

  	}

  	updateNavbar(){
  		if(this.state.loggedIn){
  			return(<div>
  				<Navbar.Text pullRight className="loginName">
				    {this.state.loginText}
				</Navbar.Text>
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
			    </Nav>
			    </div>
  			);
  		}
  		else{
  			return(
  				<div>
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
				    <NavItem eventKey={4} onClick={this.triggerModal}>{this.state.loginText}</NavItem>
			    </Nav>
			    </div>
  			);
  		}
  	}

  	updateModal(){
  		if(this.state.newUser){
  			return(
  				<div>
  					<FormGroup validationState={this.getValidationState()}>
			        	 	<ControlLabel>Password</ControlLabel>
			        	 	<FormControl type="password" id="pass" placeholder="Password"/>
			        	 </FormGroup>
  					<FormGroup validationState={this.getValidationState()}>
			        	 <ControlLabel>Re-Enter Password</ControlLabel>
			        	 <FormControl type="password" id="verifyPass" placeholder="Re-Enter Password" />
			       	</FormGroup>
					<Row>
				    	<Col sm={12} className="text-center">
				    		<Button bsStyle="primary" type="submit">Go to Raspi-Bot!</Button>
				    	</Col>
				    </Row>
				</div>
			);
  		}
  		else{
  			return(
  				<div>
  					<FormGroup>
			        	 <ControlLabel>Password</ControlLabel>
			        	 <FormControl type="password" id="pass" placeholder="Password"/>
			        </FormGroup>
					<Row>
						<Col sm={4} smOffset={2} className="text-center">
				    		<Button bsStyle="success" onClick={this.newUser}>New User</Button>
				    	</Col>
				    	<Col sm={4} className="text-center">
				    		<Button bsStyle="primary" type="submit">Go to Raspi-Bot!</Button>
				    	</Col>
				    </Row>
				</div>
			)
  		}


  	}

	// Create the render function for what will be displayed on page.
	render(){

		return(
			
			<div>

				{/* -- NavBar -- */}
				<Navbar id="main-nav" staticTop>
				    <Navbar.Header>
				    	<Navbar.Brand>
				        	<a href="#" className="sitelogo"><Image src="/img/logo.png" className="botHeader" /></a>
				      	</Navbar.Brand>
				    	<Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
						{this.updateNavbar()}
				    </Navbar.Collapse>
				</Navbar>

			    {/* -- React Children -- */}	
			    {React.cloneElement(this.props.children, {
			    	setLoginName: this.setLoginName, 
			    	getUserData: this.getUserData, 
			    	triggerModal: this.triggerModal,
			    	getLogInStatus:this.getLogInStatus
			    })}
		    
			    {/* -- Modal -- */}
			    <Modal show={this.state.modal.showModal} onHide={this.triggerModal}>
			      <Modal.Header closeButton>
			        <Modal.Title>Log In to Raspi-Bot</Modal.Title>
			      </Modal.Header>

			      <Modal.Body>
			        <Form onSubmit={this.loginHelper} onChange={this.updateForm}>
			        	<FormGroup>
			        		<ControlLabel>Email</ControlLabel>
			        	 	<FormControl type="text" id="user" placeholder="user@internet.com" />
			        	 </FormGroup>
			        	 {this.updateModal()}
			        </Form>
			        <div className="text-center">
			        	<FormGroup validationState="error">
			        	<HelpBlock><h2>{this.state.message}</h2></HelpBlock>
			        	</FormGroup>
			        </div>
			      </Modal.Body>
			    </Modal>

			
			{/* -- END OF RENDER -- */}
			</div>

		)	
	}
}

// Export the component back for use in other files
export default Main;