export function LoginAction(username, password) {
  return {
    type: "LOGIN",
    user: {
      name: username,
      pass: password
    }
  };
}