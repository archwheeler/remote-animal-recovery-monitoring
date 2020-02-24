import React from 'react';
import {RegisterAction} from './AccountAction';
import {store} from '../store';

class Account extends React.Component {

  constructor() {
    super();
    const rerenderer = store.subscribe(() => this.forceUpdate());
  }
  
	render() {	
    if (store.getState().loggedIn) {
      return (
        <div className="center">
          You are already logged in.
          <br/>
          
          <button className="blueButton" onClick={() => window.location.href = "/#/account"}>
            My Account
          </button> 
        </div>
      );
    } else {
      return (
        <div className="center">
          <form onSubmit={this.register}>
            Register
            <br/>
        
            <input type="text" id="username_box" placeholder="Username*" required/>
            <br/>
        
            <input type="password" id="password_box" placeholder="Password*" required/>
            <br/>
        
            <label>
              <input type="checkbox" onClick={this.showPassword}/>
              Show password?
            </label>
            <br/>
        
            <input type="submit" value="Register" />
            <br/>
          </form>
          
          <button className="text" onClick={() => window.location.href = "/#/login"}>
            Already have an account? Log in here
          </button>
        </div>
      );
    }
  }
  
  register() {
    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    
    store.dispatch(RegisterAction(username, password));
  }
  
  showPassword() {
	  var passBox = document.getElementById("password_box");
    if (passBox.type == "password") {
      passBox.type = "text";
    } else {
      passBox.type = "password";
    }
  }
}

export default Account;
