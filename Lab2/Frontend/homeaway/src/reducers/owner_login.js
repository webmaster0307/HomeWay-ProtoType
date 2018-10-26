


const OwnerLoginReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "owner_login") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);

        //set token in local storage
        //localStorage.setItem("owner", temp.payload.data.token);
        console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        let emailaddress=temp.payload.data.username;
        newState.emailaddress=emailaddress;
        console.log("Owner",newState);
        
    }else if (action.type === "owner_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        console.log("in owner reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default OwnerLoginReducer;