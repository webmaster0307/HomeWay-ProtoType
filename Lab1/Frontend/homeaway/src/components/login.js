import React, { Component } from 'react';
import { Link ,NavLink,Redirect} from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/homeaway.css';
import axios from 'axios';
import '../../src/CSS/bootstrap-social.css';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            emailaddress:null,
            password:null,
            message:null,
            status:null
            
        }
        this.setemail=this.setemail.bind(this);
        this.setpassword=this.setpassword.bind(this);
        this.checklogin=this.checklogin.bind(this);
    }
setemail(e){
this.setState({
    emailaddress:e.target.value

})
}

setpassword(e){
    this.setState({
        password:e.target.value
    })
}
    checklogin(e){
        e.preventDefault();
        let data={
            emailaddress:this.state.emailaddress,
            password:this.state.password

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/travelerlogin',data)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    status:200
                    
                })
                
            }
            
        }).catch(res=>{
            this.setState({
                message:"Incorrect username or password"
            })
        })
    }
    render() {
        var redirect=this.state.status===200?<Redirect to='/'/>:null;
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
    <form id="Login" onSubmit={this.checklogin}>

        <div className="form-group">


            <input type="email" className="form-control" id="inputEmail" placeholder="Email address" onChange={this.setemail} required/>

        </div>

        <div className="form-group">

            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.setpassword} required/>

        </div>
        <div className="forgot">
        <a href="">Forgot password?</a>
</div>
        <button type="submit" className="btn btn-primary">Log In</button>
        <br/>
        <br/>
    
        <br/>
        <label style={{color:"red"}}>{this.state.message}</label>
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
        
        export default Login;
