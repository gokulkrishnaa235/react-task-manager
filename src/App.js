import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})



class App extends Component {

  
  
  constructor(props){
    super(props);
    this.state={
      overAllList:[],
      currentValue:"",
      open:false ,
      changedName:''
    }
  
  }

  

  addNewListData=()=>{
    let tempList =[...this.state.overAllList];
    let valueArray={};
    valueArray.listName=this.state.changedName;
    valueArray.taskList=[];
    tempList.push(valueArray);
    this.setState({
      overAllList:tempList,
      open:false
    })
  }

  addedTaskList=(title,data)=>{
    let tempList=[...this.state.overAllList];
    tempList.forEach((value,index)=>{
      if(value.listName===title){
        if(value.taskList.length !==0){
        value.taskList.forEach((instance,index)=>{
          if(instance !== data){
            value.taskList.push(data);
          }
        })
      }else{
        value.taskList.push(data);
      }
    }
    })

    this.setState({
      overAllList:tempList
    })

  }


  editTaskList=(changed,initial,title)=>{
    let tempList=[...this.state.overAllList];
    tempList.forEach((value,index)=>{
      if(value.listName===title){
        value.taskList.forEach((instance,index)=>{
          if(instance === initial){
          value.taskList[index]=changed;
          }
        })
       
      }
    })

    this.setState({
      overAllList:tempList
    })
  }

  deleteMainList=(title)=>{
    let tempList=[...this.state.overAllList];
    tempList.forEach((value,index)=>{
      if(value.listName===title){
        tempList.splice(index,1);
      }
    });

    this.setState({
      overAllList:tempList
    })

  }

  deleteTaskList=(title,data)=>{
    let tempList=[...this.state.overAllList];
    tempList.forEach((value,index)=>{
      if(value.listName===title){
        value.taskList.forEach((instance,index)=>{
          if(instance ===data){
          value.taskList.splice(index,1);
          }
        })
       
      }
    })

    this.setState({
      overAllList:tempList
    })
  }

  mountList =()=>{
    const result =[]
   this.state.overAllList.forEach((value,index)=>{
        result.push(<Main deleteMainList={this.deleteMainList} key={value} addedList={this.addedTaskList} editList={(changed,initial)=>this.editTaskList(changed,initial,value.listName)} 
          deleteList={(title,data)=>this.deleteTaskList(title,data)}
          title={value.listName} listItem={value.taskList}/>)
       });
       return result;
  }


  addNewList=()=>{
    this.setState({
      open:true,
      changedName:''
    })

  }

  handleClose = () => {
    this.setState({ open: false });
  }; 

  handleChange = name => event => {
    this.setState({
        changedName: event.target.value,
    });
    
  };

  render() {
    const { classes } = this.props;
   

 
    return (
      <div>
         <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Task Management
          </Typography>
        </Toolbar>
      </AppBar>
        <div style={{display: 'flex',flexWrap: 'wrap'}}>
    {this.mountList()}
    <Button onClick={this.addNewList} variant="fab" className={classes.button} color="primary" aria-label="Add">
        <AddIcon />
      </Button>
    </div>
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add New List"}</DialogTitle>
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
            <Button onClick={this.addNewListData} color="primary">
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
