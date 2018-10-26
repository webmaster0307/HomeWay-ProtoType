import React, { Component } from 'react';
import { Link,Redirect,NavLink } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import owner_sign_up from '../actions/ownerSignUp.js';

import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import '../../src/CSS/signup.css';
import '../../src/CSS/bootstrap-social.css';

class OwnerSignUp extends Component {
    
    // callsubmit(e){
    //     e.preventDefault();
    //     var data={
    //         firstname:this.state.firstname,
    //         lastname:this.state.lastname,
    //         emailaddress:this.state.emailaddress,
    //         password:this.state.password
    //     }

    //     axios.post('http://localhost:3001/ownersignup',data)
    //     .then(res=>{
    //         if(res.status!==200){
    //             this.setState({
    //                 message:res.data,
    //                 status:res.status
    //             })
    //             console.log(res.status);
    //         }
    //         else{
    //             this.setState({
    //                 status:res.status
    //             })
    //         }
    //     });
        
    // }
    onSubmit(values){
        this.props.owner_sign_up(values);
    }


    renderField(field) {
        const { meta: { touched, error } } = field;
        const {type,placeholder,input,id,value}=field;
        //const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div>
            
            <input {...input} className="form-control" type={type}  id={id} placeholder={placeholder} />
            <div className="text-help" style={{color:"red"}}>
              {touched ? error : ""}
            </div>
          </div>
        );
      }

    render() {
        const {handleSubmit}=this.props;
        let route=this.props.status===200?<Redirect to="/"/>:null;
        return (
            <div>
            {route}
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
                    <h1 className="loginHeader">Sign up for HomeAway</h1>

                    <div className="NeedAccnt">
                        <span>
                            Already have an account? 
            </span>
                        
            <NavLink to="/travelerlogin">Login</NavLink>
                    </div>
                </div>
               
                <div className="container">

<div className="login-form">
<div id="main-cont-signup" className="main-div">
  
    <form id="Login" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="inline">
        <table>
        <tbody>
        <tr>
        <td className="first">
        <span className="form-group">
        <Field
        name="firstName"
        type="text"
        component={this.renderField}
        
        id="inputFirstName"
        placeholder="First Name"
        
      />


        </span>
        </td>
            <td>
        <span className="form-group">
        <Field
        name="lastName"
        type="text"
        component={this.renderField}
        id="inputLastName"
        placeholder="Last Name"
        
      />
            


        </span>
        </td>
        </tr>
        </tbody>
        </table>
        </div>

        <div className="form-group">

        <Field
        name="emailaddress"
        type="email"
        component={this.renderField}
        id="email"
       
        placeholder="Email address"
        
      />
        </div>
        <div className="form-group">

        <Field
        name="password"
        type="password"
        component={this.renderField}
        id="password"
        placeholder="Password"
        
      />
        </div>
      
        <button type="submit" className="btn btn-primary">Sign Me Up</button>
        <br/>
        <br/>
        <div className="social">
        <a className="btn btn-block btn-social btn-facebook">
        <span className="fa fa-facebook"></span> Log in with Facebook
      </a>
      </div>
        <br/>
        <label style={{color:"red"}}>{this.props.message}</label>
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
        function mapStateToProps(state){
            return{
                status:state.owner_sign_up.status,
                message:state.owner_sign_up.message
            };
        }

        function mapDispatchToProps(dispatch){
            return{
            owner_sign_up:values=>{dispatch(owner_sign_up(values))}
            };
        }

        function validate(values) {

            const errors = {};
          
            // Validate the inputs from 'values'
            if (!values.firstName) {
                errors.firstName = "Enter firstname";
              }
              if (!values.lastName) {
                errors.lastName = "Enter lastname";
              }

            if (!values.emailaddress) {
              errors.emailaddress = "Enter email address";
            }
            if (!values.password) {
              errors.password = "Enter password";
            }
            
          
            // If errors is empty, the form is fine to submit
            // If errors has *any* properties, redux form assumes form is invalid
            return errors;
          }
          
        
        export default reduxForm({
            validate,
            form:"NewOwnerSignUpForm"

        })(connect(mapStateToProps, mapDispatchToProps)(OwnerSignUp));