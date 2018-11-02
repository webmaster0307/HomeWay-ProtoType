import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
export const OWNER_PROFILE = "get_traveler_profile";
export const OWNER_PROFILE_ERROR = "traveler_profile_error";

function getSuccess(response) {
    return {
      type: OWNER_PROFILE,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: OWNER_PROFILE_ERROR,
      payload: response
    }
  }

function get_owner_profile(emailaddress){
  setAuthorizationToken(localStorage.getItem('jwtToken'));

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get('http://localhost:3001/getownerprofile',{ params: {
        username:emailaddress
  
    }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_owner_profile;