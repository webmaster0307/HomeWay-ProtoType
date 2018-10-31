import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import displayimg from '../../src/ownerlogin.png';
import axios from 'axios';
import Listing from './Listing';
import SearchProperty from './searchproperty'
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';

 
// To include the default styles


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
    message:null

}
    this.downloadData=this.downloadData.bind(this);
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
    axios.get('http://localhost:3001/fetchproperties',{ params:{
       
        start: this.state.start,
        end:this.state.end,
        location:this.state.location,
        guests:this.state.guests
      
    }}).then(res=>{
        console.log('Data downloaded')
        if(res.status===200){
          let temp = JSON.stringify(res.data);

          temp = JSON.parse(temp);
          
          console.log(temp);
            this.setState({
              properties:temp,
              status:res.status,
              message:null
            })
            if(temp.length==0){
                this.setState({
                    dataavailable:"No property to match your search criteria, try with different filters"
                })
            }else{
                this.setState({
                    dataavailable:null
                })
            }
            
        } else {
            this.setState({
                status:res.status,
                dataavailable:"Unkown error occured"
                
            })
        }
    }).catch(res=>{
        this.setState({
            status:res.status,
            dataavailable:"No property to match your search criteria, try with different filters"
            
        })
    })
}

componentDidMount(){
    console.log("in mount");

    this.downloadData();

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
            guests:this.props.match.params.guests
    
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
      console.log("in render");
      let details=null;
      var search={
start:this.state.start,
end:this.state.end,
guests:this.state.guests

      }
      if(this.state.status===200 && this.state.properties!==null){
         details =this.state.properties.map(property => {
            return(
                <Listing key={property.property_id} data={property} search={search}/>
            )
        }) 
        
      }
  return (
      <div>
      
      {this.state.message}
      {details}
      <h3>{this.state.dataavailable}</h3>

      </div>
  );
}
}



export default ImgMediaCard;