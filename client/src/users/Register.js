import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './Register.css'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,

    },
  },
}));



const currencies = [
    {
      value: 'Male',
      label: 'Male',
     
    },
    {
        value: 'Female',
        label: 'Female',
      },]





class Register  extends Component {
    state = { 
        user:{
            email:'',
            password:'',
            passwordConfirm:'', 
            userName:"",
            sex:'',
        
        },
    
    redirectToHome:false, 
    isError:false, 
    passwordConfirm:"",
    showPassword: false,
    showPasswordConfirm:false,
   

};
UserNameHandleChange = e =>{
    this.setState({
        userName : e.target.value});
    // console.log(e.target.value);
  }

  UserNameHandleChange = userName => e => {
    this.setState({ user: { ...this.state.user, [userName]: e.target.value } });
  };








    // register = () => {
    //     this.setState({isError:false});
    //     axios.post("/users/register" , {
    //         email: this.state.email , 
    //         password: this.state.password})
    //         .then(res => {
    //             console.log(res);
    //             if(res.status === 201){
    //                 this.setState({redirectToHome:true});
    //                 this.props.setUser({email: this.state.email , password: this.state.password,  username:this.state.username})
                   
    //             }
    //             else{
    //                 this.setState({isError:true})
    //                 console.log(`error code : ${res.status}`);
                    
    //             }

    //         })
    //         .catch(err =>{
    //             this.setState({isError:true});
    //             console.log(err)
    //         })

    // }

    handleMouseDownPassword  = (event) => {
        this.setState({ password:event.target.value});
};
    
handleMouseDownPasswordConfirm = event => {
    this.setState({ passwordConfirm:event.target.value});
  };
  
        
      
    
    
         
    

    
    render() { 

       
        
        // const handleClickShowPassword = () => {
        //     this.setState({showPassword: true});
        //     console.log(this.state.ShowPassword);
        //   };
    
        
        //   const handleClickShowPasswordConfirm = () => {
        //     this.setState({showPasswordConfirm: true});
        //     console.log(this.state.showPasswordConfirm);
        //   };
        
        //   const handleMouseDownPassword = event => {
              
            
        //   };

        //   const handleMouseDownPasswordConfirm = event => {
              
            
        // };

    
        // const sexHandleChange= event =>{
        //     this.setState({sex: event.target.value});
        //     console.log(this.state.sex);
        //   }

          
        
         
          
      
          




        const disabled = !this.state.email || !this.state.password || !this.state.username;
        

        // const passwordHandleChange = prop => event => {
        //     setValues({ ...values, [prop]: event.target.value });
        //   };
        
        //   const handleClickShowPassword = () => {
        //     setValues({ ...values, showPassword: !values.showPassword });
        //   };
        
        //   const handleClickShowPasswordConfirm = () => {
        //     setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
        //   };
        
        //   const handleMouseDownPassword = event => {
        //     event.preventDefault();
        //   };
        
        //   const handleMouseDownPasswordConfirm = event => {
        //     event.preventDefault();
        //   };
        
        //   const confirmPasswordHandleChange= props =>event => {
        //     setValues({ ...values, [props]: event.target.value });
        //   };



        if(this.state.redirectToHome){
            return <Redirect to='/'/>    
        }
        return (  
            
<div>
    

            {/* Email <input  type='email' onChange={evt => this.setState({email: evt.target.value})}/><br/>
            Password <input  type='password' onChange={evt => this.setState({password: evt.target.value})}/><br/>
            {this.state.isError ?  <p style={{color:'red'}}>register error</p> : ""}
            <button  disabled={disabled} onClick={this.register}>register</button> */}

            <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />

{/* <TextField
             hintText="Enter your UserName"
             floatingLabelText="UserName"
             onChange={evt => this.setState({username: evt.target.value})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange={evt => this.setState({email: evt.target.value})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange={evt => this.setState({password: evt.target.value})}
               />
             <br/>
             {this.state.isError ?  <p style={{color:'red'}}>register error</p> : ""}
             <RaisedButton label="Register" primary={true}
             disabled={disabled} onClick={this.register}
             />
             
             <br/>
              <RaisedButton label="Login" href='./Login'
             
             
             /> */}


<form noValidate autoComplete="off">
     
        <h3>Account Information</h3>
     
        <div>

        <TextField
          id="outlined-textarea"
          label="User Name"
          placeholder="User Name"
          multiline
          variant="filled"
          style={{ width:"530px",  }}
           className='TextField'
         
        />

        </div>
     
      <div>
       
        <TextField
          id="outlined-textarea"
          label="First Name"
          placeholder="First Name"
          multiline
          variant="filled"
          className='TextField'
          
        />
        <TextField
          id="outlined-textarea"
          label="Last Name"
          placeholder="Last Name"
          multiline
          variant="filled"
          className='TextField'
        />
    
        
      </div>
      <div>
        <TextField
          id="outlined-textarea"
          label="Email Address"
          placeholder="Email Address"
          multiline
          variant="filled"
          className='TextField'
        />
        <TextField
          id="outlined-textarea"
          label="Confirm Email Address"
          placeholder="Confirm Email Address"
          multiline
          variant="filled"
          className='TextField'
        />
        
      </div>
      <div>
      <TextField
          id="standard-select-currency"
          select
          label="Select"
        //   value={values}
        //   onChange={sexHandleChange}
          helperText="Please select your sex"
          className='TextField'
        >
            {/* {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
             </TextField>
      <TextField
          id="outlined-textarea"
          label="Phone Number"
          placeholder="Phone Number"
          multiline
          variant="filled"
          className='TextField'
        /> 
      </div>

<h3>Account Protection</h3>
      <div>
        <TextField
          id="outlined-textarea"
          label="User Name"
          placeholder="User Name"
          multiline
          variant="filled"
          style={{ width:"540px",  }}
          className='TextField'
           onChange='UserNameHandleChange'
        />

        </div>


        <div>
        <FormControl  variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            className='TextField'
            onChange={evt => this.setState({password: evt.target.value})}
            
            // onChange={passwordHandleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                //   onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{ width:"30px",  }}
                  
                >
                  {this.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl  variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={this.showPasswordConfirm ? 'text' : 'password'}
            value={this.passwordConfirm}
            className='TextField'
            onChange={evt => this.setState({passwordConfirm: evt.target.value})}
            // onChange={confirmPasswordHandleChange('passwordConfirm')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPasswordConfirm}
                  onMouseDown={this.handleMouseDownPasswordConfirm}
                  edge="end"
                  
                >
                  {this.state.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
            
        </div>


    </form>

         </div>
         </MuiThemeProvider>


         




        

         </div>
        );
    }
}
 
export default Register;

