import axios from 'axios';
export const GET_OWNER_PROPERTIES = "get_owner_properties";
export const GET_OWNER_PROPERTIES_ERROR = "get_owner_properties_error";

function getSuccess(response) {
    return {
      type: GET_OWNER_PROPERTIES,
      payload: response
    }
  }
function getError(response) {
    return {
      type: GET_OWNER_PROPERTIES_ERROR,
      payload: response
    }
  }

function get_owner_properties(emailaddress){
console.log("action called");
    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get("http://localhost:3001/ownerproperties",{ params: {
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
export default get_owner_properties;