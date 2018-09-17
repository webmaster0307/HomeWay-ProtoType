import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/homeaway.css';
import '../../src/CSS/bootstrap-social.css';


class Login extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"><img className="brand" src={Logo} /></a>
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
                        <a href="">
                            Sign Up
                </a>
                    </div>
                </div>
               
                <div className="container">

<div className="login-form">
<div className="main-div">
    <div className="panel">
   <label>Account Login</label>
   </div>
    <form id="Login">

        <div className="form-group">


            <input type="email" class="form-control" id="inputEmail" placeholder="Email address"/>

        </div>

        <div className="form-group">

            <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>

        </div>
        <div className="forgot">
        <a href="">Forgot password?</a>
</div>
        <button type="submit" className="btn btn-primary">Log In</button>
        <br/>
        <br/>
        <a className="btn btn-block btn-social btn-facebook">
        <span className="fa fa-facebook"></span> Log in with Facebook
      </a>
        <br/>
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
