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
      window.location.href = "/#/account";
      return null;
      
    } else {
      return (
        <div>
          <p>
            Register
            <br/>
          
            <input type="text" id="username_box" placeholder="Username"/>
            <br/>
          
            <input type="password" id="password_box" placeholder="Password"/>
            <br/>
          
            <input type="text" id="age_box" placeholder="Age"/>
            <br/>
          
            <input type="checkbox" onClick={this.showPassword}/>
            Show password?
            <br/>
          
            <button onClick={this.register}> Register </button>
            <br/>
          
            <button onClick={() => window.location.href = "/#/login"}> go back to login </button>
          </p>
        </div>
      );
    }
  }
  
  register() {
    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    var age = document.getElementById("age_box").value;
    
    store.dispatch(RegisterAction(username, password, age));
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
