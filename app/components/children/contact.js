"use strict";

import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	searchTerm: "",
    	startYear:"",
    	endYear:"",
    	numArticles:"5"
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
    console.log("CLICK");
    //console.log(this.state.searchTerm, this.state.numArticles);
    this.props.setAllTerm(this.state);
    this.setState({searchTerm: ""});
    this.setState({startYear: ""});
    this.setState({endYear: ""});
  }

	// Create the render function for what gets displayed on page.
	render() {

		return(
			
				<div className="container">

					<div className="jumbotron">
						<h1>Contact</h1>
					</div>
				</div>	
			
		)
	}
}
// Export the component back for use in other files
export default Search;