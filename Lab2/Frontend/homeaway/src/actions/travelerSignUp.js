import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
import rootURL from '../config.js';
export const TRAVELER_SIGN_UP = "traveler_signup";
export const TRAVELER_SIGNUP_ERROR = "travelerSignUp_error";
//traveler login action
function getSuccess(response) {
    return {
      type: TRAVELER_SIGN_UP,
      payload: response
    }
  }


  function getError(response) {
    return {
      type: TRAVELER_SIGNUP_ERROR,
      payload: response
    }
  }
function traveler_sign_up(values){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  console.log("Traveler data is",values);
  
  axios.post(rootURL+"/signup",values).then(res=>{dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}

export default traveler_sign_up;
