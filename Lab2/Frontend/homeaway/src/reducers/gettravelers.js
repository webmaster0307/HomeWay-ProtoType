
const GetTravelers = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "get_travelers") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Fetch properties for owner",temp);
        //set token in local storage
        //localStorage.setItem("owner", temp.payload.data.token);
        //console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        newState.travelers=temp.payload.data;
        newState.message=temp.payload.data.length==0?"No bookings yet for your listing":null;
        //newState.dataavilable=temp.payload.data.length==0?"No properties have been listed":""
        // newState.property_detail=temp.payload.data;
        // newState.images=temp.payload.data.images.split('*');
       
        
    }else if (action.type === "get_travelers_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        //console.log("in book reducer error",temp.payload.response.status);
        //newState.status=temp.payload.response.status;
        //newState.message="This property is unavailable during selected dates";
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default GetTravelers;