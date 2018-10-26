var oldState={
    step:1,
    status:null,
    
    formfields:{
        address:null,
        headline:null,
        publicinfo:null,
        propertytype:null,
        bedrooms:0,
        accomodates:0,
        bathrooms:0,
        photos:[],
        start:new Date(),
        end:null,
        currency:0,
        rate:0,
        nights:0
}
}


const PostPropertyReducer = (state = oldState, action) => {
    let newState = { ...state };
    if (action.type === "post_property_to_database") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        newState.status=temp.payload.status;
        
       console.log("Property posted response recieved",temp);
       
        
    }
    else if (action.type === "post_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Step No",temp);
        newState.status=temp.payload.status;
        
    }

  
    else if (action.type === "set_page_no") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Step No",temp);
        newState.step=temp.payload;
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default PostPropertyReducer;