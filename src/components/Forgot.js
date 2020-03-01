import React from 'react';
import {store} from '../store';
import {ForgotAction, GoToAccountAction} from './AccountAction';
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
          <br/>
          <p>If you have forgotten your password, put your email address
          in the box below to reset it.</p>
          <p>You will get an email with instructions on how to access your
          account.</p>
          <br/>

          <form onSubmit={this.forgotPassword}>
            <TextField id="email_box" type="email" placeholder="Email" required/>
            <br/>
            <br/>

            <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} label="Reset Password" type="submit"/>
            </div>
          </form>
          <br/>

          <FlatButton className="text" onClick={() => window.location.href = "/#/login"} label="Return to login" />
          <br/>
        </Card>
      );
    }
	}

  forgotPassword() {
    var email = document.getElementById("email_box").value;
    store.dispatch(ForgotAction(email));
  }
}

export default Account;
