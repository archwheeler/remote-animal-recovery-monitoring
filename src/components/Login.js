import React from 'react';
import {store} from '../store';
import {SelectAccountAction, LoginAction} from './AccountAction';

class Account extends React.Component {

  constructor() {
    super();
    const rerenderer = store.subscribe(() => this.forceUpdate());
  }

	render() {
	  if (store.getState().choseId) {
      window.location.href = "/#/account";
      return null;
      
    } else if (store.getState().loggedIn) {
      return (
        <div>
          Please select an account from below: <br/>
          {
            Object.entries(store.getState().data).map(function([key, value]) {
              return (
                <div>
                  <button key={key} onClick={function() {
                    store.dispatch(SelectAccountAction(key))
                  }}>
                    {value}
                  </button>
                  <br/>
                </div>
              )
            }
          )}
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
