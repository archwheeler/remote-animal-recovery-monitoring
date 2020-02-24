export const initial_state = {
  loggedIn: false,
  choseId: false,
  vetAccount: false,
  data: {}
}

// get from database
var names = {
  user1: "tom",
  user2: "masha"
};

// previous state, action => next state
export function AccountReducer(state = initial_state, action) {
  switch (action.type) {
    case "LOGIN":
      state.loggedIn = false;
      state.choseId = false;
      
      // TODO: lookup name / pass from database, not just hardcoded
      if (action.data.name == "tom" && action.data.pass == "hello") {
        action.label.innerHTML = "Log in successful";
        window.location.href = "/#/account";
        
        return {
          loggedIn: true,
          vetAccount: true,
          data: names
        };
      
      } else {
        action.label.innerHTML = "Wrong username or password.";
        return state;
      }
    
    case "LOGOUT":
      window.location.href = "/#/login";
      
      state.loggedIn = false;
      state.choseId = false;
      state.data = {};
      return state;
    
    case "REGISTER":
      
      // TODO: add to database
      
      // Success
      window.location.href = "/#/account";
      
      state.loggedIn = true;
      state.choseId = true;
      state.data = {
        name: action.data.name,
        pass: action.data.pass,
      };
      
      return state;
    
    case "CHOOSE_ID":
      state.choseId = false;
      state.data = names
      return state;
    
    case "SELECT_ID":
      state.choseId = true;
      // TODO: send to database
      if (state.vetAccount) {
        state.data = {
          id: action.id,
          name: names[action.id],
        };
      } else {
        state.data = {
          id: action.id,
          name: names[action.id],
        };
      }
      return state;
    
    case "FORGOT_PASSWORD":
      // action.data.email is the email
      alert("Password reset. Please check your emails.");
      window.location.href = "/#/login";
      return state;
      
    // Something else happened
    default:
      return state;
  }
}
