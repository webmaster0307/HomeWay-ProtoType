import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
export const GET_ONWER_MESSAGES = "get_owner_messages";
export const GET_ONWER_MESSAGES_ERROR = "get_owner_messages_error";

function getSuccess(response) {
    return {
      type: GET_ONWER_MESSAGES,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: GET_ONWER_MESSAGES_ERROR,
      payload: response
    }
  }

function get_owner_messages(data){
  setAuthorizationToken(localStorage.getItem('jwtToken'));

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get('http://localhost:3001/getownermessages',{params:{owner:data
}}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_owner_messages;