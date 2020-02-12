import React from 'react';

class Account extends React.Component {
  
  constructor(props) {
    super(props);
    this.loggedIn = false;
    this.user = { name: "default" };
  }
        
	render() {
	  if (this.loggedIn) {
	    // TODO: doesn't change for some reason
		  return (
        <div>
          <p>
            My Account
            <br/>
            
            Name: {this.user.name}
          </p>
        </div>
		  );
    } else {
	    return (
        <div>
          <p>
            Log in to the system below.
            <br/>

            <input type="text" id="username_box" placeholder="Username"/>
            <br/>

            <input type="password" id="password_box" placeholder="Password"/>
            <br/>

            <input type="checkbox" onClick={this.showPassword}/>
            Show password?
            <br/>

            <button onClick={this.login}> Log in </button>
            <br/>

            <a href="/"> Register (todo) </a>
          </p>
        </div>
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

  login() {
    // verify from database :) @Masha collab needed
    var username = document.getElementById("username_box").value;
    var password = document.getElementById("password_box").value;
    
    alert(username + ": " + password);
    
    // TODO: null ptr exceptions here. (user is null?)
    this.user.name = "tom";
    this.loggedIn = true;
  }
}

export default Account;
