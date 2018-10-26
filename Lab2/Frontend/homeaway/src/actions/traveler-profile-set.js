import axios from 'axios';
export const TRAVELER_PROFILE_SET = "set_traveler_profile";
export const TRAVELER_PROFILE_SET_ERROR = "set_traveler_profile_error";

function getSuccess(response) {
    return {
      type: TRAVELER_PROFILE_SET,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: TRAVELER_PROFILE_SET_ERROR,
      payload: response
    }
  }

function set_traveler_profile(formdata){
    for (var pair of formdata.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.post('http://localhost:3001/addprofile',formdata).then(res=>{
        console.log("Set t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default set_traveler_profile;