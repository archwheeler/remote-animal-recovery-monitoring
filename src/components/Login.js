import React from 'react';
import {store} from '../store';
import {LoginAction, LogoutAction} from './AccountAction';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardTitle} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Login extends React.Component {

  componentDidMount() {
    this.unsub = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsub();
  }

	render() {
	  if (store.getState().loggedIn) {
      return (
        <Card className="center">
          <CardTitle title="You are already logged in." />
          <br/>
          <FlatButton className="blueButton" onClick={() => window.location.href = "/#/account"} label="My Account" />
          <br/>

          <FlatButton className="blueButton" onClick={() => store.dispatch(LogoutAction())} label="Log out" />
        </Card>
      );
    } else {
      return (
        <Card className="center">
          <form onSubmit={this.login}>
            <br/>
            <CardTitle title="Log in to the system below."/>
            <label id="feedback" className="center">
            </label>

            <TextField type="email" id="email_box" placeholder="Email" required/>
            <br/>

            <TextField type="password" id="password_box" placeholder="Password" required/>
            <br/>
            <br/>

            <label>
              <input type="checkbox" onClick={this.showPassword}/>
              Show password?
            </label>
            <br/>

            <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} type="submit" label="Log in"/>
            </div>
            <br/>

          </form>

          <FlatButton
            className="text"
            onClick={() => window.location.href='/#/register'}
            label = "Don't have an account? Register here"
          />

          <br/>

          <FlatButton
            className="text"
            onClick={() => window.location.href='/#/forgot'}
            label="Forgot password? Reset here"
          />
        </Card>
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

  login(e) {
    // to prevent SOME browsers rerouting to /?#/
    e.preventDefault();

    var email = document.getElementById("email_box").value;
    var password = document.getElementById("password_box").value;
    var feedback = document.getElementById("feedback");

    store.dispatch(LoginAction(email, password, feedback));
  }
}

export default Login;
