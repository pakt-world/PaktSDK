import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface AuthenticationModuleType  {
  Login: Function;
}

export default class AuthenticationModule {
  private apiInstance: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.apiInstance = apiInstance
  }

  async Login(){
    
  }

}