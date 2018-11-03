import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import rootURL from '../config.js';




class ShowTrips extends Component {
constructor(props){
  super(props);
  
  
}
  render() {
    console.log(this.props.data.imageName);
   
    return (

      <div id="card11">
    <div  className="container py-3">
    <div id="card-card1" className="card">
      <div className="row ">
        <div className="col-md-4">
          
            <img src={`${rootURL}/${this.props.data.imageName}`} className="w-100"/>

          </div>
          <div className="col-md-8 px-3">
            <div id="cb" className="card-block px-3">
              <h4 style={{paddingBottom:"20px",textAlign:"left"}} className="card-title"><label id="rtlink" id="rtlink" >{this.props.data.headline}</label></h4>
              <p id="propdetails" className="card-text"><label id="date-label1">Start Date </label><Moment format="ddd YYYY/MM/DD">{this.props.data.start}</Moment>  <label id="date-label">End Date </label><Moment format="ddd YYYY/MM/DD">{this.props.data.end}</Moment></p>
              <div className="foot12">
              
              </div>
            </div>
            <div id="down">
              <p id="curr">{this.props.data.currency} {this.props.data.rate} <label style={{fontSize:"12px"}}> per night.</label></p>
              </div>
            
          </div>
          
              
          

        </div>
      </div>
      
    </div>
    </div>
    );
  }
}

export default ShowTrips;
