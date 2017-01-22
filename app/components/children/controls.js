"use strict";

import React from "react";

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
		let queryString = '/api/bot/getBotID/?serial='+this.props.params.botID;
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
		  		
		  		BotHelper.moveRobot(0,100,1, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="d" && this.state.keyStatus.gas === true  && this.state.keyStatus.left === false && this.state.keyStatus.brake === false){
		  		this.state.keyStatus.right = true;

		  		BotHelper.moveRobot(100,0,1, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="a" && this.state.keyStatus.brake === true && this.state.keyStatus.right === false  && this.state.keyStatus.gas === false ){
		  		this.state.keyStatus.left = true;
		  		this.state.keyStatus.brake = true;
		  		this.state.keyStatus.gas = false;

		  		BotHelper.moveRobot(0,100,-1, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="d" && this.state.keyStatus.brake === true && this.state.keyStatus.left === false && this.state.keyStatus.gas === false ){
		  		this.state.keyStatus.right = true;
		  		this.state.keyStatus.brake = true;
		  		this.state.keyStatus.gas = false;

		  		BotHelper.moveRobot(100,0,-1, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="w" && this.state.keyStatus.brake === false){
		  		this.state.keyStatus.gas = true;

		  		BotHelper.moveRobot(100,100,1, (this.state.ip_Addr+this.state.port));

		  	}
		  	else if(event.key ==="s" && this.state.keyStatus.gas === false) {
		  		this.state.keyStatus.brake = true;

		  		BotHelper.moveRobot(100,100,-1, (this.state.ip_Addr+this.state.port));
		  		
		  	}
		}
  	}

  onKeyUp(event){
  	if(this.state.ip_Addr!==''){
	  	if(event.key ==="a" && this.state.keyStatus.left === true && this.state.keyStatus.gas === true && this.state.keyStatus.brake === false){
	  		this.state.keyStatus.left = false;
	  		BotHelper.moveRobot(100,100, 1, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="d" && this.state.keyStatus.right === true && this.state.keyStatus.gas === true && this.state.keyStatus.brake === false){
	  		this.state.keyStatus.right = false;
	  		BotHelper.moveRobot(100,100, 1, (this.state.ip_Addr+this.state.port));

	  	}
	  	if(event.key ==="a" && this.state.keyStatus.left === true && this.state.keyStatus.brake === true && this.state.keyStatus.gas === false){
	  		this.state.keyStatus.left = false;
	  		BotHelper.moveRobot(100,100, -1, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="d" && this.state.keyStatus.right === true && this.state.keyStatus.brake === true && this.state.keyStatus.gas === false){
	  		this.state.keyStatus.right = false;
	  		BotHelper.moveRobot(100,100, -1, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="w" && this.state.keyStatus.gas === true){
	  		this.state.keyStatus.gas = false;
	  		BotHelper.moveRobot(0,0, 1, (this.state.ip_Addr+this.state.port));

	  	}
	  	else if(event.key ==="s" && this.state.keyStatus.brake === true) {
	  		this.state.keyStatus.brake = false;
	  		BotHelper.moveRobot(0,0,-1, (this.state.ip_Addr+this.state.port));
		  	

	  	}
	}

  }

	// Create the render function for what gets displayed on page.
	render() {

		return(
			
				<div>

					<div className="jumbotron">
					<div className="row">
			  			<div className="col-md-12">
							<h1>Welcome {this.props.params.userID}, {this.state.ip_Addr}</h1>
						</div>
					</div>
			  			
			  			<div className="row">
			  				<div className="col-md-2">
			  					
            					<button onMouseDown={(e)=>{this.onKeyDown({key:'a'})} } onMouseUp={(e)=>{this.onKeyUp({key:'a'})} } className="btn btn-primary btn-lg" id="left">{'<<<'}</button>
            					<button onMouseDown={(e)=>{this.onKeyDown({key:'d'})} } onMouseUp={(e)=>{this.onKeyUp({key:'d'})} } className="btn btn-primary btn-lg" id="right">{'>>>'}</button>
            				</div>
            				<div className="col-md-8">
			  					<img id="camera" className="flip_video" width="500px" height="500px" data-ip="192.168.0.150:8080" src={this.state.img_addr} />
							</div>
							<div className="col-md-2">
			  					
            					<button onMouseDown={(e)=>{this.onKeyDown({key:'w'})} } onMouseUp={(e)=>{this.onKeyUp({key:'w'})} } className="btn btn-success btn-lg" id="gas">GAS</button>
            					<button onMouseDown={(e)=>{this.onKeyDown({key:'s'})} } onMouseUp={(e)=>{this.onKeyUp({key:'s'})} } className="btn btn-danger btn-lg" id="brk">BRK</button>
            				</div>


			  			</div>
			  		</div>
			  		
			  	{/*LAST RENDER DIV*/}
			  	</div>


					
			

				
			
		)
	}
}
// Export the component back for use in other files
export default Search;