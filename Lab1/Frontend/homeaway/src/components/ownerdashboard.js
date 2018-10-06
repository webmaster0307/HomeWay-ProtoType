import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import ShowMyProperties from './ShowMyProperties';





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
    axios.get("http://localhost:3001/ownerproperties",{ params: {
        username:cookie.load('owner')
        
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
                    <ShowMyProperties data={property}/>
                )
            })

      }
        return (


            <div className="trips">
            

            <div>
            
            <h3>My properties</h3><br/>
{details}
            </div>







            </div>





        )
    }
}
export default OwnerDashboard;
