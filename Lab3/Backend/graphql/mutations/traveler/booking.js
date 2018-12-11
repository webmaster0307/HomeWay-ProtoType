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

var { bookingType ,bookingTypeInputType} = require('../../types/booking');
var booking = require('../../../models/booking');

module.exports={
	type: bookingType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(bookingTypeInputType)
		}
	},
	resolve(root, params) {
        console.log("Params recieved",params);
		params.data.owner="ug@gmail.com"
		
		console.log("In book property");
		const uModel = new booking(params.data);
		const bk = uModel.save();
        if (!bk) {
			throw new Error('Error adding user');
		}
		return bk
        

        
        //return results;
        ;
	}
}
