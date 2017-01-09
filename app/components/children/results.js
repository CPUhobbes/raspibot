"use strict";

import React from "react";

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            abstract: "",
            url: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //On submit, change save article state
    handleSubmit(event) {
        event.preventDefault();
        console.log("CLICK");
        //console.log(event.target.title.value, event.target.this.url.value)
        this.state.title = event.target.title.value;
        this.state.abstract = event.target.abstract.value;
        this.state.url = event.target.url.value;

        //console.log(this.state);
        this.props.setSaveData(this.state);
        this.setState({ title: "" });
        this.setState({ abstract: "" });
        this.setState({ url: "" });
    }

    render() {

        return ( <div className = "panel panel-default" >
            <div className = "panel-heading" >
            <h2 className = "panel-title text-center" > Searched Articles </h2> </div> <div className = "panel-body text-center" >

            <div> {
                this.props.results.length > 0 && this.props.results[0].title != "" &&
                this.props.results.map(function(data, i) {
                    return <div key = { i } className = 'articleContainer'>
                        <form onSubmit = { this.handleSubmit } >
                            <input type = "hidden" id = "title" defaultValue = { data.title }
                                ref = { (title) => this.title = title } /> 
                            <input type = "hidden" id = "abstract" defaultValue = { data.abstract }
                                ref = {(abstract) => this.abstract = abstract } /> 
                            <input type = "hidden" id = "url" defaultValue = { data.url } 
                                ref = {(url) => this.url = url } /> 
                            <h2>{ data.title } </h2> <p> { data.abstract } </p> <p> { data.url } </p> 
                            <p> <button type = "submit" className = "btn btn-default" id = "runSearch" > Save Article </button></p>
                        </form> </div>
                }, this)
            } </div> </div> </div>
        );
    }
}

// Export the component back for use in other files
export default Results;
