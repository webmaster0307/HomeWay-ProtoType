import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
export const BOOK_PROPERTY = "book_new_property";
export const BOOK_PROPERTY_ERROR = "book_property_error";

function getSuccess(response) {
    return {
      type: BOOK_PROPERTY,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: BOOK_PROPERTY_ERROR,
      payload: response
    }
  }

function book_property(data){
  setAuthorizationToken(localStorage.getItem('jwtToken'));

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.post('http://localhost:3001/bookproperty',data).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default book_property;