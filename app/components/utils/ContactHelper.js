import axios from "axios";
import QS from "querystring"

// Helper Functions (in this case the only one is runQuery)
const helpers = {

	submitForm: (name, email, message) => {
		
		console.log(name,email,message);
		//const queryURL = "http://192.168.0.150:8080?motorNum=" + motorNum + "&speed="+speed;

		return axios({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url:'https://www.apparelart.com/Bootcamp/contact_me.php',
			data: QS.stringify({
				'name': name,
                'phone': "N/A",
                'email': email,
                'message': message
			}),
			method: 'POST',
		})
		.then((response) => {
			return response.status
		});

	}
}

export default helpers;