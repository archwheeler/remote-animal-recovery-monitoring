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
      state.loggedIn = false;
      state.choseId = false;
      state.data = {};
      return state;
    
    case "REGISTER":
      
      // TODO: add to database
      
      // Success
      state.loggedIn = true;
      state.choseId = true;
      state.data = {
        name: action.data.name,
        pass: action.data.pass,
        age: action.data.age
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
