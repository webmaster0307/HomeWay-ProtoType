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



//Create a Main Component
var formfields={
    address:null,
    headline:null,
    publicinfo:null,
    propertytype:null,
    bedrooms:0,
    accomodates:0,
    bathrooms:0,
    photos:[],
    start:new Date(),
    end:null,
    currency:0,
    rate:0,
    nights:0
    


}
class PostProperty extends Component {
    constructor(props){
        super(props);
        this.state={
            step:1,
            status:null
        }

        formfields.address=null,
        formfields.headline=null,
        formfields.publicinfo=null,
        formfields.propertytype=null,
        formfields.bedrooms=0,
        formfields.accomodates=0,
        formfields.bathrooms=0,
        formfields.photos=[],
        formfields.start=new Date(),
        formfields.end=null,
        formfields.currency=0,
        formfields.rate=0,
        formfields.nights=0
    
        
    }
    saveData=function(f) {
        
        return function() {
            console.log("Entire data before",formfields);
          formfields = Object.assign({}, formfields, f)
          console.log("Entire data",formfields);
        }.bind(this)()
      }

      setStep=(s)=>{
        console.log(s);
this.setState({
    
    step:s
})
      }
      addProperty=(e)=>{
          
          console.log("in add property");
        

        let property= new FormData();
        property.append("address",formfields.address);
        property.append("headline",formfields.headline);
        property.append("publicinfo",formfields.publicinfo);
        property.append("propertytype",formfields.propertytype);
        property.append("bedrooms",formfields.bedrooms);
        property.append("accomodates",formfields.accomodates);
        property.append("bathrooms",formfields.bathrooms);
        property.append("start",formfields.start);
        property.append("end",formfields.end);
        property.append("currency",formfields.currency);
        property.append("rate",formfields.rate);
        property.append("nights",formfields.nights);
        for(var i=0;i<formfields.photos.length;i++){
            console.log(formfields.photos[i]);
            property.append("photos",formfields.photos[i],"test");
        }
        property.append('username',cookie.load('owner'));

        console.log("Print formdata");
        for (var pair of property.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        axios.post('http://localhost:3001/postproperty',property)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    status:res.status
                })

            }
        })

      }


      FindComponent=()=>{
          console.log('I am called..')
        switch (this.state.step) {
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
      let red=this.state.status===200?<Redirect to='/'/>:null;
        return(
            <div>
            <BrowserRouter>
                <div>
                    {/*Render Different Component based on Route*/}

                    <Route path="/propertylocation" render={(props) => <PropertyLocation {...props} formfields={formfields} saveData={this.saveData} setStep={this.setStep}/>} />
                    <Route path="/propertydetails" render={(props) => <PropertyDetails {...props} formfields={formfields} saveData={this.saveData} setStep={this.setStep}/>}/>
                    
                    <Route path="/addphotos" render={(props) => <AddPhotos {...props} formfields={formfields} saveData={this.saveData} setStep={this.setStep}/>}/>
                    <Route path="/price" render={(props) => <PriceAndAvailability {...props} formfields={formfields} saveData={this.saveData} setStep={this.setStep} addProperty={this.addProperty}/>}/>
                    {this.FindComponent()}
                </div>
            </BrowserRouter>
           
            {red}
            
            </div>
        )
    }
}
//Export The Main Component
export default PostProperty;