import React from 'react';
import {RegisterAction, RegisterVetAction} from './AccountAction';
import {store} from '../store';
import {Card, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Account extends React.Component {

  constructor() {
    super();
    const rerenderer = store.subscribe(() => this.forceUpdate());
  }

	render() {
    if (store.getState().loggedIn) {
      return (
        <Card className="center">
          <CardTitle title="You are already logged in." />
          <br/>

          <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} label="My Account" onClick={() => store.dispatch(GoToAccountAction())}/>
          </div>
          <br/>
        </Card>
      );
    } else {
      return (
        <Card className="center">
          <CardTitle title="Register" />
          <form onSubmit={this.register}>
            <TextField type="email" id="email_box" placeholder="Email" required/>
            <br/>

            <TextField type="text" id="username_box" placeholder="Username" required/>
            <br/>

            <TextField type="password" id="password_box" placeholder="Password" required/>
            <br/>
            <br/>

            <label>
              <input type="checkbox" onClick={this.showPassword}/>
              Show password?
            </label>

            <label>
              <input type="checkbox" id="vet_checkbox"/>
              Create a vet account?
            </label>
            <br/>

            <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} type="submit" label="Register"/>
            </div>
            <br/>
          </form>

          <FlatButton className="text" onClick={() => window.location.href = "/#/login"} label="Already have an account?" />
        </Card>
      );
    }
  }

  register(e) {
    // Stops rerouting to /?#/
    e.preventDefault();

    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    var email = document.getElementById("email_box").value;

    if (document.getElementById("vet_checkbox").checked) {
      store.dispatch(RegisterVetAction(username, password, email));
    } else {
      store.dispatch(RegisterAction(username, password, email));
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
}

export default Account;
