
export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationModuleType {
  login(credential: LoginRequest): Promise<LoginResponse>;
}