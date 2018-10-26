import axios from 'axios';
export const GET_TRAVELERS = "get_travelers";
export const GET_TRAVELERS_ERROR = "get_travelers_error";

function getSuccess(response) {
    return {
      type: GET_TRAVELERS,
      payload: response
    }
  }
function getError(response) {
    return {
      type: GET_TRAVELERS_ERROR,
      payload: response
    }
  }

function get_travelers(property_id){
console.log("action called");
    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get("http://localhost:3001/getpropertytravelers",{ params: {
        property_id:property_id

    }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_travelers;