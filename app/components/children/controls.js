"use strict";

import React from "react";

import helpers from ".././utils/helpers";

class Search extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
		img_addr:'http://192.168.0.150:8080?' + new Date().getTime(),
		keyStatus:{left: false, right:false, gas:false, brake:false}
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


  componentDidMount (){
  	this.imageTimer = setTimeout(()=>{this.setState({img_addr:'http://192.168.0.150:8080?' + new Date().getTime()})}, 50);
  	document.addEventListener("keyup", this.onKeyUp, false);
  	document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentDidUpdate(prevProps, prevState){
  	//console.log("hit");
  	if(prevState.img_addr !== this.state.img_addr){

  		this.imageTimer = setTimeout(()=>{this.setState({img_addr:'http://192.168.0.150:8080?' + new Date().getTime()})}, 50);
  	}
  }

  componentWillUnmount(){
  	clearTimeout(this.imageTimer);
  	document.removeEventListener("keyup", this.onKeyUp, false);
  	document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onKeyDown(event){
  	if(event.key ==="a" && this.state.keyStatus.left === false  && this.state.keyStatus.gas === true){
  		this.state.keyStatus.left = true;
  		console.log(this.state.keyStatus.left);
  		helpers.runQuery(2,30);

  	}
  	else if(event.key ==="d" && this.state.keyStatus.right === false && this.state.keyStatus.gas === true){
  		this.state.keyStatus.right = true;
  		console.log(this.state.keyStatus.right);
  		helpers.runQuery(1,30);

  	}
  	else if(event.key ==="w" && this.state.keyStatus.gas === false){
  		this.state.keyStatus.gas = true;
  		console.log(this.state.keyStatus.gas);
  		helpers.runQuery(1,100);
  		helpers.runQuery(2,100);

  	}
  	else if(event.key ==="s" && this.state.keyStatus.brake === false) {
  		this.state.keyStatus.brake = true;
  		console.log(this.state.keyStatus.brake);

  	}
  	

  }

  onKeyUp(event){
  	if(event.key ==="a" && this.state.keyStatus.left === true && this.state.keyStatus.gas === true){
  		this.state.keyStatus.left = false;
  		console.log(this.state.keyStatus.left);
  		helpers.runQuery(2,100);

  	}
  	else if(event.key ==="d" && this.state.keyStatus.right === true && this.state.keyStatus.gas === true){
  		this.state.keyStatus.right = false;
  		console.log(this.state.keyStatus.right);
  		helpers.runQuery(1,100);

  	}
  	else if(event.key ==="w" && this.state.keyStatus.gas === true){
  		this.state.keyStatus.gas = false;
  		console.log(this.state.keyStatus.gas);
  		helpers.runQuery(1,0);
  		helpers.runQuery(2,0);

  	}
  	else if(event.key ==="s" && this.state.keyStatus.brake === true) {
  		this.state.keyStatus.brake = false;
  		console.log(this.state.keyStatus.brake);

  	}

  }

//  <form onSubmit={this.handleSubmit}>
//             <button type="submit" className="btn btn-default" id="runSearch">Search</button>
//             </form>

	


	// Create the render function for what gets displayed on page.
	render() {

		return(
			
				<div>

					<div className="jumbotron">
					<div className="row">
			  			<div className="col-md-12">
							<h1>Welcome {this.props.params.userID}</h1>
						</div>
					</div>
			  			
			  			<div className="row">
			  				<div className="col-md-2">
			  					
            					<button type="submit" className="btn btn-primary btn-lg" id="left">{'<<<'}</button>
            					<button type="submit" className="btn btn-primary btn-lg" id="left">{'>>>'}</button>
            				</div>
            				<div className="col-md-8">
			  					<img id="camera" width="500px" height="500px" data-ip="192.168.0.150:8080" src={this.state.img_addr} />
							</div>
							<div className="col-md-2">
			  					
            					<button type="submit" className="btn btn-success btn-lg" id="left">{'GAS'}</button>
            					<button type="submit" className="btn btn-danger btn-lg" id="left">{'BRK'}</button>
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