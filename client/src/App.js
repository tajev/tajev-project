import React, { Component } from "react";
import "./App.css";
import {BrowserRouter , Switch,Route,Link} from "react-router-dom";
import Home from './Pages/Home';
import Login from "./user/Login";
import Register from "./user/Register";
import Test from "./users/Test";
import ResetPassword from "./user/ResetPassword";
import Logout from "./user/Logout";
import ForgotPassword from "./user/ForgotPassword";
import HeaderPage from "./HeaderPage.js";
import NewUser from "./user/NewUser";
import Terms from "./user/Terms";
import HomeRedirect from './Pages/HomeRedirect';




 import "bootstrap/dist/css/bootstrap.min.css";

// import A from "./users/1.js";
// import Logout from "./users/logout.js";






class App extends Component {
  // url = "/api";
  // state = { data: "" };

  state = {
    
    user: "" };

  setUser = user => {
    this.setState({user:user})
  }

  // clickHandler = () => {
  //   console.log("clicked");
  //   axios
  //     .get(this.url)
  //     .then(res => {
  //       console.log(res.data.res);
  //       this.setState({ data: res.data.res });
  //     })
  //     .catch(err => console.log(err));
  //   // fetch(this.url)
  //   //   .then(res => res.json())
  //   //   .then(data => this.setState({data : data.res}))
  //   //   .catch(err => console.log(err));
  // };

  render() {
    return (
      <div className="App">
         <BrowserRouter>
         <HeaderPage/>
      {this.state.user ?<Link to='/'>Home</Link> : ''}
      {!this.state.user ? <Link to='/Login'>Login</Link> : ""}
      {!this.state.user ? <Link to='/Register'>Register</Link> : ''}
      {!this.state.user ? <Link to='/Test'>Test</Link> : ''}
      {!this.state.user ? <Link to='/ResetPassword'>ResetPassword</Link> : ''}
      {/* {this.state.user ?<Link to='/1' >1</Link> : ''} */}
      {/* {this.state.user ?<Link to='/Longout' >Longout</Link> : ''}
      {this.state.user ?<Link to='/Page' >Photo App</Link> : ''} */}
       {!this.state.user ? <Link to='/newUser'>NewUser</Link> : ""}
       {!this.state.user ? <Link to='/Terms'>Terms</Link> : ""}
      
      
      
      <Switch>
        <Route exact path='/' component={Home}/>
         <Route exact path='/Login'   render={()=> <Login setUser={this.setUser}/>} />
        {/* <Route exact path='/Register' render={()=> <Register setUser={this.setUser}/>}/> */}
        <Route exact path='/Test' render={()=> <Test setUser={this.setUser}/>}/>
        {/* <Route exact path='/ResetPassword' render={()=> <ResetPassword setUser={this.setUser}/>}/> */} */}
        {/* <Route exact path='/1' component={A}/>
        <Route exact path='/logout'   render={()=> <Logout setUser={this.setUser}/>}/>
        <Route exact path='/Page'   render={()=> <TopBar setUser={this.setUser}/>}/> */}

<Route exact path="/login" render={()=><Login email={this.state.email} setEmail={this.setEmail} setToken={this.setToken} setManager={this.props.setManager} resetPsdSuccessed={this.state.resetPsdSuccessed} />} />
          <Route exact path="/logout" render={()=><Logout setEmail={this.setEmail} setToken={this.setToken}/>} />
          <Route exact path="/register" render={()=><Register setEmail={this.setEmail}/>} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
      ``    <Route exact path="/resetPassword" render={(props)=><ResetPassword {...props} setEmail={this.setEmail} setResetPsdSuccessed={this.setResetPsdSuccessed} />} />
      <Route exact path="/newUser" component={NewUser} />
      <Route exact path="/Terms" component={Terms} />
      <Route exact path="/HomeRedirect" component={HomeRedirect} />
  
          
                  
      
 

     


        
        

      </Switch>
      
      
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
