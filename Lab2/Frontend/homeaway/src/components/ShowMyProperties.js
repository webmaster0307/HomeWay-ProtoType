import React, { Component } from 'react';
import { Link } from 'react-router-dom';




class ShowMyProperties extends Component {
constructor(props){
  super(props);
  // this.state  = {
    
  // }
  

  
  
}
// componentWillReceiveProps(){
//   this.setState({

//   })
// }

  render() {
    console.log(this.props.data.imageName);
    return (
<div className="row" style={{paddingLeft:"10%"}}>
<div className="col-md-8">
      <div id="card11">
    <div  className="container py-3">
    <div id="card-card1" className="card">
      <div className="row ">
        <div className="col-md-4">
          
            <img src={`http://localhost:3001/${this.props.data.imageName}`} className="w-100"/>

          </div>
          <div className="col-md-8 px-3">
            <div id="cb" className="card-block px-3">
              <h4 style={{paddingBottom:"20px",textAlign:"left"}} className="card-title"><label id="rtlink">{this.props.data.headline}</label></h4>
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
    </div>
    <div className="col-xs-0">

    </div>
    <div id="booking-button-align">
<button id="show-booking" className="btn btn-secondary"><Link to={`/fetchtravelers/${this.props.data.imageName}/${this.props.data._id}/${this.props.data.headline}/${this.props.data.propertytype}/${this.props.data.bathrooms}/${this.props.data.bedrooms}/${this.props.data.accomodates}/${this.props.data.rate}` }>Show Bookings</Link></button>

</div>
    </div>
    );
  }
}

export default ShowMyProperties;
