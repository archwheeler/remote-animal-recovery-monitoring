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

export function RegisterAction(username, password, email, vet) {
  return {
    type: "REGISTER",
    data: {
      name: username,
      pass: password,
      email: email,
      vet: vet
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
