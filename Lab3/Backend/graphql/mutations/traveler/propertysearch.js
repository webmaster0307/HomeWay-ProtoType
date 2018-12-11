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

var { propertySearchType ,propertySearchInputType} = require('../../types/propertysearch');
var property = require('../../../models/property');

module.exports={
	type: new GraphQLList(propertySearchType),
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(propertySearchInputType)
		}
	},
	resolve(root, params) {
		console.log("Params",params);
		console.log("In Property Search");
      return property.find({address: { $regex: '.*' + params.data.address + '.*' ,$options:'i'}},{multi:true}).select({'headline':1,'publicinfo':1,'propertytype':1,'bedrooms':1,'accomodates':1,'bathrooms':1,'start':1,'end':1,'currency':1,'rate':1,'nights':1,'username':1,'fileNames':1,'address':1});
        

        
        //return results;
        ;
	}
}
