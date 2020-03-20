  
import React, { Component } from "react";
// import "../pages/PageTemplate.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CardDeck from 'react-bootstrap/CardDeck';
import  './ResetPassword.css';


class ResetPassword extends Component {   

  resetPsdUrl = "/users/resetPassword";
  
  state = {
    user : {
      email: "",
      password: "",
      repeatPassword: ""
    }, 
    redirectToLogin: false,
    isError: false,
    resetPsdSuccessed: true,  ////*??
    buttonSending: false
  };
 
  redirectToLogin = () => {
    console.log('login');
    this.setState({ redirectToLogin: true });
  };

  hashCode = s => {
    return s.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  handleChange = name => e => {
    this.setState({ user: {...this.state.user, [name]: e.target.value},
    });
  };

  clickResetPassword = e => {
    
    this.setState({ buttonSending:true, isError: false });
    
    axios
      .put(this.resetPsdUrl, {
        email: this.state.user.email,
        password: this.hashCode(this.state.user.password),
        // token: this.props.match.params.token
      })
      .then(res => {
    
        console.log("then axios");
        console.log('res.data: '+res.data);
    
        if (res.status === 200) {
         console.log(this.state.user.email);
          this.props.setEmail(this.state.user.email);
          this.props.setResetPsdSuccessed();
          console.log(this.props);
          this.setState({ redirectToLogin: true });
        } else {
          this.setState({ buttonSending:false, isError: true });
          console.log("can not reset your password. please try again later");
        }
      })
      .catch(err => {
        this.setState({ buttonSending:false, isError: true });
        console.log(err);
      });
  };

  render() {
    const disabled = !this.state.user.email || !this.state.user.password || !this.state.user.repeatPassword;

    const inputData = [ { type : "email", placeholder : 'כתובת דוא"ל', onChange : this.handleChange('email') },
                        { type : "password", placeholder : "סיסמא", onChange : this.handleChange('password') },
                        { type : "password", placeholder : "הקש שוב את הסיסמא", onChange : this.handleChange('repeatPassword') }
                      ];
    
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;  
    };
   
    return (
      <div className="ResetPassword" >
        
        <CardDeck>
        
          {inputData.map((item,i) => 
          
              <div className="form-group" key={i}>
                <input
                  type= {item.type}
                  id= "email"
                  className="form-control"
                  placeholder={item.placeholder}
                  required={true}
                  onChange= {item.onChange}
                />
                
                
              </div>
            )}
        </CardDeck>
         
        <div style={{ height: "10px" }}>
          {this.state.isError? <p style={{color:'red',fontSize:'10px',lineHeight:'1px !important;',marginTop:'0',marginBottom:'0'}}> בעיית כניסה</p>:''}
        </div>
        

        <button
          id="btn-log-in"
           className="btn btn-lg btn-primary btn-block"
          type="submit"
          disabled={disabled} 
          onClick={this.clickResetPassword}
          className="buttenResetPassword"
         
         
        >
          {!this.state.buttonSending ? <span>שלח</span> : <span>שולח...</span>}
        </button>
              
      </div>
    );
  }
}

export default ResetPassword;