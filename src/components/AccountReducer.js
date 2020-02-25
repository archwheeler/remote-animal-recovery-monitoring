export const initial_state = {
  loggedIn: false,
  choseId: false,
  vetAccount: false,
  data: {
    name: "",
    email: "",
    userId: -1
  },
  accounts: []
}

// API calls

async function callRegister(user, pass, email) {
  const response = await fetch('http://localhost:5000/registerUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': user,
      'password': pass,
      'email': email
    })
  });
  const body = await response.json();
  return body;
}

async function callLogin(user, pass) {
  const response = await fetch('http://localhost:5000/loginData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': user,
      'password': pass
    })
  });
  const body = await response.json();
  return body;
}

// Reducer

// previous state, action => next state
export function AccountReducer(state = initial_state, action) {
  switch (action.type) {
    case "LOGIN":
      state.loggedIn = false;
      state.choseId = false;

      callLogin(action.data.name, action.data.pass)
        .then(res => {
          state.loggedIn = res.passwordCorrect;

          if (state.loggedIn) {

            // Login success
            action.label.innerHTML = JSON.stringify(state);

            state.vetAccount = true;
            state.data = {};

            window.location.href = "/#/account";

          } else {

            // Login failed
            action.label.innerHTML = "Wrong username or password.";

          }
        }
      );

      return state;

    case "LOGOUT":
      state.loggedIn = false;
      state = initial_state;
      window.location.href = "/#/login";
      return initial_state;

    case "REGISTER":

      callRegister(action.data.name, action.data.pass, action.data.email).then(res => {
        if (res.status == "success") {

          // Register successful
          state.loggedIn = true;
          state.data = {
            userId: res.uid,
            name: action.data.name,
            email: action.data.email
          };

          window.location.href = "/#/account";

        } else {

          // Register failed
          alert("Registration failed");

        }

        return state;
      });

    case "CHOOSE_ID":
      state.choseId = false;
      return state;

    case "UPDATE_ACCOUNTS":
      fetch('http://localhost:5000/getListOfVets/' + state.data.userId).then(
        res => res.json()).then(
        res => {
          state.accounts = res.vets;
        });
      return state;

    case "SELECT_ID":
      state.choseId = true;
      state.data.name = action.id;
      return state;

    case "FORGOT_PASSWORD":
      // action.data.email is the email
      alert("Password reset. Please check your emails. <TODO>");
      window.location.href = "/#/login";
      return state;

    // Something else happened
    default:
      return state;
  }
}
