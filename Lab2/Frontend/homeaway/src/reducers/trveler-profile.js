let oldstate={
    firstname:"",
      lastname:"",
      aboutme:"",
      citycountry:"",
      company:"",
      school:"",
      hometown:"",
      languagues:"",
      gender:"",
      photo:"",
      display:"",
      status:null
}

const TravelerProfileReducer = (state = oldstate, action) => {
    let newState = { ...state };
    if (action.type === "get_traveler_profile") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        //set authentication token
        console.log("Traveler profile recieved",temp);
        newState.firstname=temp.payload.data.firstname;
        newState.lastname=temp.payload.data.lastname;
        newState.aboutme=temp.payload.data.aboutme!=undefined?temp.payload.data.aboutme:"";
        newState.citycountry=temp.payload.data.citycountry!=undefined?temp.payload.data.citycountry:"";
        newState.company=temp.payload.data.company!=undefined?temp.payload.data.company:"";
        newState.school=temp.payload.data.school!=undefined?temp.payload.data.school:"";
        newState.gender=temp.payload.data.gender!=undefined?temp.payload.data.gender:"";
        newState.hometown=temp.payload.data.hometown!=undefined?temp.payload.data.hometown:"";
        newState.languages=temp.payload.data.languages!=undefined?temp.payload.data.languages:"";
        if(temp.payload.data.photo){
            newState.imagePreview = 'data:image/jpg;base64, ' + temp.payload.data.photo;
            }
        newState.status=temp.payload.status;
        // console.log("in reducer",temp.payload.status);
        // newState.status=temp.payload.status;
        // console.log(newState);
        
    }else if (action.type === "traveler_profile_error") {
        
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

export default TravelerProfileReducer;