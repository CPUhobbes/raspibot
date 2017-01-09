import React from "react";

// Import sub-components
import Index from "./children/home";
import About from "./children/about";
import Contact from "./children/contact";
import Dashboard from "./children/dashboard";
import Controls from "./children/controls";


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
		};

		//Bind this to functions
		
		this.setLoginName = this.setLoginName.bind(this);

	}

	//Check for updated states
	componentDidUpdate(prevProps, prevState) {
		
		//Check for updated search form
		// if ((prevState.searchTerm !== this.state.searchTerm) || 
		// 	(prevState.numArticles !== this.state.numArticles) ||
		// 	(prevState.startYear !== this.state.startYear) ||
		// 	(prevState.endYear !== this.state.endYear)) {
		// 	console.log("UPDATED");
		// 	//console.log("=", this.state.searchTerm, this.state.startYear, this.state.endYear, this.state.numArticles,"=");
		// 	helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then((data) => {
		// 		if (data !== this.state.results) {
		// 			var arr = [];
		// 			//console.log(data);
		// 			var numArt = this.state.numArticles;
		// 			data.forEach(function(val, index){
		// 				if(index<numArt){

		// 					//print_headline or main object maybe null/undefined, check to see which one is valid
		// 					var newTitle;
		// 					if(typeof val.headline.print_headline === "undefined"){
		// 						newTitle = val.headline.main;
		// 					}
		// 					else{
		// 						newTitle=val.headline.print_headline
		// 					}
		// 					arr.push({title:newTitle, abstract: val.snippet, url:val.web_url});
		// 				}

		// 			})
		// 			this.setState({ results: arr });
		// 		}
		// 	});
		// }

		// //Check if article needs to be added to Database
		// else if(prevState.title !== this.state.title){
		// 	helpers.saveArticle(this.state).then((data) => {
		// 		console.log(data, "added")
		// 		this.setState({
		// 		savedArticles:data
		// 	});
		// 	});

		// }

		//Check if delete article state has changed
		// if(prevState.deleteID !== this.state.deleteID){
		// helpers.deleteArticle(this.state.deleteID).then((data) => {
		// 		console.log(data, "deleted");
		// 		this.setState({
		// 		savedArticles:data
		// 	});
		// 	});
		// }

	}

	//Change save article states
	// setSaveData(data){
	// 	this.setState({
	// 		title: data.title,
	// 		abstract: data.abstract,
	// 		url: data.url
	// 	});
	// }

	//Change search states
	// setAllTerm(data) {
	// 	this.setState({
	// 		searchTerm: data.searchTerm,
	// 		numArticles: data.numArticles,
	// 		endYear:data.endYear,
	// 		startYear: data.startYear
	// 	});
	// }

	//Change deleteID state
	// setDelete(data){
	// 	this.setState({
	// 		deleteID:data
	// 	});
	// }

	//On mount get all saved articles
	// componentWillMount(){
	// 	console.log("Willmounted");
	// 	helpers.getArticles().then((data) => {
	// 		 this.setState({
	// 			savedArticles:data
	// 		});

	// 	});
	// }

	setLoginName(data) {
		console.log(data.name);
    	this.setState({
      		loginText:data.name
    	});
  	}
	

	// Create the render function for what will be displayed on page.
	render(){

		return(
			
			<div>
				<nav className="navbar navbar-default navbar-static-top">
			      	<div className="container">
			        	<div className="navbar-header">
			          		<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					            <span className="sr-only">Toggle navigation</span>
					            <span className="icon-bar"></span>
					            <span className="icon-bar"></span>
					            <span className="icon-bar"></span>
			          		</button>
			          		<a className="navbar-brand" href="#">Raspi-Bot</a>
			        	</div>
			        	<div id="navbar" className="navbar-collapse collapse">
				          	<ul className="nav navbar-nav navbar-right">
					            <li className="active menuItem"> <a href="#/">Home</a></li>
					            <li className= "menuItem"> <a href="#/about">About</a></li>
					            <li className= "menuItem"> <a href="#/contact">Contact</a></li>
					            <li className=""> <a href="#" data-toggle="modal" data-target="#loginModal">{this.state.loginText}</a></li>
					            
				          	</ul>
				        </div>
			      	</div>
			    </nav>
			    	

			     {React.cloneElement(this.props.children, {setLoginName: this.setLoginName})}
		    
			     

			    {/*MODAL HERE*/}
			    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog" role="document">
				    	<div className="modal-content">
				      		<div className="modal-header">
						        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          	<span aria-hidden="true">&times;</span>
					        	</button>
				      		</div>
				      		<div className="modal-body">
				        		LOGIN STUFF HERE
				      		</div>
				      		<div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						        <button type="button" className="btn btn-primary">Save changes</button>
				      		</div>
				    	</div>
				  	</div>
				</div>

			
			{/* -- END OF RENDER -- */}
			</div>

		)	
	}
}

// Export the component back for use in other files
export default Main;