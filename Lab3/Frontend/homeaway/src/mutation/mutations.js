
import { gql } from 'apollo-boost';

const addBookMutation = gql`
    mutation AddBook($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const travelerSignUp = gql`
    mutation travelerSignUp($firstName: String, $lastName: String, $emailaddress: String, $password: String){
        travelerSignUp(data:{firstName: $firstName, lastName: $lastName, emailaddress: $emailaddress,password: $password}){
            firstName,
            emailaddress
        }
    }
`;

const updateTravelerProfile = gql`
    mutation travelerProfileUpdate($firstName: String, $lastName: String,$emailaddress: String,$aboutme: String,$citycountry: String,$company: String,$school: String,$hometown: String,$languages: String,$gender: String,$username: String  ){
        travelerProfileUpdate(data:{firstName: $firstName, lastName: $lastName, emailaddress: $emailaddress,aboutme: $aboutme,citycountry: $citycountry,company: $company,school: $school,hometown: $hometown,languages: $languages,gender: $gender,username:$username}){
            firstName,
             lastName,
        }
    }
`;


const fetchproperties = gql`
mutation propertySearch($address:String){
    propertySearch(data:{address:$address}){
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
     

    }
  }
`;


const travelerLogin = gql`
    mutation login($emailaddress: String, $password: String){
        login(data:{ emailaddress: $emailaddress,password: $password}){
            
            emailaddress
        }
    }
`;
// const bookproperty = gql`
// mutation booking($property_id:String,$start:String,$end:String,$guests:String,$traveler:String){
//     booking(data:{property_id:$property_id,start:$start,end:$end,guests:$guests,traveler:$traveler}){
//      start
     

//     }
//   }
// `;


const book = gql`
    mutation booking($property_id:String,$start:String,$end:String,$guests:String,$traveler:String){
        booking(data:{property_id:$property_id,start:$start,end:$end,guests:$guests,traveler:$traveler}){
            firstName,
            emailaddress
        }
    }
`;


export {addBookMutation,travelerSignUp, updateTravelerProfile,fetchproperties , book, travelerLogin};