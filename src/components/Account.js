import React from 'react';
import {store} from '../store';
import {SelectAccountAction, LogoutAction, ChooseIdAction} from "./AccountAction";

class Account extends React.Component {

  constructor() {
    super();
    const rerenderer = store.subscribe(() => this.forceUpdate());
  }

	render() {
	
    if (store.getState().loggedIn) {
      if (store.getState().choseId) {
        return (
          <div>
            <p>
              <button onClick={() => store.dispatch(LogoutAction())}> Log out </button>
              <br/>
            
              My Account
              <br/>
            
              Name: {store.getState().data.name}
              <br/>
            
              Change user:
              <button onClick={() => store.dispatch(ChooseIdAction())}> click </button>
              <br/>
            </p>
          </div>
        );
      } else {
        return (
          <div>
            Please select an account from below: <br/>
            {
              Object.entries(store.getState().data).map( ([key, value]) =>
                <div>
                  <button key={key} onClick={() => store.dispatch(SelectAccountAction(key))}>
                    {value}
                  </button>
                  <br/>
                </div>
              )
            }
          </div>
        );
      }
    } else {
      return (
        <div>
          You are not logged in.
          <br/>
          
          <button onClick={() => window.location.href = "/#/login"}> Log in </button> 
        </div>
      );
    }
  }
}

export default Account;
