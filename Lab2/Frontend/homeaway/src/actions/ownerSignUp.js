import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
export const OWNER_SIGN_UP = "owner_signup";
export const OWNER_SIGNUP_ERROR = "ownerSignUp_error";
//traveler login action
function getSuccess(response) {
    return {
      type: OWNER_SIGN_UP,
      payload: response
    }
  }


  function getError(response) {
    return {
      type: OWNER_SIGNUP_ERROR,
      payload: response
    }
  }
function owner_sign_up(values){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  console.log("Traveler data is",values);
  
  axios.post('http://localhost:3001/ownersignup',values).then(res=>{dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}

export default owner_sign_up;
