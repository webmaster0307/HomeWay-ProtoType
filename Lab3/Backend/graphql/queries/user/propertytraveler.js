const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType
} = graphql;


var { travelerType, travelerInputType }= require('../../types/traveler');
var booking = require('../../../models/booking');
var traveler = require('../../../models/traveler');
module.exports={
	type: new GraphQLList(travelerType),
	args: {
		property_id:{
			
			type:GraphQLString
		
	}},
	async resolve(root, params) {
        console.log("In Fetch Travelers for properties");
        console.log("Params",params.property_id);
		var final=null;
let docs=await booking.find({property_id:params.property_id})
if(docs.length!=0){
    

    let temp=JSON.stringify(docs);
    temp=JSON.parse(temp);
    var emailaddress=[];
    for (var i=0; i<temp.length;i++){
        emailaddress.push(temp[i].traveler);
    }
    
    console.log("emailaddress",emailaddress);
    let travelers= await traveler.find({"emailaddress":{$in:emailaddress},UserType:"traveler"}).select({'firstName':1,'lastName':1})
       
    return travelers
     
    }
    
   


}
}