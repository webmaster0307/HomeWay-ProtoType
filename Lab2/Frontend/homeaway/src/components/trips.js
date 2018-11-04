import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import { connect } from "react-redux";
import fetch_mytrips from '../actions/mytrips.js';
import cookie from 'react-cookies';
import ShowTrips from './ShowTrips';
import jwt from 'jsonwebtoken';
import {paginate} from '../paginate'
import Pagination1 from './paji.js'



class Trips extends Component {
    constructor() {
        super();
        this.state={
            properties:null,
            status:null,
            dataavailable:null,
            currentPage:1
        }

    }

    handlePageChange= page =>{
        this.setState({currentPage : page });
        }
componentWillReceiveProps(nextProps){
    this.setState({
        properties:nextProps.properties,
        status:nextProps.status,
        dataavailable:nextProps.properties.length!=0?null:"You have no completed or upcomming trips"
    })
}
componentWillMount(){

    let token=jwt.decode(localStorage.getItem('jwtToken'));
    // if(cookie.load('traveler')){
    // axios.get("http://localhost:3001/mytrips",{ params: {
    //     username:cookie.load('traveler')
        
    //   }}).then(res=>{
    //     let temp = JSON.stringify(res.data);

    //     temp = JSON.parse(temp);
    //     //console.log("len",temp.length);
    //     this.setState({
    //         properties:temp,
    //         dataavailable:temp.length!=0?null:"You have no completed or upcomming trips",
    //         status:res.status
    //     })
    // }).catch()
    // }
    if(token && token.UserType=="traveler"){
        this.props.fetch_mytrips(token.emailaddress);
    }
}

    render() {
        //console.log("trips", this.state.properties);
       // console.log(this.state.dataavailable);
       let len=this.state.properties?this.state.properties.length:0;
       const finalproperties= paginate(this.state.properties, this.state.currentPage, 3)

        let details = null;
        
        if (this.state.status === 200 && this.state.properties !== null) {
            details = finalproperties.map(property => {
                return (
                    <ShowTrips key={Math.random()} data={property}/>
                )
            })

      }
        return (


            <div className="trips">
            <div style={{paddingLeft:"70%",paddingTop:"2%"}}>
            <Pagination1
pageSize={3}
itemsCount = {len}
currentPage = {this.state.currentPage}
onPageChange = {this.handlePageChange}/>
            </div>

            <div>
            
            <h3>My Trips</h3><br/>
{details}
<h4></h4>
            </div>







            </div>





        )
    }
}
function mapStateToProps(state) {
    console.log("in map state traveler_propfile",state);
    return { status: state.fetch_trips.status,
        properties:state.fetch_trips.properties
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        fetch_mytrips: (emailaddress) => dispatch(fetch_mytrips(emailaddress)),

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Trips);
  
