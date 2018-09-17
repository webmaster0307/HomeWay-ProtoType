import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import '../../src/CSS/signup.css';
import '../../src/CSS/bootstrap-social.css';

class SignUp extends Component {
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
                    <h1 className="loginHeader">Sign up for HomeAway</h1>

                    <div className="NeedAccnt">
                        <span>
                            Already have an account? 
            </span>
                        <a href="">
                            Login
                </a>
                    </div>
                </div>
               
                <div className="container">

<div className="login-form">
<div className="main-div">
  
    <form id="Login">
        <div class="inline">
        <table>
        <tr>
        <td className="first">
        <span className="form-group">


            <input type="text" class="form-control" id="inputFirstName" placeholder="First Name"/>

        </span>
        </td>
            <td>
        <span className="form-group">

            <input type="text" className="form-control" id="inputLastName" placeholder="LastName"/>

        </span>
        </td>
        </tr>
        </table>
        </div>

        <div className="form-group">

            <input type="email" className="form-control" id="email" placeholder="Email address"/>

        </div>
        <div className="form-group">

            <input type="password" className="form-control" id="password" placeholder="Password"/>

        </div>
      
        <button type="submit" className="btn btn-primary">Sign Me Up</button>
        <br/>
        <br/>
        <div class="social">
        <a className="btn btn-block btn-social btn-facebook">
        <span className="fa fa-facebook"></span> Log in with Facebook
      </a>
      </div>
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
        
        export default SignUp;