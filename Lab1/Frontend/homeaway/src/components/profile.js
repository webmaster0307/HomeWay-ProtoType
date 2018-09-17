import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../src/CSS/profile.css';
import Logo from '../../src/avatar_2x.png';





class Profile extends Component {
    render() {
        return (
            <div>

            <div id="top"className="panel panel-default"></div>
                <div id="verifications" className="panel-heading">
                <div className="text-center">
        <img id="img1"src={Logo} className="avatar img-circle img-thumbnail" alt="avatar"/>
        <h6>Upload a new photo</h6>
        <input type="file" className="text-center center-block file-upload"/>
      </div>
     <br/>
                </div>
                <div className="panel-body">
                </div>
            <div className="container">
            <div className ="row">
                
                
            </div>
            <div className="row">
                <div className="col-md-0 ">
                     
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <h3>Profile Information</h3>
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <form>
                                      <div className="form-group row">
                                        
                                        <div className="col-8">
                                          <input id="fname" name="fname" placeholder="First name" className="form-control here" required="required" type="text"/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="lname" name="lname" placeholder="Last name or initial" className="form-control here" type="text"/>
                                        </div>
                                      </div>

                                      

                                        <div className="form-group row">
                                         
                                        <div className="col-12">
                                          <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" className="form-control" placeholder="About me"></textarea>
                                        </div>

                                      </div>

                                      <div className="form-group row">
                                        <div className="col-8">
                                          <input id="text" name="city" placeholder="My city,country" className="form-control here"  type="text"/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="company" name="company" placeholder="Company" className="form-control here" type="text"/>
                                        </div>
                                      </div>
                                      
                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="school" name="school" placeholder="School" className="form-control here" type="text"/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="Hometown" name="hometown" placeholder="Hometown" className="form-control here" type="text"/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="Languages" name="languages" placeholder="Languages" className="form-control here" type="text"/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                        
                                        <div className="col-8">
                                          <select id="gender" name="gender" className="custom-select" placeholder="Gender">
                                            <option value="male">Male</option>
                                            <option value="male">Female</option>
                                            <option value="male">Other</option>
                                          </select>
                                        </div>
                                      </div>
                                      
                                      

                                                
                                     

                                      <div className="form-group row">
                                        <div className="col-2">
                                          <button name="submit" type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                      </div>
                                     
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
        
                <div className="card">
                    <div className="card-body">

                <div className="panel panel-default">
                <div id="verifications" className="panel-heading"><h3>Verifications</h3></div>
                <div className="panel-body">
                <span className="highlight">Email Address</span><br/><br/>
                <span className="general">We've sent a verification email to </span><br/>
                <span className="general">shubhamssand@gmail.com</span><br/><br/>
                <a href="" className="linkemail">Resend Email</a><br/>
                <br/>
                <hr/>
                <span className="highlight">Social Account Verifications</span><br/><br/>
                <span className="general">Verifying one or more social accounts improves  </span><br/>
                <span className="general">your trustworthiness to owners. We'll</span><br/>
                <span className="general">never post anything without your permission. </span><br/><br/>
                <a className="btn btn-block btn-social btn-facebook">
        <span className="fa fa-facebook"></span> Verify with Facebook
      </a>

        
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

export default Profile;
