import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import get_owner_properties  from '../actions/ownerdashboard.js';
import get_traveler_messages from '../actions/get_traveler_messages.js';
import ShowTravelerMessages from "./showtravelermessages.js"
import ShowMyProperties from './ShowMyProperties';
import jwt from "jsonwebtoken";
import '../../src/CSS/inbox.css';
import Logo2 from '../../src/2d97d2a8-a05e-4979-bf35-10ad17075324.png';


class TravelerInbox extends Component {
    constructor() {
        super();
        this.state={
            messages:null,
            status:null,
            dataavailable:null,
            reply:""
        }


    }


    // sendReply(e){
    //     e.preventDefault();
    //     let token=jwt.decode(localStorage.getItem('jwtToken'))
    //     var data={
    //         firstName:token.firstName,
    //         lastName:token.lastName,
    //         contactno:"208-407-7157",
    //         reply:this.state.reply,
    //         owner:this.props.message.owner,
    //         emailaddress:token.emailaddress
    //     }

    //     axios.post('http://localhost:3001/postquestion',data).then((res)=>{

    //     }).catch(e=>{

    //     })
        
    // }

componentDidMount(){
    console.log("called");
    let token=jwt.decode(localStorage.getItem("jwtToken"));
    if(token && token.UserType=="traveler"){
    // axios.get("http://localhost:3001/ownerproperties",{ params: {
    //     username:cookie.load('owner')
        
    //   }}).then(res=>{
    //     let temp = JSON.stringify(res.data);

    //     temp = JSON.parse(temp);
        
    //     this.setState({
    //         properties:temp,
    //         dataavailable:res.data.length!=0?null:"You have no properties posted.",
    //         status:res.status
    //     })
    // }).catch()
    let username=token.emailaddress;
   this.props.get_traveler_messages(username);
    }
}

    render() {
        //console.log("trips", this.state.properties);
        //console.log(this.state.dataavailable);
        
       // e.preventDefault();
        

        let details = null;
        
        if (this.props.status === 200 && this.props.messages !== null) {
            details = this.props.messages.map(message => {
                return (
                    
                    <ShowTravelerMessages message={message}></ShowTravelerMessages>



                )
            })

      }
        return (


            <div className="trips">
            

            <div>
            
            <br/>

<h4>{this.props.dataavailable}</h4>
            </div>


            <div className="container">
<h4 className="display-4 text-center"> My Inbox</h4>  
         <hr/>

         {details}
</div>

           </div>





        )
    }
}
function mapStateToProps(state) {
    console.log("in map state traveler_propfile",state);
    return { status: state.get_traveler_messages.status,
        messages:state.get_traveler_messages.messages,
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        get_traveler_messages:(emailaddress) => dispatch(get_traveler_messages(emailaddress)),

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(TravelerInbox);
  
