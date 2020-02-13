import React from 'react';
import {LoginAction} from './AccountAction';
import {store} from '../store';

class Account extends React.Component {

	render() {	  
    return (
      <div>
        <p>
          Register
          <br/>
          
          <button onClick={() => window.location.href = "/#/login"}> go back to login </button>
        </p>
      </div>
    );
  }
}

export default Account;
