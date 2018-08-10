import React, { Component } from 'react';
import './App.css';
import Tasklist from './Tasklist';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Dashboard extends Component {
  
  
    state = {
        open: false,
        changedName:'',
        initialValue:'',
      };

      handleClickOpen = () => {
        this.setState({ open: true,  changedName:''});
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };  

    editTask=(data)=>{
        this.setState({ open: true,changedName: data,initialValue:data});
    }

    deleteTask=(title,data)=>{
        this.props.deleteList(title,data);

    }

 
    
    addList=()=>{
        const result =[]
        this.props.listValue.forEach((value,index)=>{
            result.push(<Tasklist  title={this.props.title} task={value} key={index} deleteTask={(title,data)=>this.deleteTask(title,data)} editTask={this.editTask}/>)
          });
           return result;
    }

    handleChange = name => event => {
        this.setState({
            changedName: event.target.value,
        });
        
      };

      editData =()=>{
          if(this.state.changedName!==this.state.initialValue){
          this.props.editList(this.state.changedName,this.state.initialValue);
          this.setState({ open: false });
          }
      }

      allowDrop=(ev)=> {
        ev.preventDefault();
       
    }

   
    
    drop =(ev)=> {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var dataValue =  ev.dataTransfer.getData("title");
      if(data){
      this.props.addDataList(this.props.title,data);
      this.props.deleteList(dataValue,data);
      
      

      }
    }
 
  
   
    render() {
      
        return (
            <div   onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)} className="listItemStyle">
            <ul>
           {this.addList() }
          </ul>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Task"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField
          id="name"
          label="Name"
          value={this.state.changedName}
          onChange={this.handleChange('name')}
          margin="normal"
        />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.editData()} color="primary">
              OK
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>   
            </div>
         );
    }
  }
  
  
  export default Dashboard;