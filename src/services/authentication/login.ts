import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export class Login {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async login(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.axiosInstance.post(
        '/v1/auth/login',
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
