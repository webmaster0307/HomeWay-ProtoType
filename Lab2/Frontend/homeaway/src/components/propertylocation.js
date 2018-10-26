import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import Logo1 from '../../src/logo-bceheader.svg';
import { connect } from "react-redux";
import '../../src/CSS/postproperty.css';
import '../../src/CSS/propertylocation.css';
import * as actioncreator from '../actions/postproperty.js';







    
class PropertyLocation extends Component{

    constructor(props){
        super(props);
        console.log("COnstrictor called");
        this.state={
            address:this.props.address
        }

        this.nextstep=this.nextstep.bind(this);
        this.setaddress=this.setaddress.bind(this);
    }

    nextstep=(e)=>{
        console.log("In next Step");
        e.preventDefault();
        var data={
            address:this.state.address
            
        }
        this.props.set_property_location(data);
        this.props.set_step(2);
    }


    componentWillReceiveProps(nextProps){
        console.log("In nextprops",nextProps);
        this.setState({
            address:nextProps.address
        })
    }


    setaddress=(e)=>{
        this.setState({
            address:e.target.value
        })
        }

    
    
        render(){

            return(
            <div className="App">
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
                <form id="msform" action="" method="post">







                    <fieldset>
                        <div id="heading" className="panel panel-default">
                            <div id="verifications" className="panel-heading"><h3>Verify the location of your rental
                            </h3><hr /></div>

                            <div className="panel-body">
                            <label>Address</label><br/>
                            <input type="text"  name="Address" placeholder="Address" className="form-control" value={this.state.address} onChange={this.setaddress}/><br/>
                                <button id="back" type="button" className="btn btn-outline-primary" >Back</button>
                                <span id="next"><button  id="next1"type="button" className="btn btn-primary" onClick={this.nextstep}>Next</button></span>

                                
                            </div>

                            </div>

                    </fieldset>
                </form>

            </div>
            )
        }

    }

   function mapStateToProps(state) {
        console.log("in map state property_location",state);
        return { address: state.property_location.address
        };
      }

      const mapDispachToProps = dispatch => {
        return {
        set_property_location: (address) => dispatch(actioncreator.set_property_location(address)),
        set_step:(step)=>dispatch(actioncreator.set_step(step))
        };
      };

      export default connect(
        mapStateToProps,
        mapDispachToProps
      )(PropertyLocation);
      