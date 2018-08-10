import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Button from '@material-ui/core/Button';





class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
    }

  }

  setTaskvalue = (event) => {
    this.setState({
      currentValue: event.target.value
    })
  }

  editValue = (changed, initial) => {
    this.props.editList(changed, initial)
  }

  addTask = () => {
    if (this.state.currentValue !== "") {
      this.props.addedList(this.props.title, this.state.currentValue);
      this.setState({
        currentValue: ""
      })
    }
  }

  addDataOnDrag(title,value){
    this.props.addedList(title,value);
  }

  deleteValue = (title,data) => {
    this.props.deleteList(title,data);
  }


  deleteList =()=>{
    this.props.deleteMainList(this.props.title);
  }

  render() {
    return (
      <div id="div" style={{ margin: 20, width: 400, alignItem: 'center',backgroundColor:' #e2e4e6' }}>
        <div style={{backgroundColor:' #e2e4e6',width: 380,marginLeft:10,marginTop:10,display:'flex',justifyContent:'space-between'}}><span><b>{this.props.title}</b> </span> <i className="fa fa-trash" onClick={this.deleteList}/></div>
        <Dashboard addDataList={(title,value) => this.addDataOnDrag(title,value)} title={this.props.title} listValue={this.props.listItem} deleteList={(title,data)=>this.deleteValue(title,data)} editList={this.editValue} />
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <textarea value={this.state.currentValue} onChange={(event) => this.setTaskvalue(event)} className="inputArea" name="inputTask" rows="4" cols="50" placeholder="Add your task here..." />
          <Button size="small" style={{height:50,margin:10}} variant="contained" color="primary" onClick={() => this.addTask()}>
          Add task
        </Button>
        </div>
      </div>
    );
  }
}


export default Main;
