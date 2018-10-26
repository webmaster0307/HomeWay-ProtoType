
const TravelerProfileReducerSet = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "set_traveler_profile") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        //set authentication token
        console.log("Traveler profile set ",temp);
       
        newState.status=temp.payload.status;
        // console.log("in reducer",temp.payload.status);
        // newState.status=temp.payload.status;
        // console.log(newState);
        
    }else if (action.type === "set_traveler_profile_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("traveler temp error",temp);
        console.log("in reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default TravelerProfileReducerSet;