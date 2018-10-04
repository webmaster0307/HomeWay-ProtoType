import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import displayimg from '../../src/ownerlogin.png';
import axios from 'axios';
import Listing from './Listing';



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
    super(props)
this.state={
    properties:null,
    start:props.match.params.start,
    location:props.match.params.loc,
    end:props.match.params.end,
    count:props.match.params.count,
    dataavailable:null
}

}
componentDidMount(){

    axios.post('http://localhost:3001/fetchproperties',{
       
          start: this.state.start,
          end:this.state.end,
          location:this.state.location,
          guests:this.state.count
        
      }).then(res=>{
          if(res.status===200){
            let temp = JSON.stringify(res.data);

            temp = JSON.parse(temp);
            console.log(temp);
              this.setState({
                properties:temp,
                status:res.status
              })
              
          }
      }).catch(res=>{
          this.setState({
              status:res.status,
              dataavailable:"No property to match your search criteria, try with different filters"
              
          })
      })

}
  
  render(){
      let details=null;
      var search={
start:this.state.start,
end:this.state.end,
guests:this.state.count

      }
      if(this.state.status===200 && this.state.properties!==null){
         details =this.state.properties.map(property => {
            return(
                <Listing data={property} search={search}/>
            )
        }) 
        
      }
  return (
      <div>
      {details}
      
      </div>
  );
}
}



export default ImgMediaCard;