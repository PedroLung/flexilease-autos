export default class AuthResponse {
  email: string;
  password: string;
  token: string;

  constructor(email: string, password: string, token: string) {
    this.email = email;
    this.password = password;
    this.token = token;
  }

  toJson = () => {
    return {
      email: this.email,
      password: this.password,
      token: this.token,
    };
  };
}
