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

var { propertySearchType, propertySearchInputType } = require('../../types/propertysearch');
var property = require('../../../models/property');

module.exports={
	type: new GraphQLList(propertySearchType),
	args: {
		username:{
			
			type:GraphQLString
		
	}},
	resolve(root, params) {
        console.log("fetch owner properties");
        console.log("Params",params.username);
		return property.find({username:params.username}).exec()
	}

}
