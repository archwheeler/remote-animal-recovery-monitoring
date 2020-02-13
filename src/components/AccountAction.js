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
