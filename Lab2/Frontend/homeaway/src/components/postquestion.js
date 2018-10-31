import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import Logo1 from '../../src/logo-bceheader.svg';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
//import * as actioncreator from '../actions/postproperty.js';







    
class PostQuestion extends Component{

    constructor(props){
        super(props);
        

    }
    
    
        render(){
           
            if(!this.props.show) {
                return null;
              }
          
              // The gray background
              const backdropStyle = {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: 50
              };
          
              // The modal "window"
              const modalStyle = {
                backgroundColor: '#fff',
                borderRadius: 5,
                maxWidth: 500,
                minHeight: 300,
                margin: '0 auto',
                padding: 30
              };
          
          
            return(
            <div className="App">
            <div className="backdrop" style={{backdropStyle}}>
        <div className="modal" style={{modalStyle}}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
                

            </div>
            )
        }

    }
    PostQuestion.propTypes = {
        onClose: PropTypes.func.isRequired,
        show: PropTypes.bool,
        children: PropTypes.node
      };
      
export default PostQuestion;
      