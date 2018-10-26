import React, { Component } from 'react';
import { Link,Redirect,NavLink } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import owner_login from '../actions/ownerActions.js';
import { connect } from "react-redux";

import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import displayimg from '../../src/ownerlogin.png';
import '../../src/CSS/homeaway.css';
import '../../src/CSS/ownerlogin.css';
import '../../src/CSS/bootstrap-social.css';
import axios from 'axios';


class OwnerLogin extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         emailaddress:null,
    //         password:null,
    //         message:null,
    //         status:null
            
    //     }
    //     this.setemail=this.setemail.bind(this);
    //     this.setpassword=this.setpassword.bind(this);
    //     this.checklogin=this.checklogin.bind(this);
    // }
    // setemail(e){
    //     this.setState({
    //         emailaddress:e.target.value
        
    //     })
    //     }
        
    //     setpassword(e){
    //         this.setState({
    //             password:e.target.value
    //         })
    //     }


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
        //     //set the with credentials to true
        //     axios.defaults.withCredentials = true;
        //     axios.post('http://localhost:3001/ownerLogin',data)
        //     .then(res=>{
        //         if(res.status===200){
        //             this.setState({
        //                 status:200
                        
        //             })
                    
        //         }
                
        //     }).catch(res=>{
        //         this.setState({
        //             message:"Incorrect username or password"
        //         })
        //     })
        // }

        onSubmit(values) {
            console.log(values);
            this.props.owner_login(values
            )
            
          }
     

    render() {
        const { handleSubmit } = this.props;
        var redirect=this.props.status===200?<Redirect to='/'/>:null;
        var message=this.props.status===400?"Incorrect username or password":null;
        return (
            <div>
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
               
                
                <div className="container">
                
<table>
<tbody>
<tr>
<td id="displayim"><span><img  src={displayimg}></img></span>
</td>
<td>
<div className="login-form">
<div className="main-div">
    <div className="panel">
   <label>Owner Login</label><hr/>
   
   </div>
    <form id="Login" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    <h6 id="sign-up-owner"><NavLink to="/ownersignup">Sign Up</NavLink></h6>
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
        <hr/>
        <br/>
        <label style={{color:"red"}}>{message}</label>
        <br/>
        
    </form>
    </div>

</div></td></tr></tbody>

</table></div>




                </div>

                );
            }
        }

        function mapStateToProps(state){
            return{
                status: state.owner_login.status
            };
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
            form: "NewOwnerForm"
          })(connect(mapStateToProps, {owner_login})(OwnerLogin));
          
