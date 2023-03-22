export interface UserLoginResponse {
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
