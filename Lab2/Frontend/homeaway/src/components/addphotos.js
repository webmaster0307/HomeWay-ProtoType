import React, { Component } from 'react';
import '../../src/CSS/postproperty.css';
import Logo1 from '../../src/logo-bceheader.svg';
import expedia from '../../src/birdhouse-bceheader.svg';
import { connect } from "react-redux";
import * as actioncreator from '../actions/postproperty.js';
import ReactDropzone from "react-dropzone";
//var files=[];
var filespreview=[];
var minCount=2;
var maxCount=4;
var dropstyle={
"height": "200px",
"borderWidth": "2px",
"borderColor": "rgb(126, 125, 125)",
"borderStyle":"dashed",
"borderRadius": "5px",

}
class  AddPhotos extends Component{

    constructor(){
        super();
        this.state={
            files:[]
        }

        this.nextstep=this.nextstep.bind(this);
        this.prevstep=this.prevstep.bind(this);
        this.onDrop=this.onDrop.bind(this);
    }
   nextstep=(e)=>{
    console.log("In next Step");
    e.preventDefault();

    console.log("files available",this.state.files);
    var data={
        photos:this.state.files
        
    }
    this.props.set_property_photos(data);
    this.props.set_step(4);
}
 prevstep=(e)=>{
  
  e.preventDefault();
  var data={
      photos:this.state.files
      
  }
  this.props.set_property_photos(data);
  this.props.set_step(2);
}

componentWillMount(){
    this.setState({
        files:this.props.files
    })
}


 onDrop = (images) => {
    // POST to a test endpoint for demo purposes
console.log("images droppeed",images);
    if(this.state.files.length<=maxCount){
        images.forEach(file => {
            //files.push(file);
            this.setState({
                files:this.state.files.concat(file)
            })
          });

    }else{
        alert("U can upload maximum of 5 files");
    }

    
  }

// var addPhotos=(e)=>{
//     let i;
//     for(i=0;i<e.target.files.length;i++){
       
//         files.push(e.target.files[i]);
//         }
    
// }


  render(){

  return(
    <div className="App">
    <div>
    <nav className="navbar navbar-default">
                  <div className="container-fluid">
                      <div className="navbar-header">
                          <a className="navbar-brand" href="/"><img className="brand" src={Logo1} /></a>
                      </div>
                      <ul className="nav navbar-right">
                          <li><img src={expedia} /></li>
                      </ul>
                  </div>
              
          
                  </nav>
    
    
    
    </div>
    <form id="msform" action="" method="post">
   






        <fieldset>
            <div id="heading" className="panel panel-default">
                <div id="verifications" className="panel-heading"><h3>Add Photos
                </h3><hr /></div>

                <div className="panel-body">
                <label><h4>Add Photos</h4></label>
        <center>
        
        <div>
        <ReactDropzone
        onDrop={this.onDrop} style={dropstyle}>
       <h3>Add a maximum of 5 images for your property</h3>
      </ReactDropzone>
      </div>
          
          </center>
                     <label>{filespreview}</label>           
                       <br/>         
                    <button id="back" type="button" className="btn btn-outline-primary" onClick={this.prevstep}>Back</button>
                    <span id="next"><button  id="next1"type="button" className="btn btn-primary" onClick={this.nextstep}>Next</button></span>

                    
                </div>

                </div>

        </fieldset>
    </form>

</div>
  );
}
  
}
function mapStateToProps(state) {
    console.log("in map state property_photos",state);
    return { files: state.property_photos.files
    };
  }

  const mapDispachToProps = dispatch => {
    return {
    set_property_photos: (photos) => dispatch(actioncreator.set_property_photos(photos)),
    set_step:(step)=>dispatch(actioncreator.set_step(step))
    };
  };

  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(AddPhotos);
  