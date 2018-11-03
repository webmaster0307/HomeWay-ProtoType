import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import '../../src/CSS/profile.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import { connect } from "react-redux";
import get_traveler_profile from '../actions/traveler-profile.js';
import set_traveler_profile from '../actions/traveler-profile-set.js';
import set_owner_profile from '../actions/owner-profile-set.js';
import jwt from 'jsonwebtoken' ;
import get_owner_profile from '../actions/owner-profile.js';
import axios from 'axios';
import cookie from 'react-cookies';




class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      firstname:this.props?this.props.firstname:"",
      lastname:this.props?this.props.lastname:"",
      aboutme:this.props?this.props.aboutme:"",
      citycountry:this.props?this.props.citycountry:"",
      company:this.props?this.props.company:"",
      school:this.props?this.props.school:"",
      hometown:this.props?this.props.hometown:"",
      languagues:this.props?this.props.languages:"",
      gender:this.props?this.props.gender:"",
      photo:this.props?this.props.photo:"",
      display:this.props?this.props.display:"",
      status:this.props?this.props.status:""

    }

this.setfname=this.setfname.bind(this);
this.setlname=this.setlname.bind(this);
this.setabout=this.setabout.bind(this);
this.setcity=this.setcity.bind(this);
this.setcompany=this.setcompany.bind(this);
this.setschool=this.setschool.bind(this);
this.sethometown=this.sethometown.bind(this);
this.setlanguages=this.setlanguages.bind(this);
this.setgender=this.setgender.bind(this);
this.saveprofile=this.saveprofile.bind(this);
this.addphoto=this.addphoto.bind(this);
//this.submitphoto=this.submitphoto.bind(this);


}


addphoto(event){
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
        this.setState({display: e.target.result});

    };
    this.setState({
      photo:event.target.files[0]
    })
    reader.readAsDataURL(event.target.files[0]);
}


}


setfname(e){
  this.setState({
    firstname:e.target.value
  })
}


setlname(e){
  this.setState({
    lastname:e.target.value
  })
}
setabout(e){
  this.setState({
    aboutme:e.target.value
  })
}
setcity(e){
  this.setState({
    citycountry:e.target.value
  })
}
setcompany(e){
  this.setState({
    company:e.target.value
  })
}
setschool(e){
this.setState({
    school:e.target.value
  })
}
sethometown(e){
  this.setState({
    hometown:e.target.value
  })
}
setlanguages(e){
  this.setState({
    languages:e.target.value
  })
}
setgender(e){
  this.setState({
    gender:e.target.value
  })
}

saveprofile(e){
  var token1=localStorage.getItem("jwtToken");
 let decoded1=jwt.decode(token1);
  e.preventDefault();
  
  let formdata=new FormData();
  formdata.append("firstname",this.state.firstname);
  formdata.append("lastname",this.state.lastname);
  formdata.append("aboutme",this.state.aboutme);
  formdata.append("citycountry",this.state.citycountry);
  formdata.append("company",this.state.company);
  formdata.append("school",this.state.school);
  formdata.append("hometown",this.state.hometown);
  formdata.append("languages",this.state.languages);
  formdata.append("gender",this.state.gender);
  
 


  if(decoded1.UserType==='traveler'){
    formdata.append("username",decoded1.emailaddress);

  formdata.append("photo",this.state.photo);

  this.props.set_traveler_profile(formdata);
  
//   axios.post('http://localhost:3001/addprofile',formdata)
//   .then(res=>{
//     if(res.status===200){
// this.setState({
//   status:res.status
// })
//     }
//   })

  }else{
    formdata.append("username",decoded1.emailaddress);

  formdata.append("photo",this.state.photo);
  
//   axios.post('http://localhost:3001/addprofileowner',formdata)
//   .then(res=>{
//     if(res.status===200){
// this.setState({
//   status:res.status
// })
//     }
//   })

this.props.set_owner_profile(formdata);

  }
  
}

componentWillReceiveProps(nextProps){
  console.log("Recieved props are ",nextProps);
  this.setState({
          firstname:nextProps.firstname,
        lastname:nextProps.lastname,
      aboutme:nextProps.aboutme,
      citycountry:nextProps.citycountry,
      company:nextProps.company,
      school:nextProps.school,
      hometown:nextProps.hometown,
      languages:nextProps.languages,
      gender:nextProps.gender,
      display:nextProps.display,
      status:nextProps.status
  })
}
componentDidMount(){
var token=localStorage.getItem("jwtToken");
 let decoded=jwt.decode(token);

//console.log("the decoded token is",usertype);

  if(decoded.UserType==="traveler"){
    var data={
      emailaddress:decoded.emailaddress
    }
    console.log("Get Dta",data)
  //   axios.get('http://localhost:3001/gettravelerprofile',{ params: {
  //     emailaddress:data.emailaddress

  // }})
  //   .then(res=>{
  //     let imagePreview="";
  //     if(res.data.photo){
  //     imagePreview = 'data:image/jpg;base64, ' + res.data.photo;
  //     }
  //     console.log("Response get traveler",res);
  //     if(res.status===200){
  //     this.setState({
  //       firstname:res.data.firstname,
  //       lastname:res.data.lastname,
  //     aboutme:res.data.aboutme!=undefined?res.data.aboutme:"",
  //     citycountry:res.data.citycountry!=undefined?res.data.citycountry:"",
  //     company:res.data.company!=undefined?res.data.company:"",
  //     school:res.data.school!=undefined?res.data.school:"",
  //     hometown:res.data.hometown!=undefined?res.data.hometown:"",
  //     languages:res.data.languages!=undefined?res.data.languages:"",
  //     gender:res.data.gender!=undefined?res.data.gender:"",
  //     display:imagePreview,

  //     });
  //   }
    
  //   });

  this.props.get_traveler_profile(data.emailaddress);
  }

  if(decoded.UserType==="owner"){
    
    // axios.get('http://localhost:3001/getownerprofile',{ params: {
    //   username:cookie.load('owner')
      
    // }})
    // .then(res=>{
    //   let imagePreview="";
    //   if(res.data.photo){
    //   imagePreview = 'data:image/jpg;base64, ' + res.data.photo;
    //   }
      
    //   if(res.status===200){
    //   this.setState({
    //     firstname:res.data.firstname,
    //     lastname:res.data.lastname,
    //   aboutme:res.data.aboutme!=undefined?res.data.aboutme:"",
    //   citycountry:res.data.citycountry!=undefined?res.data.citycountry:"",
    //   company:res.data.company!=undefined?res.data.company:"",
    //   school:res.data.school!=undefined?res.data.school:"",
    //   hometown:res.data.hometown!=undefined?res.data.hometown:"",
    //   languages:res.data.languages!=undefined?res.data.languages:"",
    //   gender:res.data.gender!=undefined?res.data.gender:"",
    //   display:imagePreview,

    //   });
    // }
    
    // });
    this.props.get_owner_profile(decoded.emailaddress);
  }


}
    render() {
      let message=this.state.status==200?"Profile is successfully updated":null;

        return (
            <div>
            


            <div id="top" className="panel panel-default"></div>
                <div id="verifications" className="panel-heading">
                <div className="text-center">
        
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
                                    <form onSubmit={this.saveprofile} encType="multipart/form-data">
                                    <img id="target" src={this.state.display} className="avatar img-circle img-thumbnail" alt="avatar"/>
        <h6>Upload a new photo</h6>
        <input type="file" className="text-center center-block file-upload" onChange={this.addphoto} className="filetype" />
                                      <div className="form-group row">
                                        
                                        <div className="col-8">
                                          <input id="fname" name="fname" placeholder="First name" className="form-control here"  type="text" onChange={this.setfname} value={this.state.firstname} required/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="lname" name="lname" placeholder="Last name or initial" className="form-control here" type="text" onChange={this.setlname} value={this.state.lastname} required/>
                                        </div>
                                      </div>

                                      

                                        <div className="form-group row">
                                         
                                        <div className="col-12">
                                          <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" className="form-control" placeholder="About me" onChange={this.setabout} value={this.state.aboutme}></textarea>
                                        </div>

                                      </div>

                                      <div className="form-group row">
                                        <div className="col-8">
                                          <input id="text" name="city" placeholder="My city,country" className="form-control here"  type="text" onChange={this.setcity} value={this.state.citycountry}/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="company" name="company" placeholder="Company" className="form-control here" type="text" onChange={this.setcompany} value={this.state.company}/>
                                        </div>
                                      </div>
                                      
                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="school" name="school" placeholder="School" className="form-control here" type="text" onChange={this.setschool} value={this.state.school}/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="Hometown" name="hometown" placeholder="Hometown" className="form-control here" type="text" onChange={this.sethometown} value={this.state.hometown}/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                     <div className="col-8">
                                          <input id="Languages" name="languages" placeholder="Languages" className="form-control here" type="text" onChange={this.setlanguages} value={this.state.languages}/>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                        
                                        <div className="col-8">
                                          <select id="gender" name="gender" className="custom-select" placeholder="Gender" onChange={this.setgender} defaultValue="Male" value={this.state.gender}>
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
                                     {message}
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

function mapStateToProps(state) {
  console.log("in map state traveler_propfile",state);
  return { status: state.traveler_profile.status,
    firstname:state.traveler_profile.firstname,
    lastname:state.traveler_profile.lastname,
    aboutme:state.traveler_profile.aboutme,
    citycountry:state.traveler_profile.citycountry,
    company:state.traveler_profile.company,
    school:state.traveler_profile.school,
    hometown:state.traveler_profile.hometown,
    languages:state.traveler_profile.languages,
    gender:state.traveler_profile.gender,
    display:state.traveler_profile.imagePreview,
    status:state.traveler_profile_set.status
  
  
  
  };
}

const mapDispachToProps = dispatch => {
  return {
    get_traveler_profile: (emailaddress) => dispatch(get_traveler_profile(emailaddress)),
    set_traveler_profile: (formdata) => dispatch(set_traveler_profile(formdata)),
    get_owner_profile: (emailaddress) => dispatch(get_owner_profile(emailaddress)),
    set_owner_profile: (formdata) => dispatch(set_owner_profile(formdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Profile);
