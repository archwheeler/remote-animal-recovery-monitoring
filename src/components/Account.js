import React from 'react';
import {store} from '../store';
import {AddVetToAccount, SelectAccountAction, LogoutAction, ChooseIdAction} from "./AccountAction";
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

        // If vet account, give choice to switch accounts
        var button;
        if (store.getState().vetAccount) {
          button = (
            <FlatButton
              className="text"
              onClick={() => store.dispatch(ChooseIdAction())}
              label="Change user"
            />
          );
        }

        return (
          <Card className="center">
            <CardTitle title="My Account"/>

            <p>Name: {store.getState().data.name}</p>
            <br/>

            {button}

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
            <RaisedButton primary={true} fullWidth={true} label="+ Add new account" onClick={this.addVetToAccount}/>
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

  addVetToAccount(e) {
    // Stop rerouting
    e.preventDefault();

    var vet = prompt("Enter name for new vet account: ");
    if (vet != null && vet != "") {
      store.dispatch(AddVetToAccount(store.getState().data.userId, vet));
    }
  }
}

export default Account;

