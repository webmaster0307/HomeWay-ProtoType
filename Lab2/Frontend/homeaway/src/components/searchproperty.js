import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import displayimg from '../../src/ownerlogin.png';
import axios from 'axios';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import { NavLink,Link} from 'react-router-dom';




class SearchProperty extends Component{
constructor(props){
    super(props)
    this.state={
        location:"San",
        start:'2018-10-03',
        end:"2018-10-20",
        guests:2
    };

    this.setlocation=this.setlocation.bind(this);
    this.setstart=this.setstart.bind(this);
    this.setend=this.setend.bind(this);
    this.setguests=this.setguests.bind(this);

}


setlocation(e){
    this.setState({
        location:e.target.value
    })
}
setstart(e){
    this.setState({
        start:e.target.value
    })
}

setend(e){
    this.setState({
        end:e.target.value
    })
}
setguests(e){
    this.setState({
        guests:e.target.value
    })
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
      <div className="form-group row"  style={{paddingLeft:"10%"}} >
                
      <div className="col-md-3">
      <input type="text" className="form-control" name="location" placeholder="   Where do you want to go?" onChange={this.setlocation} value={this.state.location}/>
      </div>
      <div className="col-md-1" id="spacing-right1">
      <input type="date" className="form-control date" name="start" placeholder="Arrive"   onChange={this.setstart} value={this.state.start} />
      </div>
      <div className="col-md-1" id="spacing-right">
      <input type="date" className="form-control date" name="end" placeholder="Depart" onChange={this.setend} value={this.state.end}/>
      </div>
      <div className="col-md-1" id="spacing-right">
      <input type="number" className="form-control date" name="guest" placeholder="Guests"  onChange={this.setguests} min="1" value={this.state.guests}/>       
       </div>

       <div className="col-md-1">
       <button id="search-button" type="button" className="btn btn-primary"><Link to={`/findproperty/search/${this.state.location}/${this.state.start}/${this.state.end}/${this.state.guests}`}>Search</Link></button>
       </div>
          
          
         
        
         
         
          </div>
         
      
      
      </div>
  );
}
}



export default SearchProperty;