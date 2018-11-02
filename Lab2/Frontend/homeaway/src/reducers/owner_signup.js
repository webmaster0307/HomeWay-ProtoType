


const OwnerSignUpReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "owner_signup") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        newState.message=temp.payload.data;
        console.log(newState);
        
    }else if (action.type === "ownerSignUp_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        console.log("in reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        newState.message=temp.payload.response.data;

        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default OwnerSignUpReducer;