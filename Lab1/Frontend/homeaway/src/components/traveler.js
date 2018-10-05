import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';


class Traveler extends Component {
constructor(props){
  super(props);  

 
}


  render() {
    

    
    return (
        <div style={{paddingLeft:"0px"}}>

        <div id="card11">
        <div  className="container py-3">
        <div id="card-card2" className="card">
          <div className="row ">
            <div className="col-md-3">
              
                <img id="round-image" src={`http://localhost:3001/${this.props.data.profile_image}`} className="w-100"/>
    
              </div>
              <div className="col-md-8 px-1">
                <div id="cb" className="card-block px-3">
                  <div >
                  <p id="traveler-details" className="card-text">{this.props.data.firstname}&nbsp;&nbsp; {this.props.data.lastname}</p>
                  <p id="traveler-desc">{this.props.data.citycountry} &nbsp;{this.props.data.company}</p>
                  <p id="traveler-desc">{this.props.data.aboutme}</p>

                  </div>
                </div>
                
                
              </div>
              
                  
              
    
            </div>
          </div>
          
        </div>
        </div>
       


     
    </div>
    );
  }
}

export default Traveler;
