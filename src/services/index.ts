import axios, { AxiosInstance } from "axios";
import AuthenticationModule, { AuthenticationModuleType } from "./authentication";

export interface LoginResponse {
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

class PaktSDK {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "api-key": apiKey
      }
    });
  }

  async authentication(): Promise<AuthenticationModuleType> {
    try {
      return new AuthenticationModule(this.axiosInstance);
    } catch (error: Error | any) {
      throw error;
    }
  }
}

export default PaktSDK;