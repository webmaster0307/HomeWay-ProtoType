import React, { Component } from 'react';
import { NavLink,Link} from 'react-router-dom';
import Logo from '../../src/whitehomeaway.svg';
import expedia from '../../src/whitebirdhouse.svg';
import cookie from 'react-cookies';
import '../../src/CSS/home.css';
import '../../src/CSS/bootstrap-social.css';



class Home extends Component {
constructor(props){
    super(props);

    this.state={
        location:null,
        start:null,
        end:null,
        guests:null
    };
    this.handlelogout=this.handlelogout.bind(this);
    this.setlocation=this.setlocation.bind(this);
    this.setstart=this.setstart.bind(this);
    this.setend=this.setend.bind(this);
    this.setguests=this.setguests.bind(this);
    //this.validatestart=this.validatestart.bind(this);

    
}


handlelogout = () => {
    if(cookie.load('traveler')){
    cookie.remove('traveler', { path: '/' })
}
else{
    cookie.remove('owner', { path: '/' })
}
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

    render() {
    
     let navLogin = null;
        if(cookie.load('traveler')){
            console.log("Able to read cookie");
            console.log();
            navLogin = (
                <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Hello {cookie.load('traveler')}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
          <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
         <Link className="dropdown-item" to='/' onClick={this.handlelogout}>Logout</Link>
          
        </div>
        </li>
            );
        }else if(cookie.load('owner')){
            console.log("Able to read cookie owner");
            console.log();
            navLogin = (
                <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Hello {cookie.load('owner')}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
          <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
         <Link className="dropdown-item" to='/' onClick={this.handlelogout}>Logout</Link>
          
        </div>
        </li>
            );
        }
        return (
            <div id="main-cont">
                <nav id="st12" className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/"><img className="brand" src={Logo} /></a>
                        </div>

                        <ul className="nav navbar-right">
                        <li className="nav-item">
                        <a className="nav-link" href="">Trip Boards</a>
                      </li>
                            
                            <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </a>
        
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="/travelerlogin">Traveler Login</a>
          <a className="dropdown-item" href="/ownerlogin">Owner Login</a>
          
        </div>
        </li>
        {navLogin}
     
      <li className="nav-item">
                        <a className="nav-link" href="">Help</a>
                      </li>
      <li className="nav-item"><button id="listprop" type="button" className="btn btn-light"><NavLink to="/postproperty">List your property</NavLink></button></li>
                            
                         <li className="nav-item">&nbsp;</li>   
                         <li className="nav-item">&nbsp;</li> <li className="nav-item">&nbsp;</li><li className="nav-item">&nbsp;</li>
                            
                            
                            <li><img src={expedia} /></li>
                        </ul>
                    </div>
                </nav>
                <br />
                <br />
                <br />
               
                
               
                <h1 className="HeadLine"><span className="HeadLine__text">Book beach houses, cabins,</span><br/>
                <span className="HeadLine__text">condos and more, worldwide</span></h1>
                <div className="form-group row"  style={{paddingLeft:"10%"}} >
                
            <div className="col-md-3">
            <input type="text" className="form-control" name="location" placeholder="   Where do you want to go?" onChange={this.setlocation}/>
            </div>
            <div className="col-md-1" id="spacing-right1">
            <input type="date" className="form-control date" name="start" placeholder="Arrive"   onChange={this.setstart} />
            </div>
            <div className="col-md-1" id="spacing-right">
            <input type="date" className="form-control date" name="end" placeholder="Depart" onChange={this.setend}/>
            </div>
            <div className="col-md-1" id="spacing-right">
            <input type="number" className="form-control date" name="guest" placeholder="Guests" onChange={this.setguests} min="1"/>       
             </div>

             <div className="col-md-1">
             <button id="search-button" type="button" className="btn btn-primary"><Link to={`/search/${this.state.location}/${this.state.start}/${this.state.end}/${this.state.guests}`}>Search</Link></button>
             </div>
                
                
               
              
               
               
                </div>
<div style={{paddingTop:"20%"}}>
<div className="form-group row"  style={{paddingLeft:"10%"}} >

                <label>Your whole vacation starts here</label>
                </div>
                </div>

                </div>

                );
            }
        }
        
    export default Home;
