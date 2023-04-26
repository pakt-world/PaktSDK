import axios, { AxiosInstance, AxiosResponse } from "axios";

interface RegistrationResponse {
  code: number;
  message: string;
  meta: string;
  data: {
    _id: string;
    profile: {
      talent: {
        skills: string[];
        availability: string;
      };
      privateInvestments: boolean;
      privateEarnings: boolean;
      verified: boolean;
    };
    status: boolean;
    type: string;
    afroScore: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    userName: string;
    __v: number;
    isVerified: boolean;
    extra: {
      totalInvestments: number;
      totalEarned: number;
      totalJobs: number;
      projectFunded: number;
      afroScore: number;
    };
    token: string;
    token_type: string;
    expiresIn: number;
  };
}

export interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class Registration {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async registration(credentials: Credentials): Promise<RegistrationResponse> {
    try {
      const response: AxiosResponse<RegistrationResponse> =
        await this.axiosInstance.post("/v1/auth/create-account", credentials);
      return response.data;
    } catch (error: Error | any) {
      throw error;
    }
  }
}

export default Registration;
