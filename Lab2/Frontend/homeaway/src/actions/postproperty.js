import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken';
import rootURL from '../config.js';
export const PROPERTY_LOCATION = "add_property_location";
export const PROPERTY_DETAILS = "add_property_details";
export const PROPERTY_PHOTOS= "add_property_photos";
export const PROPERTY_PRICE = "add_property_price_date";
export const PROPERTY_TO_DATABASE= "post_property_to_database";
export const PAGE_STEP="set_page_no";
export const PROPERTY_TO_DATABASE_ERROR="post_erro";


export const  set_property_location=(location)=>{
    return{
        type:PROPERTY_LOCATION,
        payload:location
    }
}

export const  set_property_details=(details)=>{
    return{
        type:PROPERTY_DETAILS,
        payload:details
    }
}

export const  set_property_photos=(photos)=>{

    console.log("photos to be posted",photos);
    return{
        type:PROPERTY_PHOTOS,
        payload:photos
    }
}

export const  set_property_price_date=(priceanddate)=>{
    return{
        type:PROPERTY_PRICE,
        payload:priceanddate
    }
}

export const set_step=(step)=>{
    return{
        type:PAGE_STEP,
        payload:step
    }
}

export const post_property_to_db=(data)=>{
    setAuthorizationToken(localStorage.getItem('jwtToken'));

    return dispatch => {
        // var photos = [];
        // for(let pair of data.entries()) {
        //     if(pair[0] === 'photos'){
        //         photos.push(JSON.parse(pair[1]))
        //     }    
        // }
       
        // data.delete('photos');
        // for(var i=0;i<photos.length;i++){
        //     console.log(photos[i]);
        //     data.append("photos",photos[i]);
        // }
        // for(let pair of data.entries()) {
        //     console.log(pair[1]);
        // }
        axios.post(rootURL+'/postproperty',data).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
      };
}

export const getSuccess = (response) => {
    return {
        type: PROPERTY_TO_DATABASE,
        payload:response
    };
  };

  export const getError = (response) => {
    return {
     type:PROPERTY_TO_DATABASE_ERROR,
     payload:response
    };
  };