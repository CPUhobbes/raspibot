"use strict";

import React from "react";
import {Jumbotron, Grid, Row, Col, Image, Form, Button, FormGroup, FormControl} from "react-bootstrap";

import BotHelper from ".././utils/BotHelper";
import axios from 'axios';

class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			img_addr:'',
			keyStatus:{left: false, right:false, gas:false, brake:false},
			ip_Addr:'',
			port:":8080" //Port of python server on Raspberry Pi

		};

		this.handleChange = this.handleChange.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
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

	componentWillMount(){

		/***** FIX THIS INSIDE HELPER ********/

		//Axios is promise based, cannot update img_addr using helper class 
		let queryString = '/api/bot/getBotIP/?serial='+this.props.params.botID;
		return axios.get(queryString).then((response) => {
			if(response.data !== null){
				this.setState({ip_Addr:response.data.ip});
				this.setState({img_addr:'http://'+response.data.ip+this.state.port+'?' + new Date().getTime()});
			}
		});

  		

	}


	componentDidMount (){
		this.imageTimer = setTimeout(()=>{this.setState({img_addr:'http://'+this.state.ip_Addr+this.state.port+'?' + new Date().getTime()})}, 75);
	  	document.addEventListener("keyup", this.onKeyUp, false);
	  	document.addEventListener("keydown", this.onKeyDown, false);
	  	
	}

	componentDidUpdate(prevProps, prevState){
	  	//console.log("hit");
	  	if(prevState.img_addr !== this.state.img_addr){

	  		this.imageTimer = setTimeout(()=>{this.setState({img_addr:'http://'+this.state.ip_Addr+this.state.port+'?' + new Date().getTime()})}, 75);
	  	}

	  	
	}

  	componentWillUnmount(){
  		clearTimeout(this.imageTimer);
  		document.removeEventListener("keyup", this.onKeyUp, false);
  		document.removeEventListener("keydown", this.onKeyDown, false);
  	}

  	//helpers.moveRobot(motorNum, speed, direction)
  	onKeyDown(event){
  		if(this.state.ip_Addr!==''){
  			console.log("Left: "+this.state.keyStatus.left+" Right: "+this.state.keyStatus.right+" Gas: "+ this.state.keyStatus.gas+" Brake: "+this.state.keyStatus.brake)
		  	
		  	if(event.key === "a" && this.state.keyStatus.gas === true  && this.state.keyStatus.right === false && this.state.keyStatus.brake === false ){
		  		this.state.keyStatus.left = true;
		  		
		  		BotHelper.moveRobot(-100,100, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="d" && this.state.keyStatus.gas === true  && this.state.keyStatus.left === false && this.state.keyStatus.brake === false){
		  		this.state.keyStatus.right = true;

		  		BotHelper.moveRobot(100,-100, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="a" && this.state.keyStatus.brake === true && this.state.keyStatus.right === false  && this.state.keyStatus.gas === false ){
		  		this.state.keyStatus.left = true;
		  		this.state.keyStatus.brake = true;
		  		this.state.keyStatus.gas = false;

		  		BotHelper.moveRobot(-100,100, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="d" && this.state.keyStatus.brake === true && this.state.keyStatus.left === false && this.state.keyStatus.gas === false ){
		  		this.state.keyStatus.right = true;
		  		this.state.keyStatus.brake = true;
		  		this.state.keyStatus.gas = false;

		  		BotHelper.moveRobot(100,-100, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="w" && this.state.keyStatus.brake === false){
		  		this.state.keyStatus.gas = true;

		  		BotHelper.moveRobot(100,100, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="s" && this.state.keyStatus.gas === false) {
		  		this.state.keyStatus.brake = true;

		  		BotHelper.moveRobot(-100,-100, (this.state.ip_Addr+this.state.port));
		  	}
		  	else if(event.keyCode ===32){
		  		console.log("horn");
		  		BotHelper.robotHorn( this.state.ip_Addr+this.state.port);


		  	}


		}
  	}

  onKeyUp(event){
  	if(this.state.ip_Addr!==''){
	  	if(event.key ==="a" && this.state.keyStatus.left === true && this.state.keyStatus.gas === true && this.state.keyStatus.brake === false){
	  		this.state.keyStatus.left = false;
	  		BotHelper.moveRobot(100,100, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="d" && this.state.keyStatus.right === true && this.state.keyStatus.gas === true && this.state.keyStatus.brake === false){
	  		this.state.keyStatus.right = false;
	  		BotHelper.moveRobot(100,100, (this.state.ip_Addr+this.state.port));

	  	}

	  	if(event.key ==="a" && this.state.keyStatus.left === true && this.state.keyStatus.brake === true && this.state.keyStatus.gas === false){
	  		this.state.keyStatus.left = false;
	  		BotHelper.moveRobot(-100,-100, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="d" && this.state.keyStatus.right === true && this.state.keyStatus.brake === true && this.state.keyStatus.gas === false){
	  		this.state.keyStatus.right = false;
	  		BotHelper.moveRobot(-100,-100, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="w" && this.state.keyStatus.gas === true){
	  		this.state.keyStatus.gas = false;
	  		BotHelper.moveRobot(0,0, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="s" && this.state.keyStatus.brake === true) {
	  		this.state.keyStatus.brake = false;
	  		BotHelper.moveRobot(0,0, (this.state.ip_Addr+this.state.port));
		  	

	  	}
	}

  }

	// Create the render function for what gets displayed on page.
	render() {

		if(this.props.getLogInStatus()){

			return(
			
				<Grid>
					<Jumbotron>
						<Row>
							<Col sm={10} smOffset={1}>
								<h2 className="dashboardHeader">{this.props.params.userID}'s {this.props.params.botID}</h2>
							</Col>
						</Row>
			  			<Row>
            				<Col sm={10} smOffset={1} className="text-center">
			  					<Image id="camera" className="flip_video center-block" src={this.state.img_addr} responsive />
							</Col>
						</Row>
						<Row>
							<Col sm={10} smOffset={1} className="text-center">
								<h3>GAS: W -- BRAKE/REVERSE: S -- LEFT: A -- RIGHT: D</h3>
							</Col>
						</Row>
						<Row>
							<Col sm={1} smOffset={2} className="text-center">
            					<Button onMouseDown={(e)=>{this.onKeyDown({key:'a'})} } onMouseUp={(e)=>{this.onKeyUp({key:'a'})} } className="btn btn-primary btn-lg" id="left">{'<<<'}</Button>
            				</Col>
            				<Col sm={1} smOffset={1} className="text-center">
            					<Button onMouseDown={(e)=>{this.onKeyDown({key:'d'})} } onMouseUp={(e)=>{this.onKeyUp({key:'d'})} } className="btn btn-primary btn-lg" id="right">{'>>>'}</Button>
            				</Col>
            				<Col sm={1} smOffset={1} className="text-center">
            					<Button onMouseDown={(e)=>{this.onKeyDown({key:'w'})} } onMouseUp={(e)=>{this.onKeyUp({key:'w'})} } className="btn btn-success btn-lg" id="gas">GAS</Button>
            				</Col>	
            				<Col sm={1} smOffset={1} className="text-center">
            					<Button onMouseDown={(e)=>{this.onKeyDown({key:'s'})} } onMouseUp={(e)=>{this.onKeyUp({key:'s'})} } className="btn btn-danger btn-lg" id="brk">BRK</Button>
            				</Col>
			  			</Row>
			  		</Jumbotron>
			  		
			  	{/*LAST RENDER DIV*/}
			  	</Grid>
			);
		}

		else{
			return (<div>
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<Jumbotron>
								<Row>
									<Col sm={10} smOffset={1}>
										<h2 className="text-center">You are no longer logged in!</h2>
										<p><br /></p>
									</Col>
								</Row>
								<Row>
									<Col sm={10} smOffset={1} className="text-center">
										<Button onClick={this.props.triggerModal} bsStyle="primary" bsSize="large">Click here to Log In</Button>
									</Col>
								</Row>
							</Jumbotron>
						</Col>
						
					</Row>
				</Grid>
			
			</div>);
		}
	}
}
// Export the component back for use in other files
export default Search;