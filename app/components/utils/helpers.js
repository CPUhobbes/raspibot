// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

  moveRobot: (motorOneSpeed, motorTwoSpeed, direction, ip) => {
	

	//const queryURL = "http://192.168.0.150:8080?motorNum=" + motorNum + "&speed="+speed;

	return axios({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		url:'http://'+ip,
		data:{
			motorOneSpeed:motorOneSpeed,
			motorTwoSpeed:motorTwoSpeed,
			direction: direction
		},
		method: 'post',
	})
	.then((response) => {
		return response
	});

  },

  getBotIP: (serial) => {
	let queryString = '/api/getBotID/?serial='+serial;

	return axios.get(queryString).then((response) => {
		console.log(response.data.ip);
		return response.data.ip;
	});

  }




};

// We export the helpers function (which contains getGithubInfo)
export default helpers;