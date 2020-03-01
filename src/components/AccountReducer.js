export const initial_state = {
  loggedIn: false,
  choseId: false,
  vetAccount: false,
  data: {
    name: "",
    email: "",
    userId: -1,
    animalId: -1,
    accounts: []
  }
};

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

async function callRegisterVet(user, pass, email) {
  const response = await fetch('http://localhost:5000/registerVetTeam', {
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

async function callLogin(email, pass) {
  const response = await fetch('http://localhost:5000/loginData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': pass
    })
  });
  const body = await response.json();
  return body;
}

async function fetchAccounts(id) {
  return await fetch('http://localhost:5000/getListOfVets/' + id).then(
    res => res.json()
  );
}

async function addVetToAccount(id, name) {
  const response = await fetch('http://localhost:5000/addVetToTeam/' + id, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': name
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
      state.vetAccount = false;

      callLogin(action.data.email, action.data.pass).then(
        res => {
          state.loggedIn = res.passwordCorrect;

          if (state.loggedIn) {

            // Login success
            state.data = {};
            state.data.name = res.name;
            state.data.userId = res.uid;
            state.data.animalId = res.aid;
            state.data.accounts = [];
            state.vetAccount = res.VetOrCarer == "vet";

            // If vet, load accounts
            if (state.vetAccount) {
              fetchAccounts(state.data.userId).then(
                res => {
                  state.data.accounts = res.vets;
                  window.location.href = "/#/account";
                }
              );
            } else {
              state.choseId = true;
              window.location.href = "/#/account";
            }

          } else {

            // Login failed
            action.label.innerHTML = "Wrong username or password.";
          }
        }
      );

      return state;

    case "LOGOUT":
      state.loggedIn = false;
      state.choseId = false;
      state.vetAccount = false;
      state.data = {};

      window.location.href = "/#/login";
      return state;

    case "REGISTER":

      callRegister(action.data.name, action.data.pass, action.data.email).then(res => {
        if (res.status == "success") {

          // Register successful
          state.loggedIn = true;
          state.choseId = true;
          state.vetAccount = false;

          state.data = {
            userId: res.uid,
            name: action.data.name,
            email: action.data.email,
            accounts: []
          };

          window.location.href = "/#/account";

        } else {

          // Register failed
          alert("Registration failed");

        }
      });

      return state;

    case "REGISTER_VET":

      callRegisterVet(action.data.name, action.data.pass, action.data.email).then(res => {
        if (res.status == "success") {

          // Register successful
          state.loggedIn = true;
          state.choseId = true;
          state.vetAccount = true;

          state.data = {
            userId: res.vid,
            name: action.data.name,
            email: action.data.email,
            accounts: [action.vetName]
          };

          addVetToAccount(state.data.userId, action.data.vetName).then(r => {
            window.location.href = "/#/account";
          });

        } else {

          // Register failed
          alert("Registration failed");

        }
      });

      return state;

    case "CHOOSE_ID":
      state.choseId = false;
      return state;

    case "SELECT_ID":
      state.choseId = true;
      state.data.name = action.name;
      return state;

    case "FORGOT_PASSWORD":
      // action.data.email is the email
      alert("Password reset. Please check your emails. <TODO>");
      window.location.href = "/#/login";
      return state;

    case "ADD_VET_TO_ACCOUNT":
      addVetToAccount(action.data.id, action.data.name);
      state.data.accounts = [...state.data.accounts, action.data.name];
      return state;

    // Something else happened
    default:
      return state;
  }
}
