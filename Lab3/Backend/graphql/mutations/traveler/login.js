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

var traveler = require('../../../models/traveler');
module.exports={
	type: travelerType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(travelerInputType)
		}
	},
	async resolve(root, params) {
        console.log("In Traveler Login");
        console.log("Params recieved",params);
		var final=null;



        let user=await traveler.findOne({ emailaddress: params.data.emailaddress ,UserType:"traveler"})

            console.log("user data from db",user );
            if (user) {
                user.comparePassword(params.data.password, function(err, isMatch) {

                    if (isMatch && !err) {
                   return user
                }else {
                    
                    return new Error("Incorrect username or password");
                    
                }
                } );
            } 
    
}
}