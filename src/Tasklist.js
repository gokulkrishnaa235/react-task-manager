import React, { Component } from 'react';
import './App.css';

  class Tasklist extends Component{


   drag=(ev)=> {
      ev.dataTransfer.setData("text", ev.target.id);
      ev.dataTransfer.setData("title",this.props.title);
  }

  deleteData=()=>{
    this.props.deleteTask(this.props.title,this.props.task)
  }

  editData=(data)=>{
    this.props.editTask(data)
  }
  
  render() {
  return (
     <div 
     id={this.props.task}  draggable="true" onDragStart={(event)=>this.drag(event)}
      className="listStyle">
         <span>{this.props.task}</span>
         <div  style={{width:50,paddingleft:4,float:'left'}}>
         <i className="fa fa-edit" onClick={()=>this.editData(this.props.task)}/>
         <i className="fa fa-trash" onClick={()=>this.deleteData()}/>
         </div>
     </div>    
  );
}
}



export default Tasklist;