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
        <div>
          You are already logged in.
          <br/>
          
          <button onClick={() => window.location.href = "/#/account"}> Return </button> 
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.register}>
            Register
            <br/>
        
            <input type="text" id="username_box" placeholder="Username"/>
            <br/>
        
            <input type="password" id="password_box" placeholder="Password"/>
            <br/>
        
            <input type="checkbox" onClick={this.showPassword}/>
            Show password?
            <br/>
        
            <button type="submit"> Register </button>
            <br/>
          </form>
          
          <button onClick={() => window.location.href = "/#/login"}> Already have an account? </button>
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
