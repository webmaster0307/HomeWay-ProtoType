import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import Logo1 from '../../src/logo-bceheader.svg';
import { connect } from "react-redux";
import * as actioncreator from '../actions/postproperty.js';
import '../../src/CSS/postproperty.css';
import '../../src/CSS/rates.css';
import cookie from 'react-cookies'
import '../../src/CSS/bootstrap-social.css';

// var st = "", en = "", curr = null, rt = 0, nght = 0;
class PriceAndAvailability extends Component {
    constructor() {
        super();

        this.state = {
            address: null,
            headline: null,
            publicinfo: null,
            propertytype: null,
            bedrooms: 0,
            accomodates: 0,
            bathrooms: 0,
            photos: [],

            start: new Date(),
            end: null,
            currency: 0,
            rate: 0,
            nights: 0
        }

        this.setstart = this.setstart.bind(this);
        this.setend = this.setend.bind(this);
        this.setcurrency = this.setcurrency.bind(this);
        this.setnights = this.setnights.bind(this);
        this.setrate = this.setrate.bind(this);
        this.nextstep=this.nextstep.bind(this);
        this.prevstep=this.prevstep.bind(this);
    }
    setstart = (e) => {
        this.setState({
            start: e.target.value
        })
    }

    setend = (e) => {
        this.setState({
            end: e.target.value
        })
    }
    setcurrency = (e) => {
        this.setState({
            currency: e.target.value
        })
    }
    setrate = (e) => {
        this.setState({
            rate: e.target.value
        })
    }
    setnights = (e) => {
        this.setState({
            nights: e.target.value
        })
    }

    nextstep = (e) => {
        console.log("In next Step");
        e.preventDefault();
        

        let property= new FormData();
        property.append("address",this.state.address);
        property.append("headline",this.state.headline);
        property.append("publicinfo",this.state.publicinfo);
        property.append("propertytype",this.state.propertytype);
        property.append("bedrooms",this.state.bedrooms);
        property.append("accomodates",this.state.accomodates);
        property.append("bathrooms",this.state.bathrooms);
        property.append("start",this.state.start);
        property.append("end",this.state.end);
        property.append("currency",this.state.currency);
        property.append("rate",this.state.rate);
        property.append("nights",this.state.nights);
        for(var i=0;i<this.props.photos.length;i++){
            console.log(this.props.photos[i]);
            property.append("photos",this.props.photos[i],"test");
        }
        property.append('username',cookie.load('owner'));

        console.log("Files state",this.state.photos);
        console.log("Print formdata");
        for (var pair of property.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        this.props.post_property_to_db(property);
        // props.addProperty();

    }

    prevstep = (e) => {
    console.log("In next Step");
    e.preventDefault();
    var data = {

        start: this.state.start,
        end: this.state.end,
        currency: this.state.currency,
        rate: this.state.rate,
        nights: this.state.nights,

    }
   this.props.set_property_price_date(data);
    this.props.set_step(3);
}

componentWillMount(){
    this.setState({
        start:this.props.start,
        end:this.props.end,
        currency:this.props.currency,
        rate:this.props.rate,
        nights:this.props.nights,
        address: this.props.address,
            headline: this.props.headline,
            publicinfo: this.props.publicinfo,
            propertytype: this.props.propertytype,
            bedrooms: this.props.bedrooms,
            accomodates: this.props.accomodates,
            bathrooms: this.props.bathrooms,
            photos: this.props.photos,

    })
}
componentWillReceiveProps(nextProps){
    this.setState({
        start: nextProps.start,
        end: nextProps.end,
        currency: nextProps.currency,
        rate: nextProps.rate,
        nights: nextProps.nights,
        address: nextProps.address,
            headline: nextProps.headline,
            publicinfo: nextProps.publicinfo,
            propertytype: nextProps.propertytype,
            bedrooms: nextProps.bedrooms,
            accomodates: nextProps.accomodates,
            bathrooms: nextProps.bathrooms,
            photos: nextProps.photos,
    })
}
render(){

return(
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
        <form id="msform" action="post" method="" onSubmit={this.nextstep}>







            <fieldset>
                <div id="heading" className="panel panel-default">
                    <div id="verifications" className="panel-heading"><h3>Select The dates your property will be available
                            </h3><hr /></div>
                    <div className="panel-body">
                        <table cellSpacing="30">
                            <tbody>
                                <tr>
                                    <td><label>
                                        <h6>Start Date</h6></label></td>
                                    <td><input id="s1" type="date" name="start" placeholder="Start Date" className="" onChange={this.setstart} defaultValue={this.state.start} required /></td>
                                    <td><label><h6>End Date</h6></label></td>
                                    <td><input id="e1" type="date" name="end" placeholder="End Date" className="" onChange={this.setend} defaultValue={this.state.end} required /></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                </div>
                <div id="heading" className="panel panel-default">
                    <div id="verifications" className="panel-heading"><h3>How much do you want to charge?
                            </h3><hr /></div>

                    <div className="panel-body">

                        <p className="fs-title">We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>

                        <select aria-label="Currency" id="currency" name="currency" className="form-control FormSelect__select" placeholder="Currency" style={{ height: "50px" }} onMouseOut={this.setcurrency} defaultValue={this.state.currency}>
                            <option value="USD">US Dollar(USD)</option>
                        </select><hr /><br />
                        <label><h4>Nightly base rate</h4></label>
                        <input type="number" name="rate" placeholder="Rate" className="form-control" onChange={this.setrate} defaultValue={this.state.rate} /><br />

                        <label><h4>Minimum stay(Nights)</h4></label>
                        <input type="number" name="nights" className="form-control" aria-labelledby="Nights" placeholder="Minimus stay nights" onChange={this.setnights} defaultValue={this.state.nights} /><br />

                        <button id="back" type="button" className="btn btn-outline-primary" onClick={this.prevstep}>Back</button>
                        <span id="next"><button id="next1" type="submit" className="btn btn-primary">Submit</button></span>


                    </div>

                </div>

            </fieldset>
        </form>

    </div>
);
}
    }



    function mapStateToProps(state) {
        console.log("in map state property_priceAndAvailability",state);
        return { start: state.property_price.start,
            end: state.property_price.end,
            currency: state.property_price.currency,
            rate: state.property_price.rate,
            nights: state.property_price.nights,
            address: state.property_location.address,
            headline: state.property_details.headline,
            publicinfo: state.property_details.publicinfo,
            propertytype: state.property_details.propertytype,
            bedrooms: state.property_details.bedrooms,
            accomodates: state.property_details.accomodates,
            bathrooms: state.property_details.bathrooms,
            photos: state.property_photos.files,

        };
      }
    
      const mapDispachToProps = dispatch => {
        return {
        set_property_price_date: (details) => dispatch(actioncreator.set_property_price_date(details)),
        set_step:(step)=>dispatch(actioncreator.set_step(step)),
        post_property_to_db: (formdata) => dispatch(actioncreator.post_property_to_db(formdata)),

        };
      };
    
      export default connect(
        mapStateToProps,
        mapDispachToProps
      )(PriceAndAvailability);
      