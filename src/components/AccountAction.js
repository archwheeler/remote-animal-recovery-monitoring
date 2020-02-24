export function LoginAction(username, password, feedback) {
  return {
    type: "LOGIN",
    label: feedback,
    data: {
      name: username,
      pass: password
    }
  };
}

export function LogoutAction() {
  return {
    type: "LOGOUT",
  };
}

export function RegisterAction(username, password) {
  return {
    type: "REGISTER",
    data: {
      name: username,
      // DON'T SAVE PASSWORD ANYWHERE PLAINTEXT THIS IS JUST A PLACEHOLDER FOR TESTING PURPOSES
      pass: password,
    }
  };
}

export function SelectAccountAction(ID) {
  return {
    type: "SELECT_ID",
    id: ID
  };
}

export function ChooseIdAction() {
  return {
    type: "CHOOSE_ID"
  };
}
