export const initial_state = {
  loggedIn: false,
  user: {
    name: "",
    age: 0
  }
}

// previous state, action => next state
export function LoginReducer(state = initial_state, action) {
  switch (action.type) {
    case "LOGIN":
      state.loggedIn = false;
      
      // TODO: lookup name / pass from database, not just hardcoded
      if (action.user.name == "tom" && action.user.pass == "hello") {
        console.log("Log in successful");
        
        return {
          loggedIn: true,
          user: {
            name: "tom",
            age: 19
          }
        };
      } else {
        console.log("Wrong username or password.");
        return state;
      }
    
    // Something else happened
    default:
      return state;
  }
}