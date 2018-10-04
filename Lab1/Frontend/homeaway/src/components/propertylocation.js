import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';

import '../../src/CSS/postproperty.css';
import '../../src/CSS/propertylocation.css';

var add=null;



    
function PropertyLocation(props){


    var nextstep=(e)=>{
        console.log("In next Step");
        e.preventDefault();
        var data={
            address:add
            
        }
        props.saveData(data);
        props.setStep(2);
    }
    


    var setaddress=(e)=>{
         add=e.target.value;
        }
    
        return (
            <div className="App">
                <form id="msform" action="" method="post">







                    <fieldset>
                        <div id="heading" className="panel panel-default">
                            <div id="verifications" className="panel-heading"><h3>Verify the location of your rental
                            </h3><hr /></div>

                            <div className="panel-body">
                            <label>Address</label><br/>
                            <input type="text"  name="Address" placeholder="Address" className="form-control" defaultValue={props.formfields.address} onChange={setaddress}/><br/>
                                <button id="back" type="button" className="btn btn-outline-primary" >Back</button>
                                <span id="next"><button  id="next1"type="button" className="btn btn-primary" onClick={nextstep}>Next</button></span>

                                
                            </div>

                            </div>

                    </fieldset>
                </form>

            </div>
        );
    }


export default PropertyLocation;