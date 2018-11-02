import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
export const FETCH_PROPERTIES = "fetch_properties";
export const FETCH_PROPERTIES_ERROR = "fetch_properties_error";

function getSuccess(response) {
    return {
      type: FETCH_PROPERTIES,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: FETCH_PROPERTIES_ERROR,
      payload: response
    }
  }

function fetch_properties(start,end,location,guests){
  setAuthorizationToken(localStorage.getItem('jwtToken'));

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get('http://localhost:3001/fetchproperties',{ params:{
       
        start: start,
        end:end,
        location:location,
        guests:guests
      
    }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default fetch_properties;