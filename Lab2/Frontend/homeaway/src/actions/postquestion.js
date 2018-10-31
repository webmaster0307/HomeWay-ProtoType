import axios from 'axios';
export const POST_QUESTION = "post_question";
export const POST_QUESTION_ERROR = "post_question_error";

function getSuccess(response) {
    return {
      type: POST_QUESTION,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: POST_QUESTION_ERROR,
      payload: response
    }
  }

function post_question(data){

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.post('http://localhost:3001/postquestion',data).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default post_question;