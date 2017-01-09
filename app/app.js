"use strict";

// Include the Main React Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

// Include the Main Component
const routes = require("./config/routes");

// This code here allows us to render our main component
ReactDOM.render(routes, document.getElementById('app'));