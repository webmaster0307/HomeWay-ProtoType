import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/postproperty.css';
import '../../src/CSS/bootstrap-social.css';

class BookingOptions extends Component {
    render() {
        return (
            <div className="App">
                <form id="msform" action="" method="post">







                    <fieldset>
                        <div id="heading" className="panel panel-default">
                            <div id="verifications" className="panel-heading"><h3>Booking options
                            </h3><hr />
                          </div>

                            <div className="panel-body">

                            <h2 class="fs-title">Select a booking method
                            </h2>
<br/>
                            <div className="form-check">
                            <label>
                                <input type="radio" name="radio" /> <span className="label-text"><b class="finvent"> Instant Booking</b></span>
                            </label><br/><br/>
                            <label id="ib">Automatically accept booking requests from all travelers for dates you have available, and add the bookings to your calendar.</label><br/><br/>
                        </div>              
                        <div className="form-check">
                            <label>
                                <input type="radio" name="radio" /> <span className="label-text"><b class="finvent"> 24 hr review</b></span>
                            </label><br/><br/>
                            <label id="ib">Allow 24 hours to communicate with guests and accept booking requests.</label>
                        </div>  
                        
                        <button id="back" type="button" class="btn btn-outline-primary" >Back</button>
                                <span id="next"><button  id="next1"type="button" class="btn btn-primary">Next</button></span>

                                <input type="file" id="uploadPhotoInput" multiple="" value=""></input>
                            </div>

                            </div>

                    </fieldset>
                </form>

            </div>
        );
    }
}

export default BookingOptions;