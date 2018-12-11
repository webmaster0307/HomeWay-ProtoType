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
const travelerType = new GraphQLObjectType({
	name: 'Traveler',
	fields: () => ({
		_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		firstName: {
			type: GraphQLString
        },
        lastName: {
			type: GraphQLString
		},
        emailaddress: {
			type: GraphQLString
		},
        password: {
			type: GraphQLString
		},
		UserType: {
			type: GraphQLString
		},
		aboutme: {
			type: GraphQLString
		},
		citycountry: {
			type: GraphQLString
		},
		company: {
			type: GraphQLString
		},
		school: {
			type: GraphQLString
		},
		hometown: {
			type: GraphQLString
		},
		languages: {
			type: GraphQLString
		},
		gender: {
			type: GraphQLString
		},username: {
			type: GraphQLString
		},
	})
})


 const travelerInputType = new GraphQLInputObjectType({
	name: 'TravelerInput',
	fields: () => ({
		firstName: {
			type: GraphQLString
        },
        lastName: {
			type: GraphQLString
		},
        emailaddress: {
			type: GraphQLString
		},
		username: {
			type: GraphQLString
		},
        password: {
			type: GraphQLString
		},
		aboutme: {
			type: GraphQLString
		},
		citycountry: {
			type: GraphQLString
		},
		company: {
			type: GraphQLString
		},
		school: {
			type: GraphQLString
		},
		hometown: {
			type: GraphQLString
		},
		languages: {
			type: GraphQLString
		},
		gender: {
			type: GraphQLString
		}
	})
})


module.exports={
    travelerType,
    travelerInputType
}