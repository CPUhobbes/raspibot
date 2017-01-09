"use strict";

// Inclue the React library
const React = require("react");

// Include the react-router module
const router = require("react-router");

// Include the Route component for displaying individual routes
const Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
const Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
const hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
const IndexRoute = router.IndexRoute;

// Reference the high-level components
import Main from "../components/main";
import Home from "../components/children/home";
import About from "../components/children/about";
import Contact from "../components/children/contact";
import Dashboard from "../components/children/dashboard";
import Controls from "../components/children/controls";

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>

    <Route path="/" component={Main}>
    	<IndexRoute component={Home} />
   
   	<Route path='/user/:userID' component={Dashboard} />

    <Route path='/about' component={About} />
    
    <Route path='/contact' component={Contact} />

    <Route path='/user/:userID/:botID' component={Controls} />
    
    
    </Route>
  </Router>
);