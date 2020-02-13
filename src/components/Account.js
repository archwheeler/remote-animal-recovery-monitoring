import React from 'react';
import {store} from '../store';
import {LogoutAction} from "./AccountAction";

class Account extends React.Component {

  constructor() {
    super();
    const rerenderer = store.subscribe(() => this.forceUpdate());
  }

	render() {
	  if (store.getState().loggedIn) {
      return (
        <div>
          <p>
            <button onClick={this.logout}> Log out </button>
            <br/>
            
            My Account
            <br/>
            
            Name: {store.getState().user.name}
            <br/>
            
            Age: {store.getState().user.age}
          </p>
        </div>
      );
    } else {
      window.location.href = "/#/login";
      return null;
    }
  }
  
  logout() {
    store.dispatch(LogoutAction());
  }
}

export default Account;
