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
      state.loggedIn = false;
      state.choseId = false;
      state.data = {};
      return state;
    
    case "REGISTER":
      
      // TODO: add to database
      
      // Success
      return {
        loggedIn: true,
        choseId: true,
        data: {
          name: action.data.name,
          pass: action.data.pass,
          age: action.data.age
        }
      };
    
    case "SELECT_ID":
      state.choseId = true;
      // TODO: send to database
      if (state.vetAccount) {
        state.data = {
          id: action.id,
          type: "human",
          name: names[action.id],
          age: 19
        };
      } else {
        state.data = {
          id: action.id,
          type: "dog",
          name: names[action.id],
          age: 1
        };
      }
      return state;
      
    // Something else happened
    default:
      return state;
  }
}
