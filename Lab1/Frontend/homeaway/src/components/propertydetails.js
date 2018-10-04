import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/postproperty.css';
import '../../src/CSS/bootstrap-social.css';
var head = null, publicin = null, prop = null, bed = 0, accom = 0, bath = 0;
function PropertyDetails(props) {

    var headline = (e) => {
        head = e.target.value;
    }

    var publicinfo = (e) => {
        publicin = e.target.value;
    }
    var property = (e) => {
        prop = e.target.value;
    }
    var bedrooms = (e) => {
        bed = e.target.value;
    }
    var accomodates = (e) => {
        accom = e.target.value;
    }
    var bathrooms = (e) => {
        bath = e.target.value;
    }

    var nextstep = (e) => {
        console.log("In next Step");
        
        var data = {

            headline: head,
            publicinfo: publicin,
            propertytype: prop,
            bedrooms: bed,
            accomodates: accom,
            bathrooms: bath
        }
        props.saveData(data);
        props.setStep(3);
    }
    var prevstep = (e) => {
        e.preventDefault();
        var d = {

            headline: head,
            publicinfo: publicin,
            propertytype: prop,
            bedrooms: bed,
            accomodates: accom,
            bathrooms: bath
        }
        props.saveData(d);
        props.setStep(1);
    }




    return (
        <div className="App">
            <form id="msform" action="" method="post" onSubmit={props.nextstep}>







                <fieldset>
                    <div id="heading" className="panel panel-default">
                        <div id="verifications" className="panel-heading"><h3>Describe your property</h3><hr /></div>

                        <div className="panel-body">

                            <h2 className="fs-title">Start out with a descriptive headline and a detailed summary of your property.</h2>

                            <input type="text" name="headline" placeholder="Headline" className="form-control" onChange={headline} defaultValue={props.formfields.headline}/><br />
                            <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" className="form-control" placeholder="Property description" style={{ height: "50px" }} onChange={publicinfo} defaultValue={props.formfields.publicinfo}>
                            </textarea><br />
                            <select aria-label="Property type" id="propertytype" name="propertytype" className="form-control FormSelect__select" placeholder="Property type" style={{ height: "50px" }} onChange={property} defaultValue={props.formfields.propertytype}>
                                <option value="apartment">Apartment</option><option value="barn">Barn</option><option value="bed &amp; breakfast">Bed &amp; Breakfast</option><option value="boat">Boat</option><option value="bungalow">Bungalow</option><option value="cabin">Cabin</option><option value="campground">Campground</option><option value="castle">Castle</option><option value="chalet">Chalet</option><option value="country house / chateau">Chateau / Country House</option><option value="condo">Condo</option><option value="corporate apartment">Corporate Apartment</option><option value="cottage">Cottage</option><option value="estate">Estate</option><option value="farmhouse">Farmhouse</option><option value="guest house/pension">Guest House</option><option value="hostel">Hostel</option><option value="hotel">Hotel</option><option value="hotel suites">Hotel Suites</option><option value="house">House</option><option value="house boat">House Boat</option><option value="lodge">Lodge</option><option value="Mill">Mill</option><option value="mobile home">Mobile Home</option><option value="Recreational Vehicle">Recreational Vehicle</option><option value="resort">Resort</option><option value="studio">Studio</option><option value="Tower">Tower</option><option value="townhome">Townhome</option><option value="villa">Villa</option><option value="yacht">Yacht</option>
                            </select><br />

                            <input type="number" name="bedrooms" className="form-control" aria-labelledby="Bedrooms" placeholder="Bedrooms" onChange={bedrooms} defaultValue={props.formfields.bedrooms}/><br />
                            <input type="number" name="accomodates" className="form-control" aria-labelledby="Accomodates" placeholder="Accomodates" onChange={accomodates} defaultValue={props.formfields.accomodates}/><br />

                            <input type="number" name="bathrooms" className="form-control" aria-labelledby="Bathrooms" placeholder="Bathrooms" onChange={bathrooms} defaultValue={props.formfields.bathrooms}/><br /><hr />

                            <button id="back" type="button" className="btn btn-outline-primary" onClick={prevstep}>Back</button>
                            <span id="next"><button id="next1" type="submit" className="btn btn-primary" onClick={nextstep}>Next</button></span>


                        </div>

                    </div>

                </fieldset>
            </form>

        </div>
    );
}


export default PropertyDetails;