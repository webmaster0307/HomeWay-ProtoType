import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      expression:"",
      
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
      expression:e.target.value
    })
  }
  componentDidMount(){

  }
  calculateResult=()=>{
    var data={
     expression:this.state.expression
    }
  
    axios.post("http://localhost:3001/calculate",data)
    .then(res=>{
      
      console.log("Response Status : "+res.status);
      this.setState({
        result:res.data
      })
      
    }

    );
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
                  <button onClick = {this.calculateResult} className="btn btn-primary">Submit</button>                 
          </div>
      </div>
  
      
    );
  }
}

export default App;
