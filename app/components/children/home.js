"use strict";

import React from "react";

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
				<div className="container">

					<div className="jumbotron">
						<h1>Home</h1>
					</div>
				</div>
		);
	}
}

// Export the component back for use in other files
export default Saved;
