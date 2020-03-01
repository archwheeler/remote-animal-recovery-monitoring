import React from 'react';
import {store} from '../store';
import {SelectAccountAction, LogoutAction, ChooseIdAction} from "./AccountAction";

class Account extends React.Component {

  constructor(props) {
    super(props);
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    if (store.getState().loggedIn) {
      if (store.getState().choseId) {
        return (
          <div className="center">
            <button className="blueButton" onClick={() => store.dispatch(LogoutAction())}> Log out </button>
            <br/>

            My Account
            <br/>

            Name: {store.getState().data.name}
            <br/>

            Change user:
            <button className="text" onClick={() =>
              store.dispatch(ChooseIdAction())}>
              Click here
            </button>
            <br/>
          </div>
        );
      } else {
        if (store.getState().data.accounts.length == 0) {
          alert("No accounts found- if this is unexpected, go to 'Change user' in accounts");
          store.dispatch(SelectAccountAction(""));
          return null;
        }
        return (
          <div className="center">
            Please select an account from below:
            <br/>
            {
              store.getState().data.accounts.map(item =>
                <div>
                  <input type="text" key={item} value={item} onClick={() => store.dispatch(SelectAccountAction(item))} readOnly/>
                </div>
              )
            }
          </div>
        );
      }
    } else {
      return (
        <div className="center">
          You are not logged in.
          <br/>

          <button className="blueButton" onClick={() => window.location.href = "/#/login"}> Log in </button>
        </div>
      );
    }
  }
}

export default Account;

