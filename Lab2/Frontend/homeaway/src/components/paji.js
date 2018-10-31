import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import displayimg from '../../src/ownerlogin.png';
import axios from 'axios';
import _ from "lodash";
import SearchProperty from './searchproperty'
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';

// const styles = {
//   card: {
//     maxWidth: 600,
//   },
//   media: {
//     // ⚠️ object-fit is not supported by IE11.
//     objectFit: 'cover',
//   },
// };



class Pagination1 extends Component{
constructor(props){
    super(props);
this.state={
   

}
    
}


  render(){
    
    const { itemsCount, pageSize, currentPage, onPageChange} = this.props;
    // console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    const pages = _.range(1,pagesCount+1); //return an array
    
            
  return (
      <div>
      <h1>sdsfd</h1>
      
      <div>
<nav style={{color:"red"}}> 
<ul className="pagination">
{pages.map(page => (
<li className={page === currentPage ? "page-item active" : "page-item "} key= {page}>
<a className="page-link" onClick={()=>{onPageChange(page)}}>{page}</a>
</li>

))}
</ul>
</nav>
</div>
      
      </div>
  );
}
}



    
    
   
  export default Pagination1;