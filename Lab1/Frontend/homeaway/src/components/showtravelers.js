import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import Traveler from './traveler';


class ShowTravelers extends Component {
constructor(props){
  super(props);  
this.state={
    travelers:null,
    status:null
}
 
}

componentDidMount(){
    axios.get("http://localhost:3001/getpropertytravelers",{ params: {
        property_id:this.props.match.params.property_id

    }}).then(res=>{
        let temp=JSON.stringify(res.data);
        temp=JSON.parse(temp);
        this.setState({
            travelers:temp,
            status:res.status
        })
    }).catch()
}

  render() {
    console.log("Travelers",this.state.travelers);

    let details=null;
      
      if(this.state.status===200 && this.state.travelers!==null){
         details =this.state.travelers.map(user => {
            return(
                <Traveler data={user}/>
            )
        }) 
        
      }
    return (
        <div>

        <div>
            <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/"><img className="brand" src={Logo1} /></a>
                        </div>
                        <ul className="nav navbar-right">
                            <li><img src={expedia} /></li>
                        </ul>
                    </div>
                </nav>
            
            </div>

<div style={{paddingLeft:"26%"}}>
      <div id="card11">
    <div  className="container py-3">
    <div id="card-card1" className="card">
      <div className="row ">
        <div className="col-md-4">
          
            <img src={`http://localhost:3001/${this.props.match.params.imageName}`} className="w-100"/>

          </div>
          <div className="col-md-8 px-3">
            <div id="cb" className="card-block px-3">
              <h4 style={{paddingBottom:"20px",textAlign:"left"}} className="card-title"><label id="rtlink">{this.props.match.params.headline}</label></h4>
              <p id="propdetails" className="card-text">{this.props.match.params.propertytype} &#9670; {this.props.match.params.bedrooms} BR &#9670; {this.props.match.params.bathrooms} BA &#9670; Sleeps {this.props.match.params.accomodates}</p>
              <div className="foot12">
              
              </div>
              <div id="down">
              <p id="curr">USD {this.props.match.params.rate} <label style={{fontSize:"12px"}}> per night.</label></p>
              </div>
            </div>
            
          </div>
          
              
          

        </div>
      </div>
      
    </div>
    
    </div>
    

    </div>
    {details}
    </div>
    );
  }
}

export default ShowTravelers;
