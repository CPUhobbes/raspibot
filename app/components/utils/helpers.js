// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

  runQuery: (motorNum, speed) => {
  	

    //const queryURL = "http://192.168.0.150:8080?motorNum=" + motorNum + "&speed="+speed;

    return axios({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url:'http://192.168.0.150:8080',
      data:{
        motorNum:motorNum,
        speed:speed
      },
      method: 'post',      

    }
        




      ).then((response) => {

      //console.log(response.data.response.docs);
      return response
    });

  }


};

// We export the helpers function (which contains getGithubInfo)
export default helpers;