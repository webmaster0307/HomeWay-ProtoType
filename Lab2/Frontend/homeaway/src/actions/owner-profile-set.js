import axios from 'axios';
export const OWNER_PROFILE_SET = "set_traveler_profile";
export const OWNER_PROFILE_SET_ERROR = "set_traveler_profile_error";

function getSuccess(response) {
    return {
      type: OWNER_PROFILE_SET,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: OWNER_PROFILE_SET_ERROR,
      payload: response
    }
  }

function set_owner_profile(formdata){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.post('http://localhost:3001/addprofileowner',formdata).then(res=>{
        console.log("Set t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default set_owner_profile;