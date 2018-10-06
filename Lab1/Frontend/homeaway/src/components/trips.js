import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import ShowTrips from './ShowTrips';





class Trips extends Component {
    constructor() {
        super();
        this.state={
            properties:null,
            status:null,
            dataavailable:null
        }

    }

componentDidMount(){
    if(cookie.load('traveler')){
    axios.get("http://localhost:3001/mytrips",{ params: {
        username:cookie.load('traveler')
        
      }}).then(res=>{
        let temp = JSON.stringify(res.data);

        temp = JSON.parse(temp);
        this.setState({
            properties:temp,
            dataavailable:res.data.length!=0?"available":"not-available",
            status:res.status
        })
    }).catch()
    }
}

    render() {
        console.log("trips", this.state.properties);
        console.log(this.state.dataavailable);


        let details = null;
        
        if (this.state.status === 200 && this.state.properties !== null) {
            details = this.state.properties.map(property => {
                return (
                    <ShowTrips data={property}/>
                )
            })

      }
        return (


            <div className="trips">
            

            <div>
            
            <h3>My Trips</h3><br/>
{details}
            </div>







            </div>





        )
    }
}
export default Trips;
