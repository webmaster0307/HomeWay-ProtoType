import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropertyLocation from './propertylocation';
import PropertyDetails from './propertydetails';
import '../../src/CSS/postproperty.css';
import AddPhotos from './addphotos';
import Navbar from './postpropertnavbar';
import PriceAndAvailability from './priceavailability';
import cookie from 'react-cookies';
import PropertyHeader from './propertyheader.js';
import { connect } from "react-redux";
import * as actioncreator from '../actions/postproperty.js';


//Create a Main Component
// var formfields={
//     address:null,
//     headline:null,
//     publicinfo:null,
//     propertytype:null,
//     bedrooms:0,
//     accomodates:0,
//     bathrooms:0,
//     photos:[],
//     start:new Date(),
//     end:null,
//     currency:0,
//     rate:0,
//     nights:0
// }


class PostProperty extends Component {
    constructor(props){
        super(props);
        // this.state={
        //     step:1,
        //     status:null,
        //     formfields:{
        //         address:null,
        //         headline:null,
        //         publicinfo:null,
        //         propertytype:null,
        //         bedrooms:0,
        //         accomodates:0,
        //         bathrooms:0,
        //         photos:[],
        //         start:new Date(),
        //         end:null,
        //         currency:0,
        //         rate:0,
        //         nights:0
                
            
            
        //     }
        // }

        // formfields.address=null,
        // formfields.headline=null,
        // formfields.publicinfo=null,
        // formfields.propertytype=null,
        // formfields.bedrooms=0,
        // formfields.accomodates=0,
        // formfields.bathrooms=0,
        // formfields.photos=[],
        // formfields.start=new Date(),
        // formfields.end=null,
        // formfields.currency=0,
        // formfields.rate=0,
        // formfields.nights=0
    //this.saveData=this.saveData.bind(this);
        
    }
    // saveData=function(f) {
        
    //     // return function() {
    //         var oldState={...this.state}
    //         var fields=Object.assign({},oldState.formfields,f);
    //         console.log("Entire data before",this.state.formfields);
    //       //formfields = Object.assign({}, formfields, f)

    //       this.setState({
    //           formfields:fields
    //       })
    //       console.log("Entire data after",this.state.formfields);
    //     // }.bind(this)()
    //   }

//       setStep=(s)=>{
//         console.log(s);
// this.setState({
    
//     step:s
// })
//       }
    //   addProperty=(e)=>{
          
    //       console.log("in add property");
        

        // let property= new FormData();
        // property.append("address",this.state.formfields.address);
        // property.append("headline",this.state.formfields.headline);
        // property.append("publicinfo",this.state.formfields.publicinfo);
        // property.append("propertytype",this.state.formfields.propertytype);
        // property.append("bedrooms",this.state.formfields.bedrooms);
        // property.append("accomodates",this.state.formfields.accomodates);
        // property.append("bathrooms",this.state.formfields.bathrooms);
        // property.append("start",this.state.formfields.start);
        // property.append("end",this.state.formfields.end);
        // property.append("currency",this.state.formfields.currency);
        // property.append("rate",this.state.formfields.rate);
        // property.append("nights",this.state.formfields.nights);
        // for(var i=0;i<this.state.formfields.photos.length;i++){
        //     property.append("photos",this.state.formfields.photos[i],"test");
        // }
        // property.append('username',cookie.load('owner'));

    //     axios.post('http://localhost:3001/postproperty',property)
    //     .then(res=>{
    //         if(res.status===200){
    //             this.setState({
    //                 status:res.status
    //             })

    //         }
    //     })

    //   }


      FindComponent=()=>{
          console.log('I am called..')
        switch (this.props.step) {
          case 1:
            return <Redirect to="/propertylocation"></Redirect>
           
          case 2:
          console.log("in Prop");
            return <Redirect to="/propertydetails"></Redirect>
            

          case 3:
            return <Redirect to="/addphotos"></Redirect>
                                  
           
          case 4:
            return <Redirect to="/price"></Redirect>

        }
      }





  render(){
      let red=this.props.status===200?<Redirect to='/'/>:null;
        return(
            <div>
            <BrowserRouter>
                <div>
                    {/*Render Different Component based on Route*/}

                    <Route path="/propertylocation" component={PropertyLocation} />
          <Route path="/propertydetails" component={PropertyDetails}/>
                    
                    <Route path="/addphotos" component={AddPhotos}/>
                    <Route path="/price" component={PriceAndAvailability}/>
                    {this.FindComponent()}
                </div>
            </BrowserRouter>
           
            {red}
            
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log("in map state property_details",state);
    return { step: state.post_property.step,
        status:state.post_property.status
        };
  }

  

  export default connect(
    mapStateToProps,
    null
  )(PostProperty);
  