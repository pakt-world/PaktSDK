import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface VerificationResponse {
  code: number;
  message: string;
  data?: any;
}

export interface Credentials {
  token: string;
  tempToken: string;
}

class Verification {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async verifyEmail(credentials: Credentials): Promise<VerificationResponse> {
    try {
      const response: AxiosResponse<VerificationResponse> =
        await this.axiosInstance.post("/v1/auth/account/verify", credentials);
      return response.data;
    } catch (error: Error | any) {
      throw error;
    }
  }
}

export default Verification;
