import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo2 from '../../src/2d97d2a8-a05e-4979-bf35-10ad17075324.png';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
import rootURL from '../config.js';

import cookie from 'react-cookies';


import ShowMyProperties from './ShowMyProperties';
import jwt from "jsonwebtoken";
import '../../src/CSS/inbox.css';

class ShowTravelerMessages extends Component {
    constructor(props) {
        super(props);
        this.state={
            reply:this.props.message.reply,
            error:"",
            status:null,
            display:false,
            sendreply:""
        }
this.reply=this.reply.bind(this);
this.sendReply=this.sendReply.bind(this);
this.displaybox=this.displaybox.bind(this) 
this.sendreply=this.sendreply.bind(this);

}
sendreply(e){
    this.setState({
        sendReply:e.target.value
    })
}
displaybox(){
    this.setState({
        displaybox:true
    })
}
    reply(e){
            this.setState({
                reply:e.target.value
            })
    }

    sendReply(e){
        let token=jwt.decode(localStorage.getItem('jwtToken'))
        e.preventDefault();
        var data={
            firstName:token.firstName,
            lastName:token.lastName,
            contactno:"208-407-7157",
            reply:this.state.reply,
            owner:this.props.message.owner,
            emailaddress:token.emailaddress
            
    
        }
        // var data={
        //     message_id:this.props.message._id,
        //     reply:this.state.reply
        // }

        axios.post(rootURL+'/postquestion',data).then((res)=>{
            this.setState({
                status:200
            })
        }).catch((e)=>{
this.setState({
    e:"error while replying"
})
        })
    }


    render() {
        //console.log("trips", this.state.properties);
        //console.log(this.state.dataavailable);
        let dis=this.props.message.reply=="" || this.state.status==200?<input style={{width:"100%",borderRadius:"12px"}} className="form-control" id="replyto"  type="text" placeholder="input here..." value={this.state.reply} disabled/>:<input style={{width:"100%",borderRadius:"12px"}} className="form-control" id="replyto"  type="text" placeholder="input here..." value={this.state.reply} disabled/>
        let butondis=null
        //<button onClick={this.displaybox}>Reply to this message</button>
        
        //let box=this.state.displaybox==true?<input style={{width:"100%",borderRadius:"12px"}} className="form-control" type="text" placeholder="input here..."  />:null;
        
        
        return (


            <div className="trips">
            

           

            <div className="container">
 
         <hr/>

         <div className="container">
                   
                             <hr/>
                    
                             <div className="chatBox" id="chatBox">
                    
                                 <div className="response"><div id="AutoMessage"> <strong>{this.props.message.message}</strong> <br/></div></div>
                    
                    
                                <div  id="request"></div><br/>
                        
                                 
                                       <table>
                                       <tbody>
                                       <tr>
                                       <td style={{width:"1000px"}}>
                                       {dis}
                                       
                                       </td>
                                       <td>
                                       {butondis}
                                       </td>
                                       </tr>
                                       <tr>
                                       
                                       </tr>
                                       </tbody>
                                       
                                       </table>
                                
                    
                                      
                    
                              
                                   
                             </div>
                    </div>



</div>




            </div>





        )
    }
}
  
  export default ShowTravelerMessages;
  
