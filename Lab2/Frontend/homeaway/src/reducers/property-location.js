
var oldstate={
    address:""
}
const PropertyLocation = (state = oldstate, action) => {

    var newState={...state};

if (action.type === "add_property_location") {
        
    let temp=JSON.stringify(action);
    temp=JSON.parse(temp);
    console.log("In property reducer (location)",temp);
    //console.log("2nd In property reducer (location)", state.formfields.address);
    if(temp.payload.address){
    newState.address=temp.payload.address;
    }
    
}
return newState;
}

export default PropertyLocation;