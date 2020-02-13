export const initial_state = {
  loggedIn: false,
  user: {}
}

// previous state, action => next state
export function AccountReducer(state = initial_state, action) {
  switch (action.type) {
    case "LOGIN":
      state.loggedIn = false;
      
      // TODO: lookup name / pass from database, not just hardcoded
      if (action.user.name == "tom" && action.user.pass == "hello") {
        action.label.innerHTML = "Log in successful";
        
        return {
          loggedIn: true,
          user: {
            name: "tom",
            age: 19
          }
        };
      
      } else {
        action.label.innerHTML = "Wrong username or password.";
        return state;
      }
    
    case "LOGOUT":
      state.loggedIn = false;
      state.user = {};
      return state;
    
    case "REGISTER":
      
      // TODO: add to database
      
      // Success
      return {
        loggedIn: true,
        user: {
          name: action.user.name,
          pass: action.user.pass,
          age: action.user.age
        }
      };
    
    // Something else happened
    default:
      return state;
  }
}
