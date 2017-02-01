"use strict";

import React from "react";
import {Button, Col, Row, Grid, Image, Jumbotron} from "react-bootstrap";

class Search extends React.Component {
  	constructor(props) {
		super(props);

		this.state = {};
  	}

	// Create the render function for what gets displayed on page.
	render() {

		return(
			
				<div>
				<Grid>
					<Row>
						<Col sm={10} smOffset={1}>
							<Jumbotron>
								<Image src="/img/text/about.png" className="pagesLogo" responsive />
								<div className="lineBreak"></div>
								<div className="clear">
									<Image src="/img/text/summary.png" className="smallAboutText" responsive />
									<div className="smallAboutBreak"></div>
									<h4><Image src="/img/aboutBot.png" className="piImg" responsive />The Raspi-Bot web driven drone that is based on the Raspberry Pi platform.  The drone is controlled by a web interface using Node,js, React.js and MongoDB that communicates 
										with a Python based web server running on the Raspberry Pi. 
									</h4>
									<br /><br />
								</div>
								<div className="clear">
									<Image src="/img/text/hardware.png" className="smallAboutText" responsive />
									<div className="smallAboutBreak"></div>
									<h4><Image src="/img/pi.png" className="piImg" responsive />Raspi-Bot is based on the Raspberry Pi platform.  
										Using the GPIO pins provided, the 2 motors are driven by two PWM LD293 chips.  Moving the Raspi-Bot without being able to see 
										can be an issue.  The Raspi-Bot uses its native camera to stream the video directly to the user's control screen.  To make sure 
										no one gets in your way, the Raspi-Bot is equiped with a fully function horn that is driven by a MAX98306 amplifier board.  To supply the correct amount of power,
										Raspi-Bot uses a 11.2V lithium battery with a 5V voltage regulator for the Raspberry Pi and a 2 6V voltage regulators for the motors.
									</h4>
									<br />
								</div>
								<div className="clear">
									<Image src="/img/text/software.png" className="smallAboutText" responsive />
									<div className="smallAboutBreak"></div>
									<h4><Image src="/img/react.png" className="piImg" responsive />The Raspi-Bot itself runs Raspian (a version of Linux).  Running in the background
										is a simple Python based webserver that receives all commands from the web interface, streams the video, controls the motors using the rpi.gpio package, and creates 
										the sound using pygame.  In order to identify itself, the Raspi-Bot will update its IP address in the database so the web interface can connect.</h4>
									<h4>
										The web interface is driven by a Node.js/Express server using a MVC structure.  On the front end React.js, React-Router, and React-Bootstrap was used.
										It is in a SPA format that allows the user to log in, add new Raspi-Bots, and control them from their browser.  To control the bot, the application
										captures keyboard inputs and based on the inputs, sends a POST request to the user's Raspi-Bot. All user and Raspi-Bot 
										information is stored in a MongoDB database.  The user's password is encrypted using BCrypt.
									</h4>
								</div>							
							</Jumbotron>

						</Col>
					</Row>
				</Grid>
			</div>	
			
		)
	}
}
// Export the component back for use in other files
export default Search;