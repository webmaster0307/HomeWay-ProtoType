import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import traveler_login from '../actions/actions.js';
import { connect } from "react-redux";

import { Link ,NavLink,Redirect} from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/homeaway.css';
import axios from 'axios';
import '../../src/CSS/bootstrap-social.css';


class Login extends Component {
    

    //Define component that you wanbt to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const {type,placeholder,input,id}=field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        
        <input {...input} className="form-control" type={type}  id={id} placeholder={placeholder}/>
        <div className="text-help" style={{color:"red"}}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }


    // checklogin(e){
    //     e.preventDefault();
    //     let data={
    //         emailaddress:this.state.emailaddress,
    //         password:this.state.password

    //     }
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/travelerlogin',data)
        // .then(res=>{
        //     if(res.status===200){
        //         this.setState({
        //             status:200
                    
        //         })
                
        //     }
            
        // }).catch(res=>{
        //     this.setState({
        //         message:"Incorrect username or password"
        //     })
        // })
    //}

    onSubmit(values) {
        console.log(values);
        this.props.traveler_login(values,
        )
        
      }

    render() {
        const { handleSubmit } = this.props;
        console.log("Current status",this.props.status);
      var redirect=this.props.status==200?<Redirect to='/'/>:null;
      var message=this.props.status==400?"Incorrect username or passoword":null;
        return (
            <div >
            {redirect}
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/"><img className="brand" src={Logo} /></a>
                        </div>
                        <ul className="nav navbar-right">
                            <li><img src={expedia} /></li>
                        </ul>
                    </div>
                </nav>
                <br />
                <br />
                <br />
               
                <div>
                    <h1 className="loginHeader">Log in to HomeAway</h1>

                    <div className="NeedAccnt">
                        <span>
                            Need an account? 
            </span>
                        <NavLink to="/signup">
                            Sign Up
                </NavLink>
                    </div>
                </div>
               
                <div className="container">

<div className="login-form">
<div className="main-div">
    <div className="panel">
   <label>Account Login</label>
   </div>
    <form id="Login" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

    <Field
        name="emailaddress"
        type="email"
        component={this.renderField}
        id="inputEmail"
        placeholder="Email address"
        
      />

      <Field
        name="password"
        type="password"
        component={this.renderField}
        id="inputPassword"
        placeholder="Password"
        
      />

        

        
        <div className="forgot">
        <a href="">Forgot password?</a>
</div>
        <button type="submit" className="btn btn-primary">Log In</button>
        <br/>
        <br/>
    
        <br/>
        <label style={{color:"red"}}>{message}</label>
        <br/>
        <div className="disclaimer">
        <label>We don't post anything without your permission</label>
</div>
    </form>
    </div>

</div></div>




                </div>

                );
            }
        }
        function mapStateToProps(state) {
            console.log("in map state",state);
            return { status: state.traveler_login.status};
          }

        function validate(values) {

            const errors = {};
          
            // Validate the inputs from 'values'
            if (!values.emailaddress) {
              errors.emailaddress = "Enter emailaddress";
            }
            if (!values.password) {
              errors.password = "Enter Password";
            }
            
          
            // If errors is empty, the form is fine to submit
            // If errors has *any* properties, redux form assumes form is invalid
            return errors;
          }
          
        
        export default reduxForm({
  validate,
  form: "NewBookForm"
})(connect(mapStateToProps, {traveler_login })(Login));

