import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/postproperty.css';
import '../../src/CSS/rates.css';

import '../../src/CSS/bootstrap-social.css';

var st="",en="",curr=null,rt=0,nght=0;
function PriceAndAvailability (props) {
    
var setstart=(e)=>{
st=e.target.value;
}

var setend=(e)=>{
en=e.target.value;
}
var setcurrency=(e)=>{
    curr=e.target.value;
    }
    var setrate=(e)=>{
        rt=e.target.value;
        }
        var setnights=(e)=>{
            nght=e.target.value;
            }

            var nextstep = (e) => {
                console.log("In next Step");
                e.preventDefault();
                var data = {
        
                    start: st,
                    end: en,
                    currency: curr,
                    rate: rt,
                    nights: nght,
                    
                }
                props.saveData(data);
                props.addProperty();

            }

            var prevstep = (e) => {
                console.log("In next Step");
                e.preventDefault();
                var data = {


                    address:null,
                    headline:null,
                    publicinfo:null,
                    propertytype:null,
                    bedrooms:0,
                    accomodates:0,
                    bathrooms:0,
                    photos:[],
                    start: st,
                    end: en,
                    currency: curr,
                    rate: rt,
                    nights: nght,
                    
                }
                props.saveData(data);
        props.setStep(3);
            }
        return (
            <div className="App">
                <form id="msform" action="post" method="" onSubmit={nextstep}>







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
                            <td><input id="s1"type="date" name="start" placeholder="Start Date" className="" onChange={setstart} defaultValue={props.formfields.start} required/></td>
                            <td><label><h6>End Date</h6></label></td>
                            <td><input id="e1" type="date" name="end" placeholder="End Date" className="" onChange={setend} defaultValue={props.formfields.end} required/></td>
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

                                <select aria-label="Currency"  id="currency" name="currency" className="form-control FormSelect__select" placeholder="Currency" style={{height:"50px"}} onMouseOut={setcurrency} defaultValue={props.formfields.currency}>
                                    <option value="USD">US Dollar(USD)</option>
                                </select><hr/><br/>
                                <label><h4>Nightly base rate</h4></label>
                                <input type="number" name="rate" placeholder="Rate" className="form-control" onChange={setrate} defaultValue={props.formfields.rate}/><br/>
                                
                                <label><h4>Minimum stay(Nights)</h4></label>
                                <input type="number" name="nights" className="form-control" aria-labelledby="Nights" placeholder="Minimus stay nights" onChange={setnights} defaultValue={props.formfields.nights}/><br/>
                                
                                <button id="back" type="button" className="btn btn-outline-primary" onClick={prevstep}>Back</button>
                                <span id="next"><button  id="next1" type="submit" className="btn btn-primary">Submit</button></span>

                                
                            </div>

                            </div>

                    </fieldset>
                </form>

            </div>
        );
    }


export default PriceAndAvailability;