import axios from 'axios';
//import cookie from 'react-cookies'
import  setAuthorizationToken from '../utils/setAuthorizationToken'

export const OWNER_LOGIN = "owner_login";
export const OWNER_ERROR = "owner_error";
//traveler login action
function getSuccess(response) {
    return {
      type: OWNER_LOGIN,
      payload: response
    }
  }


  function getError(response) {
    return {
      type: OWNER_ERROR,
      payload: response
    }
  }
function owner_login(values){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  console.log("Owner cre",values);
  
  axios.post('http://localhost:3001/ownerlogin',values,{withCredentials: true}).then(res=>{
    
    if(res.data.token){
      console.log("token recieved by owner",res.data.token);
      const token = res.data.token ; 
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token) ;
  
  dispatch(
    getSuccess(res)
  )
}}).catch(error=>{
      dispatch(getError(error))
  })
}


}

export default owner_login;
