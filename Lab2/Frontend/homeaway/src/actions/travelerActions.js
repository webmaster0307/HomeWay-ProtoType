import axios from 'axios';
import cookie from 'react-cookies'
import  setAuthorizationToken from '../utils/setAuthorizationToken'
import rootURL from '../config.js';
export const TRAVELER_LOGIN = "traveler_login";
export const TRAVELER_ERROR = "traveler_error";
//traveler login action
function getSuccess(response) {
    return {
      type: TRAVELER_LOGIN,
      payload: response
    }
  }


  function getError(response) {
    return {
      type: TRAVELER_ERROR,
      payload: response
    }
  }
function traveler_login(values,callback){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  console.log("Traveler cre",values);
  
  axios.post(rootURL+'/travelerlogin',values,{withCredentials: true}).then(res=>{
  
    if(res.data.token){
    const token = res.data.token ; 
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token) ;
		

  dispatch(
    getSuccess(res)
  )

    }
}).catch(error=>{
    console.log(error);
      dispatch(getError(error))
  })
}


}

export default traveler_login;
