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
		console.log("Username",params.data.username)
		params.data.UserType='traveler'
		const uModel = new traveler();
        const newUser=traveler.findOneAndUpdate({emailaddress:params.data.username,UserType:"traveler"},{$set:{firstName:params.data.firstName,lastName:params.data.lastName,aboutme:params.data.aboutme,citycountry:params.data.citycountry,company:params.data.company,school:params.data.school,hometown:params.data.hometown,languages:params.data.languages,gender:params.data.gender}},{new:true})

		if (!newUser) {
			throw new Error('Error adding user');
		}
		console.log("Saved User",newUser);
		return newUser
	}
}
