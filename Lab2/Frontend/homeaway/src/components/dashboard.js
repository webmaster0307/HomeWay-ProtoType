import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../../src/CSS/dashboard.css';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import Profile from './profile';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';



class Dashboard extends Component {
    render() {
        let navTop=null;

        let token=jwt.decode(localStorage.getItem('jwtToken'))
        
        if(token.UserType=="traveler"){
            console.log("Able to read cookie");
            
            navTop = (
                <ul className="nav nav-tabs">
                <li  id="it1" className="nav-item">
                <Link className="nav-link active" to="/dashboard/mytrips" >My Trips</Link>
            </li>
            <li id="it2" className="nav-item">
                <Link className="nav-link" to="/dashboard/profile">Profile</Link>
            </li>
            <li id="it2" className="nav-item">
                <a className="nav-link" href="#">Account</a>
            </li>
            </ul>
            );
        }
        
        if(token.UserType=="owner"){
            console.log("Able to read cookie");
            
            navTop = (
                <ul className="nav nav-tabs">
                <li id="it2" className="nav-item">
                <Link className="nav-link" to="/dashboard/ownerdashboard">Owner Dashboard</Link>
            </li>  
            <li id="it2" className="nav-item">
                <Link className="nav-link" to="/dashboard/profile">Profile</Link>
            </li>
            <li id="it2" className="nav-item">
                <a className="nav-link" href="#">Account</a>
            </li>
            </ul>
            );
        }

        return (
            <div>
            <div>
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
            
            </div>
            <div id="back12" className="container">
            
               {navTop}
            </div>
            
            </div>
        );
    }
}

export default Dashboard;