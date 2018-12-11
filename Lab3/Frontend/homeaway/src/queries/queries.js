import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;
const ownerProperties = gql`
query ownerproperties($username: String){
    ownerproperties(username:$username){
        headline,
        address,
        start,
        end,
        propertytype,
        bedrooms,
        accomodates,
        bathrooms,
        currency,
        rate,
        nights,
        username,
        _id
    }
  }

`;

export { getAuthorsQuery, getBooksQuery ,ownerProperties};