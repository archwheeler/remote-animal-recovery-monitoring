export function LoginAction(email, password, feedback) {
  return {
    type: "LOGIN",
    label: feedback,
    data: {
      email: email,
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
      email: email,
    }
  };
}

export function RegisterVetAction(username, password, email) {
  return {
    type: "REGISTER_VET",
    data: {
      name: username,
      pass: password,
      email: email,
    }
  };
}

export function SelectAccountAction(name) {
  return {
    type: "SELECT_ID",
    name: name
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
