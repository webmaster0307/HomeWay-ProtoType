
var oldstate={
    files:[]
}
const PropertyPhotos= (state = oldstate, action) => {

    var newState={...state};

if (action.type === "add_property_photos") {
        
    // let temp=JSON.stringify(action);
    // temp=JSON.parse(temp);
    console.log("In property reducer (photos)",action);
    //console.log("2nd In property reducer (location)", state.formfields.address);
    newState.files=newState.files.concat(action.payload.photos);

}
return newState;
}

export default PropertyPhotos;