


const FetchDetailsView = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "fetch_detailsview") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Fetch details view",temp);
        //set token in local storage
        //localStorage.setItem("owner", temp.payload.data.token);
        //console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        newState.property_detail=temp.payload.data;
        newState.images=temp.payload.data.images.split('*');
       
        
    }else if (action.type === "fetch_detailsview_error") {
        
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

export default FetchDetailsView;