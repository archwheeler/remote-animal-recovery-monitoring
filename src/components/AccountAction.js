export function LoginAction(username, password, feedback) {
  return {
    type: "LOGIN",
    label: feedback,
    user: {
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

export function RegisterAction(username, password, age) {
  return {
    type: "REGISTER",
    user: {
      name: username,
      pass: password,
      age: age
    }
  }
}