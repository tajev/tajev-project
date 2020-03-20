import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.css';

class Login  extends Component {
    state = { email:'',password:'', redirectToHome:false, isError:false };

    login = () => {
        this.setState({isError:false});
        axios.post("/users/login" , {
            email: this.state.email , 
            password: this.state.password})
            .then(res => {
                console.log(res);
                if(res.status === 200){

                    this.setState({redirectToHome:true});
                    this.props.setUser(res.data);
                }
                else{
                    this.setState({isError:true})
                    console.log(`error code : ${res.status}`);
                    
                }

            })
            .catch(err =>{
                this.setState({isError:true});
                console.log(err)
            })

    }
    render() { 

        const disabled = !this.state.email || !this.state.password;



        if(this.state.redirectToHome){
            return <Redirect to='/'/>    
        }
        return (  
            
<div>
         

            
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
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
             {this.state.isError ?  <p style={{color:'red'}}>Login error</p> : ""}
             <RaisedButton label="Login" primary={true}  
             disabled={disabled} onClick={this.login}
             style={{ borderRadius: 25 }}
             labelColor={'#FFFFFF'}
             backgroundColor={"#0066e8"}
             
             />
             
             <br/>
              <RaisedButton label="Register" href='./Register'
              link={true}
              className="btn btn-secondary btn-lg"
             />
         </div>
         </MuiThemeProvider>

          

            
         </div>

         
        );
    }
}
 
export default Login;

