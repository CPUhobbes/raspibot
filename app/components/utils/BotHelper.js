// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

	moveRobot: (motorOneSpeed, motorTwoSpeed, ip) => {
		

		//const queryURL = "http://192.168.0.150:8080?motorNum=" + motorNum + "&speed="+speed;

		return axios({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url:'http://'+ip,
			data:{
				changeMotor:true,
				motorOneSpeed:motorOneSpeed,
				motorTwoSpeed:motorTwoSpeed
			},
			method: 'post',
		})
		.then((response) => {
			return response
		});

	},

	robotHorn:(ip)=>{
		return axios({

			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url:'http://'+ip,
				data:{
					changeMotor:false,
					motorOneSpeed:null,
					motorTwoSpeed:null
				},
				method: 'post',
		})
		.then((response) => {
			return response
		});



	},

	getBotIP: (serial) => {
		let queryString = '/api/getBotIP/?serial='+serial;

		return axios.get(queryString).then((response) => {
			console.log(response.data.ip);
			return response.data.ip;
		});

	},

};

// We export the helpers function
export default helpers;