import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
import rootURL from '../config.js';

export const FETCH_DETAILS_VIEW = "fetch_detailsview";
export const FETCH_DETAILS_VIEW_ERROR = "fetch_detailsview_error";

function getSuccess(response) {
    return {
      type: FETCH_DETAILS_VIEW,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: FETCH_DETAILS_VIEW_ERROR,
      payload: response
    }
  }

function fetch_detailsview(id){
  setAuthorizationToken(localStorage.getItem('jwtToken'));

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get(rootURL+'/getlisting',{params:{property_id:id
     }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default fetch_detailsview;