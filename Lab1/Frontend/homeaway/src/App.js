import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/login';
import './App.css';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Profile/>
      </div>
    );
  }
}

export default App;
