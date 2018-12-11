const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

var { travelerType, travelerInputType }= require('../../types/traveler');
var traveler = require('../../../models/traveler');

module.exports= {
	type: travelerType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(travelerInputType)
		}
	},
	resolve(root, params) {
		console.log("Data in mutation",params.data);
		params.data.UserType='traveler'
		const uModel = new traveler(params.data);
		const newUser = uModel.save();
		console.log("Duplicate Traveler");
		if (!newUser) {
			throw new Error('Error adding user');
		}
		return newUser
	}
}
