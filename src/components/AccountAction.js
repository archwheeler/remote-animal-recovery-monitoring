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
    type: "LOGOUT"
  };
}

export function RegisterAction(username, password, email) {
  return {
    type: "REGISTER",
    data: {
      name: username,
      pass: password,
      email: email
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

export function ForgotAction(email) {
  return {
    type: "FORGOT_PASSWORD",
    data: {
      email: email
    }
  };
}

export function UpdateAccountsAction(accounts) {
  return {
    type: "UPDATE_ACCOUNTS"
  };
}
