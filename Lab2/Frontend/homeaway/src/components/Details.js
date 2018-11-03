import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import displayimg from '../../src/ownerlogin.png';
import axios from 'axios';
import Listing from './Listing';
import SearchProperty from './searchproperty'
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import fetch_properties from '../actions/fetchproperties.js';
import { connect } from "react-redux";
import Pagination1 from "./paji"
import {paginate} from "../paginate";
import { isNullOrUndefined } from 'util';
import filter from '../../src/download.jpeg';

 
// const styles = {
//   card: {
//     maxWidth: 600,
//   },
//   media: {
//     // ⚠️ object-fit is not supported by IE11.
//     objectFit: 'cover',
//   },
// };



class ImgMediaCard extends Component{
constructor(props){
    super(props);
this.state={
    properties:null,
    start:props.match.params.start,
    location:props.match.params.loc,
    end:props.match.params.end,
    guests:props.match.params.guests,
    dataavailable:null,
    message:null,
    currentPage:1,
    filterloc:props.match.params.loc,
            filterstart:props.match.params.start,
            filterend:props.match.params.end,
            filterbed:2,
            filterprice:100000

}
    this.downloadData=this.downloadData.bind(this);
    this.handlePageChange=this.handlePageChange.bind(this);
    this.filterloc=this.filterloc.bind(this);
    this.filterstart=this.filterstart.bind(this);
    this.filterend=this.filterend.bind(this);
    this.filterbed=this.filterbed.bind(this);
    this.setfilterprice=this.setfilterprice.bind(this);
}

setfilterprice(e){
    this.setState({
        filterprice:e.target.value
    })
}
filterstart(e){
    this.setState({
        filterstart:e.target.value
    })
}
filterend(e){
    this.setState({
        filterend:e.target.value
    })
}
filterloc(e){
    this.setState({
        filterloc:e.target.value
    })
}
filterbed(e){
    this.setState({
        filterbed:e.target.value
    })
}
handlePageChange(page){
    this.setState({currentPage : page });
    }
 downloadData(){
     console.log('Downloading data...');
     console.log({
       
        start: this.state.start,
        end:this.state.end,
        location:this.state.location,
        guests:this.state.guests
      
    });
    if(this.state.start>this.state.end){
        this.setState({
            message:"Start date should be less than end date"
        })
        return;
    }
//     axios.get('http://localhost:3001/fetchproperties',{ params:{
       
//         start: this.state.start,
//         end:this.state.end,
//         location:this.state.location,
//         guests:this.state.guests
      
//     }}).then(res=>{
//         console.log('Data downloaded')
//         if(res.status===200){
//           let temp = JSON.stringify(res.data);

//           temp = JSON.parse(temp);
          
//           console.log(temp);
//             this.setState({
//               properties:temp,
//               status:res.status,
//               message:null
//             })
//             if(temp.length==0){
//                 this.setState({
//                     dataavailable:"No property to match your search criteria, try with different filters"
//                 })
//             }else{
//                 this.setState({
//                     dataavailable:null
//                 })
//             }
            
//         } else {
//             this.setState({
//                 status:res.status,
//                 dataavailable:"Unkown error occured"
                
//             })
//         }
//     }).catch(res=>{
//         this.setState({
//             status:res.status,
//             dataavailable:"No property to match your search criteria, try with different filters"
            
//         })
//     })

this.props.fetch_properties(this.state.start,this.state.end,this.state.location,this.state.guests);
 }

componentDidMount(){
    console.log("in mount");

    this.downloadData();

}
componentWillReceiveProps(nextProps){
    this.setState({
        properties:nextProps.properties
    })
}


componentDidUpdate(prevProps, prevState, snapshot){
    // console.log('prev props:');
    // console.log(prevProps.match.params);
    // console.log('Prev state');
    // console.log(prevState);
    // console.log('New Props');
    // console.log(this.props.match.params);
    // console.log('New State');
    // console.log(this.state);

    if ((prevProps.match.params.loc !== this.props.match.params.loc)||(prevProps.match.params.start !== this.props.match.params.start)||(prevProps.match.params.end !== this.props.match.params.end)) {
        this.setState({
            start:this.props.match.params.start,
            end:this.props.match.params.end,
            location:this.props.match.params.loc,
            guests:this.props.match.params.guests,
            message:null,
            
          });
        //   console.log('new state set as below');
        //   console.log(this.state);
        //   console.log("Start",this.state.start);
        //   
    
    }
    else if(prevState.location !== this.state.location){
        this.downloadData();
    }
    else if(prevState.start !== this.state.start){
        this.downloadData();
    }
    else if(prevState.end !== this.state.end){
        this.downloadData();
    }
}

// componentWillReceiveProps(nextProps) {
//     console.log("In will props",nextProps.match.params.loc);
//     if (nextProps.match.params.loc !== this.props.match.params.loc) {
      
      
     
//     }
//   }

  render(){
    const prope = paginate(this.props.properties, this.state.currentPage, 5)
    console.log("Properties",this.props.properties);
    // let pagin=this.props.properties

    
    let dataavailable=null;
      if(this.props.status!=200){
          dataavailable="Unkown error occured"
      }else{
      dataavailable=this.props.properties.length==0?"No property to match your search criteria, try with different filters":null;
      }
      console.log("in render");
      let details=null;
      var search={
start:this.state.start,
end:this.state.end,
guests:this.state.guests

      }
console.log("startfil",this.state.filterstart);
      let filteredProperties=this.props.properties?this.props.properties.filter((property)=>{
          console.log(new Date(property.start));
          return (Number(property.rate)<=Number(this.state.filterprice) && property.address.toLowerCase().indexOf(this.state.filterloc.toLowerCase())!=-1 && Number(property.bedrooms)>=Number(this.state.filterbed))}):[];
        
      if(this.props.status===200 && filteredProperties!==null){
         details =filteredProperties.map(property => {
            return(
                <Listing key={property._id} data={property} search={search}/>
            )
        }) 
        
      }
  return (
      <div>
      

<div className="form-group row" style={{paddingLeft:"100px"}}>
<img src={filter} style={{width:"120px",height:"60px"}}></img>
<div className="col-md-3"><input type="text" class="form-control" name="location" placeholder="Where do you want to go?" onChange={this.filterloc}/></div>&nbsp;&nbsp;
<div className="col-md-2" style={{paddingLeft:"30px"}}><input type="number" className="form-control " name="bed" placeholder="Bedrooms" onChange={this.filterbed}/></div>
<div class="col-md-2">
  <input type="range" min="100" max="1000"  class="slider" id="myRange" onChange={this.setfilterprice} defaultValue='1000'/>
  <p>Price: ${this.state.filterprice}<span id="demo"></span></p>
</div>
</div>
      {this.state.message}
     
      <div style={{paddingTop:"4%"}}>{details}</div>
      <h3>{dataavailable}</h3>
      

      <div>
      
      </div>
      </div>
  );
}
}




function mapStateToProps(state) {
    console.log("in map state traveler_propfile",state);
    return { status: state.fetch_properties.status,
        properties:state.fetch_properties.properties
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        fetch_properties: (start,end,loc,guests) => dispatch(fetch_properties(start,end,loc,guests)),
      
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(ImgMediaCard);
  