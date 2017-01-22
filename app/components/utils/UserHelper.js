// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";
import Crypt from "bcrypt-nodejs";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

	createUser: (user,pass) =>{
		return new Promise((resolve, reject)=>{

			//Encrypt password
			Crypt.hash(pass, null, null, function(err, hash){
				return axios.post('../api/user/createUser', {
					user: user,
					pass: hash
				}).then((response) =>{
					resolve(response.data);

				}).catch((err)=>{
					reject(err);

				});
			});
		});


	},

  	verifyLogIn: (user, pass) => {
		return axios.get('../api/user/validateUser', {
			params:{
				user: user
			}
		}).then(function (response) {

			//Decrypt password
			return new Promise((resolve, reject)=>{
				Crypt.compare(pass, response.data.pass, function(err, res) {
					if(res){
   						resolve(res);
   					}
   					else{
   						resolve(false);
   					}

				});
			});
		})	
	  	.catch(function (error) {
	    	return false;
		});
  	}






};

// We export the helpers function (which contains getGithubInfo)
export default helpers;