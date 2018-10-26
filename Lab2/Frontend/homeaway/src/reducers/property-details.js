
var oldstate={
    headline:null,
    publicinfo:null,
    propertytype:null,
    bedrooms:0,
    accomodates:0,
    bathrooms:0,
}
const PropertyDetails= (state = oldstate, action) => {

    var newState={...state};

if (action.type === "add_property_details") {
        
    let temp=JSON.stringify(action);
    temp=JSON.parse(temp);
    console.log("In property reducer (location)",temp);
    //console.log("2nd In property reducer (location)", state.formfields.address);

    newState.headline=temp.payload.headline!=undefined?temp.payload.headline:"";
    newState.publicinfo=temp.payload.publicinfo;
    newState.propertytype=temp.payload.propertytype;
    newState.bedrooms=temp.payload.bedrooms;
    newState.accomodates=temp.payload.accomodates;
    newState.bathrooms=temp.payload.bathrooms;

}
return newState;
}

export default PropertyDetails;