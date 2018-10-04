import React, { Component } from 'react';
import { Link } from 'react-router-dom';




class Listing extends Component {
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
          
            <img src={`http://localhost:3001/${this.props.data.imageName}`} className="w-100"/>

          </div>
          <div className="col-md-8 px-3">
            <div id="cb" className="card-block px-3">
              <h4 style={{paddingBottom:"20px",textAlign:"left"}} className="card-title"><Link id="rtlink" to={`/detailsview/${this.props.data.property_id}/${this.props.search.start}/${this.props.search.end}/${this.props.search.guests}` }>{this.props.data.headline}</Link></h4>
              <p id="propdetails" className="card-text">{this.props.data.propertytype} &#9670; {this.props.data.bedrooms} BR &#9670; {this.props.data.bathrooms} BA &#9670; Sleeps {this.props.data.accomodates}</p>
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

export default Listing;
