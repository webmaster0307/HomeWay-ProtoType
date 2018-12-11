


const TravelerLoginReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "traveler_login") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        console.log(newState);
        
    }else if (action.type === "traveler_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        console.log("in reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default TravelerLoginReducer;