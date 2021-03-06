import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
import rootURL from '../config.js';
export const TRAVELER_PROFILE = "get_traveler_profile";
export const TRAVELER_PROFILE_ERROR = "traveler_profile_error";

function getSuccess(response) {
    return {
      type: TRAVELER_PROFILE,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: TRAVELER_PROFILE_ERROR,
      payload: response
    }
  }

function get_traveler_profile(emailaddress){
  setAuthorizationToken(localStorage.getItem('jwtToken'));
    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get(rootURL+'/gettravelerprofile',{ params: {
        emailaddress:emailaddress
  
    }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_traveler_profile;