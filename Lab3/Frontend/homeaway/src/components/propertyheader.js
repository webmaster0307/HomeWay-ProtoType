import React, { Component } from 'react';

import axios from 'axios';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import { NavLink,Link} from 'react-router-dom';




class PropertyHeader extends Component{
constructor(props){
    super(props)
    

   

}



      
               
  
  render(){
      

      
  return (
      <div>
      <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/"><img className="brand" src={Logo1} /></a>
                        </div>
                        <ul className="nav navbar-right">
                            <li><img src={expedia} /></li>
                        </ul>
                    </div>
                
            
                    </nav>
      
      
      
      </div>
  );
}
}



export default PropertyHeader;