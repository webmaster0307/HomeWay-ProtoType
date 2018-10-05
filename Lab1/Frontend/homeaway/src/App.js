import React, { Component } from 'react';
import ImgMediaCard from './components/Details.js';
import logo from './logo.svg';
import Login from './components/login';
import './App.css';
import PropertyLocation from './components/propertylocation';
import Dashboard from './components/dashboard';
import SignUp from './components/signup';
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

class App extends Component {
constructor(){
  super();
  
}

  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/travelerlogin" component={Login}/>
          <Route path="/ownerlogin" component={OwnerLogin}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/mytrips' component={Trips}/>
          <Route path='/ownerdashboard' component={OwnerDashboard}/>

          <Route path='/details' component={ImgMediaCard}/>
          <Route path="/search/:loc/:start/:end/:count" component={ImgMediaCard}/>
          <Route path="/detailsview/:propid/:start/:end/:guests" component={DetailsView}/>
          <Route path="/fetchtravelers/:imageName/:property_id/:headline/:property_type/:bathrooms/:bedrooms/:accomodates/:rate" component={ShowTravelers}/>

          <Route to="/postproperty" component={PostProperty}/>


          
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
