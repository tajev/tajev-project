import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import "../pages/PageTemplate.css";
import  './login.css';
// import validator from 'validator';

class NewUser extends Component {

  forgotPsdUrl = "/users/newUser";

  state = {
    user: {
      email: '',
      password: "",
      IDnumber:"",

    }, 
    errorNum:"0",
    isError: false,
    redirectToRegister: false,
    redirectToLogin: false,
    sentEmailSuccessed: false,
    buttonSending: false
  };

  constructor(props) {
    super(props);
    if(props.location.email){
      this.state.user.email = props.location.email.email || '' ;
    }
    // if(props.location.IDnumber){
    //   this.state.user.IDnumber = props.location.IDnumber.IDnumber || '' ;
    // }
    
  }

  register = () => {
    this.setState({ redirectToRegister: true });
  };
  
  login = () => {
    this.setState({ redirectToLogin: true });
  };

  //  clickForgotPsd = () => {
  clickForgotPsd = e => {

    this.setState({ buttonSending:true, isError: false });

    axios
      .post(this.forgotPsdUrl, {
        email: this.state.user.email,
        IDnumber: this.state.user.IDnumber
      })
      .then(res => {
        console.log('hhh'+ this.state.user.IDnumber)  ;
        if (res.status === 201) {
          // console.log(sentEmailSuccessed);
          this.setState({ sentEmailSuccessed: true });
         
        } else {
          this.setState({ buttonSending: false, errorNum: res.status });
        }
      })
      .catch(err => {
        this.setState({ buttonSending: false, errorNum: err.response.status });
      });
    

    // .catch(err =>{
    //     this.setState({isError:true});
    //     console.log(err)
    // })
  };


  getErrorText = () => {
    let txtError = "";
    console.log(this.state.errorNum);
    switch (this.state.errorNum) {
      case 400:
        txtError = "התעודת זהות קיימת במערכת";
        break;
     
      case 500:
        txtError = "אחד מהנתונים שהזנת אינם חוקים";
        break;
        case 200:
          txtError = "המייל נשלח בהצלחה";
      default:
        txtError = "Error";
    }
    return txtError;
  };

  // emailAccRules = e => {
   
  //   this.setState({ user: { ...this.state.user, mail: e.target.value } });

  //   if (
  //     e.target.value !== /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/) {
  //     this.setState({ passwordAccRules: true });
  //   } else {
  //     this.setState({ passwordAccRules: false });
  //   }
  // };

  render() {

    const disabled = 
    !this.state.user.email || 
    !this.state.user.IDnumber;

    if (this.state.redirectToLogin) {
       return <Redirect to="/Login" />;
    }

    if (this.state.redirectToRegister) {
     return <Redirect to="/register" />;
    }

    // const email = (value) => {
    //   if (!validator.isEmail(value)) {
    //     return `${value} is not a valid email.`
    //   }
    // };

    return (
      this.state.sentEmailSuccessed
      ?
      <div className="pageTemplate backTemp">
          נשלח מייל עם קישור וסיסמא ראשונית להתחברות לכתובת שמילאת
        
      </div>
      :
      <div className="pageTemplate backTemp" >
        <div className="cardLogin" > 
          <div className="card-body" >
            
            <div className="form-group">
              <input
              // name='email'
              // validations={[required, email]}
                type="email"
                id='email'
                className="form-control"
                placeholder='כתובת דוא"ל'
                value={this.state.email}
                required={true}
                onChange = {(e) => this.setState({ user: {...this.state.user, email: e.target.value}})}
              />
              <br/>
              <input
              type="number"
              id='IDnumber'
              className="form-control"
              placeholder='תעודת זהות'
              value = {this.state.user.IDnumber}
              required={true}
              onChange = {(e) => this.setState({ user: {...this.state.user, IDnumber: e.target.value}})}
            />
            </div>   
            {this.state.errorNum > 0 ? (
              <p style={{ color: "red" }}> {this.getErrorText()} </p>
            ) : (
              ""
            )}                  
            
            <button
              id="btn-log-in"
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              disabled={disabled} 
              onClick={this.clickForgotPsd}
              className='textLogin'
              
            >
              {!this.state.buttonSending ? <span>שליחת מייל להתחברות ראשונית לאתר</span> : <span>שולח...</span>}
            </button>

            {/* <div className="pt-3 d-inline-block btn" onClick={this.login} style={{color:'#37889A'}}>
              כניסה למשתמש קיים
            </div> */}
          
            {/* <div className="pt-3 d-inline-block btn" onClick={this.register} style={{color:'#37889A'}}>
              הירשם כעת
            </div> */}

          </div>
        </div> 
      </div> 
    );
  }
}

export default NewUser;