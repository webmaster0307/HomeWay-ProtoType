import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import Logo1 from '../../src/logo-bceheader.svg';
import { connect } from "react-redux";
import * as actioncreator from '../actions/postproperty.js';

import '../../src/CSS/postproperty.css';
import '../../src/CSS/bootstrap-social.css';
// var head = null, publicin = null, prop = null, bed = 0, accom = 0, bath = 0;
class  PropertyDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            headline:this.props.headline,
            publicinfo:this.props.publicinfo,
            propertytype:this.props.propertytype,
            bedrooms:this.props.bedrooms,
            accomodates:this.props.accomodates,
            bathrooms:this.props.bathrooms


        }
        this.headline=this.headline.bind(this);
        this.publicinfo=this.publicinfo.bind(this);
        this.property=this.property.bind(this);
        this.bedrooms=this.bedrooms.bind(this);
        this.accomodates=this.accomodates.bind(this);
        this.bathrooms=this.bathrooms.bind(this);
        this.nextstep=this.nextstep.bind(this);
        this.prevstep=this.prevstep.bind(this);

    }
    headline = (e) => {
        this.setState({
            headline:e.target.value
        })
    }

    publicinfo = (e) => {
        this.setState({
            publicinfo:e.target.value
        })
    }
    property = (e) => {
        this.setState({
            propertytype:e.target.value
        })
    }
    bedrooms = (e) => {
        this.setState({
            bedrooms:e.target.value
        })
    }
    accomodates = (e) => {
        this.setState({
            accomodates:e.target.value
        })
    }
    bathrooms = (e) => {
        this.setState({
            bathrooms:e.target.value
        })
    }

    nextstep = (e) => {
        console.log("In next Step");
        
        let d = {

            headline: this.state.headline,
            publicinfo: this.state.publicinfo,
            propertytype: this.state.propertytype,
            bedrooms: this.state.bedrooms,
            accomodates: this.state.accomodates,
            bathrooms: this.state.bathrooms
        }
        this.props.set_property_details(d);
        this.props.set_step(3);
    }
    prevstep = (e) => {
        e.preventDefault();
        let d = {

            headline: this.state.headline,
            publicinfo: this.state.publicinfo,
            propertytype: this.state.propertytype,
            bedrooms: this.state.bedrooms,
            accomodates: this.state.accomodates,
            bathrooms: this.state.bathrooms
        }
        this.props.set_property_details(d);
        this.props.set_step(1);
    }

    componentWillReceiveProps(nextProps){

        console.log("in will recieve props for details",nextProps);
        this.setState({
            headline:nextProps.headline,
            publicinfo: nextProps.publicinfo,
            propertytype: nextProps.property,
            bedrooms: nextProps.bedrooms,
            accomodates: nextProps.accomodates,
            bathrooms: nextProps.bathrooms
        })
    }


render(){

    return (
        <div className="App">
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
            <form id="msform" action="" method="post" onSubmit={this.nextstep}>







                <fieldset>
                    <div id="heading" className="panel panel-default">
                        <div id="verifications" className="panel-heading"><h3>Describe your property</h3><hr /></div>

                        <div className="panel-body">

                            <h2 className="fs-title">Start out with a descriptive headline and a detailed summary of your property.</h2>

                            <input type="text" name="headline" placeholder="Headline" className="form-control" onChange={this.headline} value={this.state.headline}/><br />
                            <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" className="form-control" placeholder="Property description" style={{ height: "50px" }} onChange={this.publicinfo} value={this.state.publicinfo}>
                            </textarea><br />
                            <select aria-label="Property type" id="propertytype" name="propertytype" className="form-control FormSelect__select" placeholder="Property type" style={{ height: "50px" }} onChange={this.property} value={this.state.propertytype}>
                                <option value="apartment">Apartment</option><option value="barn">Barn</option><option value="bed &amp; breakfast">Bed &amp; Breakfast</option><option value="boat">Boat</option><option value="bungalow">Bungalow</option><option value="cabin">Cabin</option><option value="campground">Campground</option><option value="castle">Castle</option><option value="chalet">Chalet</option><option value="country house / chateau">Chateau / Country House</option><option value="condo">Condo</option><option value="corporate apartment">Corporate Apartment</option><option value="cottage">Cottage</option><option value="estate">Estate</option><option value="farmhouse">Farmhouse</option><option value="guest house/pension">Guest House</option><option value="hostel">Hostel</option><option value="hotel">Hotel</option><option value="hotel suites">Hotel Suites</option><option value="house">House</option><option value="house boat">House Boat</option><option value="lodge">Lodge</option><option value="Mill">Mill</option><option value="mobile home">Mobile Home</option><option value="Recreational Vehicle">Recreational Vehicle</option><option value="resort">Resort</option><option value="studio">Studio</option><option value="Tower">Tower</option><option value="townhome">Townhome</option><option value="villa">Villa</option><option value="yacht">Yacht</option>
                            </select><br />

                            <input type="number" name="bedrooms" className="form-control" aria-labelledby="Bedrooms" placeholder="Bedrooms" onChange={this.bedrooms} value={this.state.bedrooms}/><br />
                            <input type="number" name="accomodates" className="form-control" aria-labelledby="Accomodates" placeholder="Accomodates" onChange={this.accomodates} value={this.state.accomodates}/><br />

                            <input type="number" name="bathrooms" className="form-control" aria-labelledby="Bathrooms" placeholder="Bathrooms" onChange={this.bathrooms} value={this.state.bathrooms}/><br /><hr />

                            <button id="back" type="button" className="btn btn-outline-primary" onClick={this.prevstep}>Back</button>
                            <span id="next"><button id="next1" type="submit" className="btn btn-primary" onClick={this.nextstep}>Next</button></span>


                        </div>

                    </div>

                </fieldset>
            </form>

        </div>
    );
}
}


function mapStateToProps(state) {
    console.log("in map state property_details",state);
    return { headline: state.property_details.headline,
        publicinfo:state.property_details.publicinfo,
        propertytype:state.property_details.propertytype,
        bedrooms:state.property_details.bedrooms,
        accomodates:state.property_details.accomodates,
        bathrooms:state.property_details.bathrooms,
    };
  }

  const mapDispachToProps = dispatch => {
    return {
    set_property_details: (details) => dispatch(actioncreator.set_property_details(details)),
    set_step:(step)=>dispatch(actioncreator.set_step(step))
    };
  };

  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(PropertyDetails);
  