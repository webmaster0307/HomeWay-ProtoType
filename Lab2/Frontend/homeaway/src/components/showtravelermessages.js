import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import '../../src/CSS/dashboard.css';
import Logo from '../../src/avatar_2x.png';
import Logo2 from '../../src/2d97d2a8-a05e-4979-bf35-10ad17075324.png';
import expedia from '../../src/birdhouse-bceheader.svg';
import axios from 'axios';
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
            status:null
        }
this.reply=this.reply.bind(this);
this.sendReply=this.sendReply.bind(this);
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

        axios.post('http://localhost:3001/postquestion',data).then((res)=>{
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
        let dis=this.props.message.reply=="" || this.state.status==200?<input style={{width:"100%",borderRadius:"12px"}} className="form-control" id="replyto"  type="text" placeholder="input here..." value={this.state.reply} />:<input style={{width:"100%",borderRadius:"12px"}} className="form-control" id="replyto"  type="text" placeholder="input here..." value={this.state.reply} disabled/>
        let butondis=<button onClick={this.sendReply}><img style={{height:"40px"}} src={Logo2}></img></button>;


        
        
        
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
  
