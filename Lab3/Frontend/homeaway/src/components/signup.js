import React, { Component } from 'react';
import { Link,Redirect,NavLink } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import { graphql, compose } from 'react-apollo';
import { addBookMutation ,travelerSignUp} from '../mutation/mutations';
import { getAuthorsQuery, getBooksQuery } from '../queries/queries';
import '../../src/CSS/signup.css';
import '../../src/CSS/bootstrap-social.css';

class SignUp extends Component {
    constructor(){
        super();
        this.state={
            firstname:"",
            lastname:"",
            emailaddress:"",
            password:null,
            message:null,
            status:null
        }
        this.setfname=this.setfname.bind(this);
        this.setlname=this.setlname.bind(this);
        this.setemail=this.setemail.bind(this);
        this.setpassword=this.setpassword.bind(this);
        this.callsubmit=this.callsubmit.bind(this);
    }
    setfname(e){
        this.setState({
            firstname:e.target.value
        });
    }
    setlname(e){
        this.setState({
            lastname:e.target.value
        })
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

    callsubmit(e){
        e.preventDefault();
        var data={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            emailaddress:this.state.emailaddress,
            password:this.state.password
        }


        var data=this.props.travelerSignUp({
            variables: {
                firstName:this.state.firstname,
                lastName:this.state.lastname,
                emailaddress:this.state.emailaddress,
                password:this.state.password
             
            }
            
            //refetchQueries: [{ query: getBooksQuery }]
        });
        if(data.error){
            this.setState({
                status:400
            })
        }
        this.setState({
            status:200
        })


        console.log("Data rec",data);

        // axios.post('http://localhost:3001/signup',data)
        // .then(res=>{
        //     if(res.status!==200){
        //         this.setState({
        //             message:res.data,
        //             status:res.status
        //         })
        //         console.log(res.status);
        //     }
        //     else{
        //         this.setState({
        //             status:res.status
        //         })
        //     }
        // });
        
    }
    render() {
        let route=this.state.status===200?<Redirect to="/"/>:null;
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
  
    <form id="Login" onSubmit={this.callsubmit}>
        <div className="inline">
        <table>
        <tbody>
        <tr>
        <td className="first">
        <span className="form-group">


            <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" onChange={this.setfname} required/>

        </span>
        </td>
            <td>
        <span className="form-group">

            <input type="text" className="form-control" id="inputLastName" placeholder="LastName" onChange={this.setlname} required/>

        </span>
        </td>
        </tr>
        </tbody>
        </table>
        </div>

        <div className="form-group">

            <input type="email" className="form-control" id="email" placeholder="Email address" onChange={this.setemail} required/>

        </div>
        <div className="form-group">

            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.setpassword} required/>

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
        
        export default compose(
            graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
            graphql(travelerSignUp, { name: "travelerSignUp" })
        )(SignUp);