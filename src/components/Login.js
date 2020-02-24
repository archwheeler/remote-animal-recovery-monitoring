import React from 'react';
import {store} from '../store';
import {LoginAction} from './AccountAction';

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
          <p>
            <label id="feedback">
            Log in to the system below.
            </label>
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

            <button onClick={() => window.location.href='/#/register'}> Register </button>
            <br/>
          </p>
        </div>
      );
    }
	}
	
	showPassword() {
	  var passBox = document.getElementById("password_box");
    if (passBox.type == "password") {
      passBox.type = "text";
    } else {
      passBox.type = "password";
    }
  }

  login() {
    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    var feedback = document.getElementById("feedback");
    
    store.dispatch(LoginAction(username, password, feedback));
  }
}

export default Account;
