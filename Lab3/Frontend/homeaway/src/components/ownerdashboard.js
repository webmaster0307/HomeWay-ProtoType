import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import ShowMyProperties from './ShowMyProperties';
import { graphql, compose, withApollo } from 'react-apollo';
import { Query } from "react-apollo";
import { addBookMutation ,travelerSignUp} from '../mutation/mutations';
import { getAuthorsQuery, getBooksQuery , ownerProperties } from '../queries/queries';




class OwnerDashboard extends Component {
    constructor() {
        super();
        this.state={
            properties:null,
            status:null,
            dataavailable:null
        }

    }

componentDidMount(){
    if(cookie.load('owner')){
//         <Query query={ownerProperties} variables={{ userrname:cookie.load('owner')}}>
//     {({ loading, error, data }) => {
//       if (loading) return null;
//       if (error) {
//           console.log("eeee",error)
//           return `Error!: ${error}`};

//       console.log("ownerproperties",data);
//     }}
//   </Query>


    this.props.client.query({
        query:ownerProperties,
        variables:{
            username:cookie.load('owner')
        }
    }).then(res=>{
        console.log("owner Properties",res);
        this.setState({
            properties:res.data.ownerproperties,
            status:200
        })
    }).catch(e=>{
        console.log("error",e);
        this.setState({
            status:400
        })
    })
    // axios.get("http://localhost:3001/ownerproperties",{ params: {
    //     username:cookie.load('owner')
        
    //   }}).then(res=>{
    //     let temp = JSON.stringify(res.data);

    //     temp = JSON.parse(temp);
        
    //     this.setState({
    //         properties:temp,
    //         dataavailable:res.data.length!=0?null:"You have no properties posted.",
    //         status:res.status
    //     })
    // }).catch()
    // }
}
}
    render() {
        console.log("trips", this.state.properties);
        console.log(this.state.dataavailable);
        let details = null;
        
        if (this.state.status === 200 && this.state.properties !== null) {
            details = this.state.properties.map(property => {
                return (
                    <ShowMyProperties key={Math.random}data={property}/>
                )
            })

      }
        return (


            <div className="trips">
            

            <div>
            
            <h3>My properties</h3><br/>
{details}
<h4>{this.state.dataavailable}</h4>
            </div>







            </div>





        )
    }
}
export default withApollo(OwnerDashboard);