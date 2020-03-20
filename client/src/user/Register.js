import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
// import "../pages/PageTemplate.css";
import Terms from './Terms';
import {Button, ButtonToolbar} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import  './login.css';
import HomeRedirect from '../Pages/HomeRedirect';



class Register extends Component {
  registerUrl = "/users/register";
  
  state = {
    user: {
      email: "",
      password: "",
      repeatPassword: "",
      IDnumber:"",
      phoneNumber:""
    },
    redirectToStudent: false,
    errorNum: 0,
    IDnumberAccRules:true,
    passwordAccRules: true,
    repeatPasswordIsSame: true,
    showModal: true,
    buttonSending: false,
    addModalShow:false,
    terms:false,
    checkboxTerms:false,
    redirectToLogin: false,
    


  };

  hashCode = s => {
    return s.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };
  clickRegister = e => {
    e.preventDefault();
    this.setState({ buttonSending: true, errorNum: 0 });
    axios
      .post(this.registerUrl, {
        IDnumber: this.state.user.IDnumber,
        email: this.state.user.email,
        password: this.state.user.password,
        phoneNumber: this.state.user.phoneNumber,
        // manager:false
      })
      .then(res => {
        if (res.status === 201) {
          this.setState({ redirectToStudent: true });
          this.props.setEmail(this.state.user.email);
          this.handleClose();
        } else {
          this.setState({ buttonSending: false, errorNum: res.status });
        }
      })
     
      .catch(err => {
        this.setState({ buttonSending: false, errorNum: err.response.status });
      }
      );
      
  };
  
  getErrorText = () => {
    let txtError = "";
   
    switch (this.state.errorNum) {
      case 404:
        txtError = "משתמש קיים במערכת";
        break;
     
      case 500:
        txtError = "אחד מהנתונים שהזנת אינם חוקים";
        break;
      default:
        txtError = "Error";
    }
    return txtError;
    
  };
  checkboxTermsChange = e => {
    //this.setState({ password: e.target.value });
     this.setState({ checkboxTerms:true });
    // console.log(this.state.checkboxTerms)

    if (
      !this.state.checkboxTerms
    ) {
      this.setState({ checkboxTerms: false });
    } else {
      this.setState({ checkboxTerms: true });
    }
    console.log(`checkboxTerms is : ${this.state.checkboxTerms}`);
    console.log(` terms is : ${this.state.terms}`)
  };


  IDnumberChange = e => {
    //this.setState({ password: e.target.value });
    this.setState({ user: { ...this.state.user, IDnumber: e.target.value } });
    console.log(this.state.user.IDnumber)

    if (
      e.target.value.length === 0 ||
      (e.target.value.length > 8 && e.target.value.length < 10)
    ) {
      this.setState({ IDnumberAccRules: true });
    } else {
      this.setState({ IDnumberAccRules: false });
    }
    console.log(e.target.value.length)
  };

  login = () => {
    this.setState({ redirectToLogin: true });
  };

  passwordChange = e => {
    //this.setState({ password: e.target.value });
    this.setState({ user: { ...this.state.user, password: e.target.value } });

    if (
      e.target.value.length === 0 ||
      (e.target.value.length >= 6 && e.target.value.length <= 12)
    ) {
      this.setState({ passwordAccRules: true });
    } else {
      this.setState({ passwordAccRules: false });
    }
  };
  repeatPasswordChange = e => {
    let tmpRepeatPassword = e.target.value;
    this.setState({
      user: { ...this.state.user, repeatPassword: e.target.value }
    });
    
    if (
      this.state.user.password === tmpRepeatPassword &&
      tmpRepeatPassword.length > 1
    ) {
      this.setState({ repeatPasswordIsSame: true });
    } else {
      this.setState({ repeatPasswordIsSame: false });
    }
  };
  handleChange = name => e => {
    this.setState({ user: { ...this.state.user, [name]: e.target.value } });
    console.log(this.state.user);
  };
  handleClose = () =>
    this.setState({ showModal: false, redirectToStudent: true });


  render() {

let addModalClose = ()=> this.setState({addModalShow:false})

    const disabled =
      !this.state.user.email ||
      !this.state.user.password ||
      !this.state.passwordAccRules ||
       !this.state.repeatPasswordIsSame||
       ! this.state.user.repeatPassword||
       !this.state.user.IDnumber||
      //  !this.state.user.checkboxTerms||

        !this.state.user.phoneNumber

      // !this.state.addModalShow
      ;

    if (this.state.redirectToStudent) {
      return <Redirect to="/HomeRedirect" />;
    }

    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
     }
    
    return (
      <div className="pageTemplate backTemp">
        <h2>ברוכים הבאים</h2>
        <div className="cardLogin">
          <div className="card-body">
            <div className="form-group" style={{ marginBottom: "4px" }}>
              <input
                type ="email"
                id = "email"
                className ="form-control"
                placeholder ='כתובת דוא"ל'
                required = ""
                onChange = {this.handleChange("email")}
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div className="form-group" style={{ marginBottom: "4px" }}>
              <input
                type="number"
                className="form-control"
                placeholder="תעודת זהות"
                required=""
                onChange={e => this.IDnumberChange(e)}
              />
            </div>
            {this.state.IDnumberAccRules ? (
                ""
              ) : (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    lineHeight: "10px"
                  }}
                >
                  {" "}
                  התעודת זהות אינו חוקי
                </p>
              )}
               <div style={{ height: "20px" }}></div>
<div className="form-group" style={{ marginBottom: "4px" }}>
              <input
                type ="text"
                className ="form-control"
                placeholder ='מספר טלפון'
                required = ""
                onChange = {this.handleChange("phoneNumber")}
              />
            </div>


            <div style={{ height: "20px" }}></div>
            <div className="form-group" style={{ marginBottom: "4px" }}>
              <input
                type="password"
                className="form-control"
                placeholder="סיסמא"
                required=""
                onChange={e => this.passwordChange(e)}
              />
            </div>

            <div style={{ height: "20px" }}>
              {this.state.passwordAccRules ? (
                ""
              ) : (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    lineHeight: "10px"
                  }}
                >
                  {" "}
                  אורך סיסמא חייב להיות בין 6 ל12 תווים
                </p>
              )}
            </div>
            <div className="form-group" style={{ marginBottom: "4px" }}>
              <input
                type="password"
                className="form-control"
                placeholder="הכנס סיסמתך שוב"
                required=""
                onChange={e => this.repeatPasswordChange(e)}
              />
            </div>
            <div style={{ height: "20px" }}>
              {this.state.repeatPasswordIsSame ? (
                ""
              ) : (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    lineHeight: "10px"
                  }}
                >
                  {" "}
                  הסיסמאות אינן תואמות
                </p>
              )}
            </div>
            {this.state.errorNum > 0 ? (
              <p style={{ color: "red" }}> {this.getErrorText()} </p>
            ) : (
              ""
            )}
<ButtonToolbar>
  {/* <Button
  variant='primary'
  onClick={()=>this.setState({addModalShow:true})}>
    תקנון
  </Button>
  <Terms
  show={this.state.addModalShow}
  onHide={addModalClose}
  /> */}


{/* <Form.Group controlId="formBasicCheckbox" >
<label style={{textAlign:"right", marginLeft:"220px"}}>
<Form.Check type="checkbox" 
    onClick={()=>this.setState({addModalShow:true})}
    
    
    
    
    /> קראתי ואני מסכים  <a href='./Terms' > לתנאי השימוש </a>

</label>
    
      {/* <a>jjj</a>
      <Terms
  show={this.state.addModalShow}
  onHide={addModalClose}
  /> */}

     
  {/* </Form.Group> */} 

  <label className="checkboxRegister" >
<input type="checkbox" 
    
    onClick={()=>this.setState({checkboxTerms:true})}
    style={{ float:"right" , marginTop:'0px', marginLeft:"3px"}}
    
    
    
    
    
    
    />    קראתי ואני מסכים    <a href='./Terms' onClick={()=>this.setState({terms:true})} > לתנאי השימוש </a> <br/>

</label>

              {!this.state.checkboxTerms ? (
                ""
              ) : (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    lineHeight: "10px"
                  }}
                >
                  {" "}
                  אנא היכנסו ללינק ואשרו את מדיניות  האתר 
                </p>
              )}
  

  

</ButtonToolbar>

{this.state.checkboxTerms ? (
                ""
              ) : (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    lineHeight: "10px"
                  }}
                >
                  {" "}
                  אנא אשרו את מדיניות  האתר 
                </p>
              )}

              
            <button
              id="btn-log-in"
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              disabled={disabled}
              onClick={this.clickRegister}
              style={{ backgroundColor: "#37889A" }}
            >
              {!this.state.buttonSending ? (
                <span>רישום</span>
              ) : (
                <span>שולח...</span>
              )}
            </button>

           <div style={{float:"right", display:"inline-block"}}>
           <div className="pt-3 d-inline-block btn" onClick={this.login} style={{color:'#37889A'}}>
               אודות
            </div>
           <div className="pt-3 d-inline-block btn" onClick={this.login} style={{color:'#37889A'}}>
                כניסה למשתמש קיים
            </div>
           
           </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;