
var oldstate={
    start:new Date(),
        end:null,
        currency:0,
        rate:0,
        nights:0
}
const PropertyPrice= (state = oldstate, action) => {

    var newState={...state};

if (action.type === "add_property_price_date") {
        
    let temp=JSON.stringify(action);
    temp=JSON.parse(temp);
    console.log("In property reducer (price)",temp);
    //console.log("2nd In property reducer (location)", state.formfields.address);

    newState.start=temp.payload.start;
    newState.end=temp.payload.end;
    newState.currency=temp.payload.currency;
    newState.rate=temp.payload.rate;
    newState.nights=temp.payload.nights;
    

}
return newState;
}

export default PropertyPrice;