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
const bookingType = new GraphQLObjectType({
	name: 'BookingType',
	fields: () => ({
        start : {
            type : GraphQLString
        },
        end : {
            type : GraphQLString
        },
        guests :{
            type : GraphQLString
        },
        owner:{
            type:GraphQLString
        },
        traveler:{
            type:GraphQLString
        },
        property_id:{
            type:GraphQLString
        }
	})
})


 const bookingTypeInputType = new GraphQLInputObjectType({
	name: 'BookingTypeInput',
	fields: () => ({
        start : {
            type : GraphQLString
        },
        end : {
            type : GraphQLString
        },
        guests :{
            type : GraphQLString
        },
        owner:{
            type:GraphQLString
        },
        traveler:{
            type:GraphQLString
        },
        property_id:{
            type:GraphQLString
        }	
    })
})


module.exports={
    bookingType,
    bookingTypeInputType
}