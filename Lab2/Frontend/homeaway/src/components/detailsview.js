import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../src/CSS/detailsview.css';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import bed from '../../src/bed.png';
import home from '../../src/home.png';
import team from '../../src/team.png';
import bathtub from '../../src/bathtub.png';
import toilet from '../../src/toilet.png';
import night from '../../src/night.png';
import fetch_detailsview from '../actions/fetchdetailsview.js';

import book_property from '../actions/bookproperty.js';
import { connect } from "react-redux";
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken' ;



class DetailsView extends Component {
constructor(props){
  super(props);
  this.state={
      property_id:this.props.match.params.propid,
      property_detail:{},
      status:null,
      images:null,
      start:this.props.match.params.start,
      end:this.props.match.params.end,
      guests:this.props.match.params.guests,
      loginstatus:"loggedin",
      bookingstatus:null

  }
  this.setStart=this.setStart.bind(this);
  this.setEnd=this.setEnd.bind(this);
  this.setGuests=this.setGuests.bind(this);
  this.bookthisproperty=this.bookthisproperty.bind(this);

  
}

componentWillReceiveProps(nextProps){
    this.setState({
        property_detail:nextProps.property_detail,
        bookingstatus:nextProps.message
    })
}
bookthisproperty(e){

    let token=jwt.decode(localStorage.getItem('jwtToken'))

    e.preventDefault();
    if(!token){
        this.setState({
            loginstatus:null
        })
         return;
    }
    if(token.UserType!='traveler'){
        this.setState({
            loginstatus:null
        })
        return;
    }
    if(this.state.start > this.state.end){
        this.setState({
            bookingstatus:"Start date should be before end date"
        })
        return;
    }
    this.setState({
        loginstatus:"loggedin"
    })
    var data={property_id:this.state.property_id,
    start:this.state.start,
    end:this.state.end,
    guests:this.state.guests,
    username:this.state.property_detail.username,
    property_start:this.state.property_detail.start,
    property_end:this.state.property_detail.end,
    traveler:token.emailaddress
    }
console.log("in booking");
    // axios.post('http://localhost:3001/bookproperty',data)
    // .then(res=>{
        
    //     if(res.status==200){
    //         this.setState({
    //             bookingstatus:"This property has been successfully booked."
    //         })
    //     }else if(res.status==201){
    //         this.setState({
    //             bookingstatus:"This property is already booked for your search criteria"
    //         })
    //     }
    //     else{
    //         this.setState({
    //             bookingstatus:"This property is unavailable during selected dates"
    //         })
    //     }
    // })

    this.props.book_property(data);
    


}

setStart(e){
this.setState({
    start:e.target.value
})
}

setEnd(e){
    this.setState({
        end:e.target.value
    })
    }


    setGuests(e){
        this.setState({
            guests:e.target.value
        })
        }
componentWillMount(){
    console.log("cbcbc",this.state.property_id);
    // axios.get('http://localhost:3001/getlisting',{params:{property_id:this.state.property_id
    //   }})
    // .then(res=>{
    //     if(res.status===200){
    //         console.log(res.data);
            
            
    //         this.setState({
    //             status:res.status,
    //             property_detail:res.data,
    //             images:res.data.images.split('*')
    //         })
            
    //     }
    // }).catch(res=>{
    //     this.setState({
    //         status:400
    //     })
    // })

this.props.fetch_detailsview(this.state.property_id);

}

  render() {
      
      console.log("s",this.props.property_detail);
      //var {address}=this.state.property_detail;
      var loginmessage=null;
      loginmessage=this.state.loginstatus==null?"Traveler please login to continue with booking":null;
      let details=<div></div>;
     var imgs=this.props.images;
      //var im=this.state.property_detail.images;
     
      //var imgs=this.state.property_detail.images.split('*');
      
      
      if(this.props.status===200 && imgs!=null){
        //var flag = false;
         details=imgs.map((property, key) => {
            
                return(
                    <div className={key == 0 ? 'carousel-item active' : 'carousel-item'}>
                      <img src={`http://localhost:3001/${property}`} className="d-block w-100 " alt="First slide" />
                    </div>
                )
             
        });

        
        
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
            <div className="card">
                        <div className="card-body">
                        <div className="panel panel-default">
    <div className="row">
    <div className="col-md-7">
    
    <div id="carousel-container">
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" id="image-cont">
    <div className="carousel-inner">
      {details}
      
    </div>
    <a className="carousel-control-prev" href="#image-cont" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#image-cont" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>

  </div>
  <input style={{paddingTop:"40px"}} type="hidden"></input>

    <hr/>
    <div id="detail-heading">
    <h3>{this.state.property_detail.headline}
    </h3>
    <span id="bed-logo2">
    <img src={home}></img>
    </span>
    <span id="bed-logo">
    <img src={bed}></img>
    </span>
    <span id="bed-logo">
    <img src={team}></img>
    </span>
    <span id="bed-logo">
    <img src={bathtub}></img>
    </span>
    <span id="bed-logo">
    <img src={toilet}></img>
    </span>
    <span id="bed-logo">
    <img src={night}></img>
    </span><br/>
    <span id="bed-logo2">
<label id="long-desc">Apartment</label>
    </span>
    <span id="bed-text">
<label id="long-desc">Bedrooms</label>
    </span>
    <span id="bed-sleeps">
<label id="long-desc">Sleeps</label>
    </span>
    <span id="bed-sleeps">
<label id="long-desc">Bathrooms</label>
    </span>
    <span id="bed-text">
<label id="long-desc">Half Baths</label>
    </span>
    <span id="bed-logo">
<label id="long-desc">Nights</label>
    </span>
    <br/>
    <span id="bed-logo2">
<label id="long-desc1">750 sq.ft</label>
    </span>
    <span id="bed-logo-ext">
<label id="long-desc1">{this.state.property_detail.bedrooms}</label>
    </span>
    <span id="bed-sleeps-ext">
<label id="long-desc1">{this.state.property_detail.accomodates}</label>
    </span>
    <span id="bed-sleeps-ext1">
<label id="long-desc1">{this.state.property_detail.bathrooms}</label>
    </span>
    <span id="bed-sleeps-ext">
<label id="long-desc1">0</label>
    </span>
    <span id="bed-sleeps-ext">
<label id="long-desc1">{this.state.property_detail.nights}</label>
    </span>
    <br/>
    <br/>
    <p id="long-desc11">Property</p>
    <p id="about-desc">{this.state.property_detail.publicinfo}</p>


   
    </div>
    <br/><br/><br/><br/>
    </div>
    
    <div className="col-md-4 sticky" id="side-sticky">
        
                <div id="side-panel" className="card">
                    <div className="card-body">

                <div className="panel panel-default">
                <div id="verifications" className="panel-heading"><label id="amount-dis">{this.state.property_detail.currency} {this.state.property_detail.rate} <span className="rental-price__label text-muted" data-wdio="rental-price-label">per night</span></label></div>
                <div className="panel-body"><br/>
                <form action="" onSubmit={this.bookthisproperty}>
                <div className="container" id="search-crit">
               
  <div className="row">
  
    <div className="col-sm-6">
<br/>   
      Check in <br/><br/>

      
      <input type="date"  name="start" defaultValue={this.props.match.params.start} style={{"width":"170px"}} onChange={this.setStart}/>
    
      <hr/>
    </div>
    <div className="col-sm-6"><br/>
      Check out  <br/><br/>
      <input type="date"  name="end" defaultValue={this.props.match.params.end} style={{"width":"170px"}} onChange={this.setEnd}/>
      <hr/>
    </div>
    
    <br/>
  </div>
  
  <div className="row">
   
    <div className="col-sm-12">
     Guests<br/><br/>
     <input type="number" defaultValue={this.props.match.params.guests} style={{width:"12%"}} onChange={this.setGuests} min="1"></input>  </div>
    
  </div>
</div>
                <br/>
                <hr/>
                <div id="booking">
                <button  type="submit" className="btn btn-primary" style={{width:"50%"}}>Book Now</button>
               
                </div>
                </form>
               
        <label id="loginmsg">{loginmessage}</label>
        <label id="loginmsg">{this.state.bookingstatus}</label>
                </div>
            </div>
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


function mapStateToProps(state) {
    console.log("in map state details view",state);
    return { property_detail: state.fetch_details_view.property_detail,
        images:state.fetch_details_view.images,
        status:state.fetch_details_view.status,
        booking_status:state.book_property.status,
        message:state.book_property.message
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        fetch_detailsview: (id) => dispatch(fetch_detailsview(id)),
        book_property: (data) => dispatch(book_property(data))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(DetailsView);
  
