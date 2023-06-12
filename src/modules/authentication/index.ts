import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LoginRequest, LoginResponse} from "./types";
import { API_PATHS } from "./constants";

export interface AuthenticationModuleType  {
  login: (credential: LoginRequest)=> Promise<LoginResponse>;
}

export default class AuthenticationModule {
  private apiInstance: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.apiInstance = apiInstance
  }
  
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.apiInstance.post(API_PATHS.LOGIN_PATH, credentials);
      return response.data;
    } catch (error: Error | any) {
      throw error;
    }
  }

}