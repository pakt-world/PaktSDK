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

  async resendVerificationEmail(
    resendVerificationEmailData: ResendVerificationEmailData
  ): Promise<ResendVerificationEmailResponse> {
    try {
      console.log(resendVerificationEmailData)
      const response: AxiosResponse<ResendVerificationEmailResponse> =
        await this.axiosInstance.post(
          "/v1/auth/verify/resend",
          resendVerificationEmailData
        );
      return response.data;
    } catch (error: Error | any) {
      throw error;
    }
  }
}


export default ResendVerificationEmail;
