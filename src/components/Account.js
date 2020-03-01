import React from 'react';
import {store} from '../store';
import {SelectAccountAction, LogoutAction, ChooseIdAction} from "./AccountAction";
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Account extends React.Component {

  constructor(props) {
    super(props);
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    if (store.getState().loggedIn) {
      if (store.getState().choseId) {
        return (
          <Card className="center">
            <CardTitle title="My Account"/>

            <p>Name: {store.getState().data.name}</p>
            <br/>

            <FlatButton
              className="text"
              onClick={() => store.dispatch(ChooseIdAction())}
              label="Change user"
            />
            <br/>

            <p>
            {JSON.stringify(store.getState())}
            </p>
            <br/>

            <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} label="Log Out" onClick={() => store.dispatch(LogoutAction())}/>
            </div>
            <br/>
          </Card>
        );
      } else {
        if (store.getState().data.accounts.length == 0) {
          alert("No accounts found- if this is unexpected, go to 'Change user' in accounts");
          store.dispatch(SelectAccountAction(""));
          return null;
        }
        return (
          <Card className="center">
            <br/>
            <p>Please select an account from below:</p>
            <br/>
            {
              store.getState().data.accounts.map(item =>
                <div>
                  <input type="text" key={item} value={item} onClick={() => store.dispatch(SelectAccountAction(item))} readOnly/>
                </div>
              )
            }
            <br/>
          </Card>
        );
      }
    } else {
      return (
        <Card className="center">
          <CardTitle title="You are not logged in" />
          <br/>

          <div style={{marginLeft: 50, marginRight: 50}}>
              <RaisedButton primary={true} fullWidth={true} label="Log in" onClick={() => window.location.href = "/#/login"}/>
          </div>
          <br/>
        </Card>
      );
    }
  }
}

export default Account;

