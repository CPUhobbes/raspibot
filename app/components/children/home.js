"use strict";

import React from "react";
import {Button, Col, Row, Grid, Image, Jumbotron} from "react-bootstrap";

class Saved extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				_id: ""
			};
			this.handleSubmit = this.handleSubmit.bind(this);
	}

		//On submit change id state (to be deleted)
	handleSubmit(event) {
		event.preventDefault();
		console.log("CLICK");
		//console.log(event.target.title.value, event.target.this.url.value)
		this.state._id = event.target._id.value;
		console.log(event.target._id.value);
		this.props.setDelete(this.state._id);
		this.setState({_id: ""});
	}

	render() {

		return (

			<div>
				<Grid>
					<Row>
						<Col sm={8} smOffset={2}>
							<Jumbotron>
								<h1 className="text-center">Raspi-Bot</h1>
								<Image src="/img/aboutBot.png" className="mainBot center-block" responsive />
								
								<h3 className="text-center">A web enabled video drone</h3>								
							</Jumbotron>

						</Col>
					</Row>
				</Grid>
			</div>	

		);
	}
}

// Export the component back for use in other files
export default Saved;
