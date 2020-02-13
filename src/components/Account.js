import React, {forceUpdate} from 'react';
import {connect} from 'react-redux';
import {LoginAction} from './LoginAction';
import {store} from '../store';

class Account extends React.Component {
  
  constructor() {
    super();
    this.mode = "Login";
  }

	render() {	  
	  switch (this.mode) {
      case "My account":
        return (
          <div>
            <p>
              My Account
            </p>
          </div>
        );
      
      case "Login":
        return (
          <div>
            <p>
              Log in to the system below.
              <br/>

              <input type="text" id="username_box" placeholder="Username"/>
              <br/>

              <input type="password" id="password_box" placeholder="Password"/>
              <br/>

              <input type="checkbox" onClick={this.showPassword}/>
              Show password?
              <br/>

              <button onClick={this.login}> Log in </button>
              <br/>

              <button onClick={() => this.mode = "Register"}> Register </button>
            </p>
          </div>
        );
      
      case "Register":
        return (
          <div>
            Register
          </div>
        );
      
      default:
        return (
          <div>
            Yeah, something went wrong.
            mode is currently '{this.mode}'
          </div>
        );
    }
	}
	
	showPassword() {
	  console.log(this.mode);
	  var passBox = document.getElementById("password_box");
    if (passBox.type == "password") {
      passBox.type = "text";
    } else {
      passBox.type = "password";
    }
  }

  login() {
    // verify from database :) @Masha collab needed
    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    
    store.dispatch(LoginAction(username, password));
    
    if (store.getState().loggedIn) {
      this.mode = "My account";// TODO: null pointer exception here ?!??!?!!
    }
  }
}

export default Account;
