"use strict";

import React from "react";
import ReactDOM from "react-dom";

import {Jumbotron, Grid, Row, Col, Image, Form, Button, FormGroup, FormControl} from "react-bootstrap";

import {hashHistory} from "react-router";

import UserHelper from ".././utils/UserHelper";

class Dashboard extends React.Component {
	constructor(props) {
	super(props);

	this.state = {
		robotList:[],
		newBot:"",
		user:""
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.generateBotList = this.generateBotList.bind(this);
	this.runBot = this.runBot.bind(this);
	}

	componentWillMount(){
		//Get ID from url
		//this.props.params.userID
		let userName = this.props.getUserData().user;
		if(typeof userName !== "undefined")
			this.setState({user:this.props.getUserData().user});

		let botList = this.props.getUserData().bots;
		if(typeof botList !== "undefined")
			this.setState({robotList:botList});

	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.user !== this.props.getUserData().user){
			this.setState({user:this.props.getUserData().user});

		let botList = this.props.getUserData().bots;
		if(typeof botList !== "undefined")
			this.setState({robotList:botList});
		}

	}

	handleChange(event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		let newState = {robotList:this.state.robotList.push(this.state.newBot)};
		this.setState({newState});
		UserHelper.addBot(this.state.user, this.state.newBot);
		ReactDOM.findDOMNode(this.refs.newBot).value ='';
		this.setState({newBot:""});

	}

	runBot(id){
		hashHistory.push("/user/"+this.state.user+'/'+id);
	}

	deleteBot(id){ 
		UserHelper.deleteBot(this.state.user, id);
		let list = this.state.robotList;
		let robotPos = list.indexOf(id);

		if(robotPos!= -1){
			list.splice(robotPos, 1)
		}
		this.setState({robotList:list});
	}

	generateBotList(){
		let data=[];
		let rows = Math.ceil(this.state.robotList.length/5);
		for(let i=0;i<rows;++i){

			let botBlock = this.state.robotList.slice(i*5, i*5+5);

			data.push(<Row key={i}>{botBlock.map(function(val, index){
				if(index===0){
					return (<Col key={index} sm={2} smOffset={1}>
									<Image src="/img/bot.png" className="botImg" responsive onClick={()=>this.runBot(val)} />
									<h3>{val}</h3>
									<Button bsStyle="danger" onClick={()=> this.deleteBot(val)}>Delete Bot</Button>
									

								</Col>)
				}
				else{
					return (<Col key={index} sm={2}>
									<Image src="/img/bot.png" className="botImg" responsive onClick={()=>this.runBot(val)} />
									<h3>{val}</h3>
									<Button bsStyle="danger" onClick={()=> this.deleteBot(val)}>Delete Bot</Button>
								</Col>)

				}
			}, this)}</Row>);
		}
		return data;
	}

	generateDashboard(){
		if(this.props.getLogInStatus()){						
			return(<div>
				<h2 className="dashboardHeader">Welcome {this.state.user}</h2>
				<p className="lineBreak"><br /></p>	
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<h2 className="dashText">Your Raspi-Bots</h2>
						</Col>
					</Row>
					{this.generateBotList()}
					
					<Row>

						<Col sm={10} smOffset={1}>
						<p className="miniLineBreak"><br /></p>	
							<h3 className="addDashText">Add A Raspi-Bot</h3>
						</Col>
					</Row>
					<Row>
						<Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
						<Col sm={3} smOffset={1}>
				        	<FormControl type="text" id="newBot" placeholder="Serial #" ref="newBot" />
						</Col>
						<Col sm={1}>
							<Button bsStyle="success" type="submit">Add Raspi-Bot!</Button>
						</Col>

						</Form>
					</Row>

				</Grid>
			</div>);
		}
		else{

			return (<div>
			<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<h2 className="text-center">You are no longer logged in!</h2>
							<p><br /></p>
						</Col>
					</Row>
					<Row>
						<Col sm={10} smOffset={1} className="text-center">
							<Button onClick={this.props.triggerModal} bsStyle="primary">Click here to Log In</Button>
						</Col>
					</Row>
			</Grid>
			</div>);
		}

	}



	// Create the render function for what gets displayed on page.
	render() {

		return(
			
			<div>
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<Jumbotron>
							{this.generateDashboard()}
							</Jumbotron>

						</Col>
					</Row>
				</Grid>
			</div>	
			
		)
	}
}
// Export the component back for use in other files
export default Dashboard;