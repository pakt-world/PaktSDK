import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface VerificationResponse {
    code: number;
    message: string;
    data?: any;
  }
  
  export class Verification {
      verificationToken(arg0: { verificationToken: string; }) {
          throw new Error('Method not implemented.');
      }
    private axiosInstance: AxiosInstance;
    private baseURL: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
      this.axiosInstance = axios.create({
        baseURL: this.baseURL,
      });
    }
  
  

  async verifyEmail(token: string): Promise<VerificationResponse> {
        try {
          const response: AxiosResponse<VerificationResponse> =
            await this.axiosInstance.post(`/v1/auth/account/verify/${token}`);
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

export default Verification