import React, { Component } from 'react';


import ImgMediaCard from './components/Details.js';
import logo from './logo.svg';
import Login from './components/login';
import './App.css';
import PropertyLocation from './components/propertylocation';
import Dashboard from './components/dashboard';
import SignUp from './components/signup';
import OwnerSignUp from './components/ownersignup';

import Navbar from './components/postpropertnavbar';
import PostProperty from './components/postproperty';
import Profile from './components/profile';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import OwnerLogin from './components/ownerlogin';
import Home from './components/home';
import DetailsView from './components/detailsview';
import Trips from './components/trips';
import OwnerDashboard from './components/ownerdashboard';
import ShowTravelers from './components/showtravelers';
import SearchProperty from './components/searchproperty.js';



class App extends Component {


  render() {
    return (

      <div className="App">
      
        
          <div>
         
          <Route path="/" component={Home} exact/>
          <Route path="/travelerlogin" component={Login}/>
          <Route path="/ownerlogin" component={OwnerLogin}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/ownersignup' component={OwnerSignUp}/>

          <Route path='/dashboard' component={Dashboard} />
          <Route path='/dashboard/profile' component={Profile}/>
          <Route path='/dashboard/mytrips' component={Trips}/>
          <Route path='/dashboard/ownerdashboard' component={OwnerDashboard}/>
          <Route path='/findproperty' component={SearchProperty}/>

          <Route path='/details' component={ImgMediaCard}/>
          <Route path="/findproperty/search/:loc/:start/:end/:guests" component={ImgMediaCard}/>
          <Route path="/detailsview/:propid/:start/:end/:guests" component={DetailsView}/>
          <Route path="/fetchtravelers/:imageName/:property_id/:headline/:property_type/:bathrooms/:bedrooms/:accomodates/:rate" component={ShowTravelers}/>

          <Route path="/postproperty" component={PostProperty}/>
         
          </div>

          
         
       
        
      </div>
    );
  }
}

export default App;
