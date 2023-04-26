import axios, { AxiosInstance, AxiosResponse } from "axios";

interface ResendVerificationEmailData {
    email: string;
  }
  
  interface ResendVerificationEmailResponse {
    code: number;
    message: string;
    data?: any;
  }
  
  export class ResendVerificationEmail {
    private axiosInstance: AxiosInstance;
    private baseURL: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
      this.axiosInstance = axios.create({
        baseURL: this.baseURL,
      });
    }
  
    async resendVerificationEmail(ResendVerificationEmailData: ResendVerificationEmailData): Promise<ResendVerificationEmailResponse> {
      try {
        const response: AxiosResponse<ResendVerificationEmailResponse> =
          await this.axiosInstance.post("/v1/auth/verify/resend", ResendVerificationEmailData);
        return response.data;
      } catch (error: Error | any) {
        if (error instanceof Error) {
          console.log(error);
          throw error;
        }
        throw new Error(`Resend verification email failed: ${error.message}`);
      }
    }
}

export default ResendVerificationEmail;