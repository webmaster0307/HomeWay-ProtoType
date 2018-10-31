


const GetOwnerMessages = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "get_owner_messages") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Fetch messages",temp);
        //set token in local storage
        //localStorage.setItem("owner", temp.payload.data.token);
        //console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        newState.messages=temp.payload.data
       
        
    }else if (action.type === "get_owner_messages_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        console.log("in owner reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        newState.messages="";
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default GetOwnerMessages;