import React from 'react';
import {store} from '../store';
import {ForgotAction} from './AccountAction';

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
          <br/>
          
          <button className="blueButton" onClick={() => store.dispatch(LogoutAction())}>
            Log out
          </button>
        </div>
      );
    } else {
      return (
        <div className="center">
          If you have forgotten your password, put your email address
          in the box below to reset it.
          <br/>
          You will get an email with instructions on how to access your
          account.
          <br/>
          
          <form onSubmit={this.forgotPassword}>
            <input id="email_box" type="text" placeholder="Email*" required/>
            <br/>
            
            <input type="submit" value="Reset Password"/>
          </form>
          
          <button className="text" onClick={() => window.location.href = "/#/login"}>
            Return to login
          </button>
        </div>
      );
    }
	}

  forgotPassword() {
    var email = document.getElementById("email_box").value;
    store.dispatch(ForgotAction(email));
  }
}

export default Account;
