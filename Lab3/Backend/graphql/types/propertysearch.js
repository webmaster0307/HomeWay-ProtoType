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
const propertySearchType = new GraphQLObjectType({
	name: 'PropertySearch',
	fields: () => ({
        _id: {
			type: GraphQLString
		},
		address:{
            type:GraphQLString
        },
        headline:{
            type:GraphQLString
        },
        publicinfo:{
            type:GraphQLString
        },
        propertytype:{
            type:GraphQLString
        },
        bedrooms:{
            type:GraphQLString
        },
        accomodates:{
            type:GraphQLString
        },
        bathrooms:{
            type:GraphQLString
        },
        
        start:{
            type:GraphQLString
        },
        end:{
            type:GraphQLString
        },
        currency:{
            type:GraphQLString
        },
        rate:{
            type:GraphQLString
        },
        nights:{
            type:GraphQLString
        },username:{
            type:GraphQLString
        },fileNames:{
            type:GraphQLString
        }
	})
})


 const propertySearchInputType = new GraphQLInputObjectType({
	name: 'PropertySearchInput',
	fields: () => ({
        _id: {
			type: GraphQLString
		},
        _id:{
            type:GraphQLString
        },
        headline:{
            type:GraphQLString
        },
        publicinfo:{
            type:GraphQLString
        },
        propertytype:{
            type:GraphQLString
        },
        bedrooms:{
            type:GraphQLString
        },
        accomodates:{
            type:GraphQLString
        },
        bathrooms:{
            type:GraphQLString
        },
        
        start:{
            type:GraphQLString
        },
        end:{
            type:GraphQLString
        },
        currency:{
            type:GraphQLString
        },
        rate:{
            type:GraphQLString
        },
        nights:{
            type:GraphQLString
        },username:{
            type:GraphQLString
        },fileNames:{
            type:GraphQLString
        }
	})
})


module.exports={
    propertySearchType,
    propertySearchInputType
}