import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      expression:"",
      errMessage:null,

      result:null
    }
    this.handleChange=this.handleChange.bind(this);
  }
  addOperator=(op)=>{
    this.setState({
      expression:this.state.expression.concat(op)
    })

  }
  handleChange(e){
    this.setState({
      expression:e.target.value,
    })
  }
  
  calculateResult=()=>{
    if(this.state.expression==""){
      this.setState({
        errMessage:"Enter the expression to be evaluated"
      })
      return;
    }
    var data={
     expression:this.state.expression
    }
  
    axios.get("http://localhost:3001/calculate",{params:{
      expression:this.state.expression
     }})
    .then(res=>{
      let temp=JSON.stringify(res);
      temp=JSON.parse(temp);
      console.log("Temp",temp);
      this.setState({
        result:temp.data,
        errMessage:null
      })
      
    }

    ).catch(error=>{
      this.setState({
        errMessage:"Expression to be evaluated is invalid"
      })
    });
  }

  
  render() {
    
    return (
      <div className="calculator-form">
          <div className="main-div">
              <div className="panel">
                  <h1>Calculator</h1>
                  <br/>
              </div>
              <span className="form-group">
             <label>Input: </label>
              <input  id="input" type="text" onChange={this.handleChange} className="display-control"  value={this.state.expression}/>
             </span>
             <span className="form-group">
              <label>Result: </label>
              <input  type="text" className="result-control" value={this.state.result} disabled/>
             </span>
            <br/>
             <br/>
               
                  <span className="form-group">
                      <button  name="Add" onClick={(e)=>{this.addOperator(e.target.value)}} className="form-control" value="+">+</button>
                  </span>
                  <span className="form-group">
                  <button  name="Subtract" onClick={(e)=>{this.addOperator(e.target.value)}} className="form-control" value="-">-</button>
                  </span>
                  <span className="form-group">
                  <button  name="Multiply" onClick={(e)=>{this.addOperator(e.target.value)}} className="form-control" value="*">*</button>
                  </span>
                  <span className="form-group">
                  <button  name="Division" onClick={(e)=>{this.addOperator(e.target.value)}} className="form-control" value="/">/</button>
                  </span>
                  <br/>
                  <br/>
                  <button onClick = {this.calculateResult} className="btn btn-primary">Submit</button> <br/><br/>
                  <span style={{color:"red"}}>{this.state.errMessage}</span>             
          </div>
      </div>
  
      
    );
  }
}

export default App;
