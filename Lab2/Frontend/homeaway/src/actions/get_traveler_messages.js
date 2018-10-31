import axios from 'axios';
export const GET_TRAVELER_MESSAGES = "get_traveler_messages";
export const GET_TRAVELER_MESSAGES_ERROR = "get_traveler_messages_error";

function getSuccess(response) {
    return {
      type: GET_TRAVELER_MESSAGES,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: GET_TRAVELER_MESSAGES_ERROR,
      payload: response
    }
  }

function get_traveler_messages(data){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get('http://localhost:3001/gettravelermessages',{params:{emailaddress:data
}}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_traveler_messages;