import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export interface OnboardingRequest {
  skillCategory: string;
  profileImage: string;
  type: string;
}

export interface OnboardingResponse {
  status: boolean;
  message: string;
  data?: string;
}

type OnboardingError = {
    message: string;
    details?: string;
  };

  export class Onboarding {
    private baseUrl: string;
    private token: string;
    private httpClient: AxiosInstance;
  
    constructor(baseUrl: string, token: string) {
      this.baseUrl = baseUrl;
      this.token = token;
  
      this.httpClient = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
  
    public async onboarding(request: OnboardingRequest): Promise<OnboardingResponse> {
      try {
        const response: AxiosResponse<OnboardingResponse> = await this.httpClient.post('/v1/account/onboard', request);
        // console.log(response)
        return response.data;
      } catch (error: Error | any) {
        // console.log(error)
        const axiosError = error as AxiosError<OnboardingError>;
        if (axiosError.response) {
          throw new Error(axiosError.response.data.message);
        } else {
          throw new Error('An unknown error occurred while onboarding the user.');
        }
      }
    }
  }
  

export default Onboarding;
