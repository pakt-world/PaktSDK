import { Container, Service } from 'typedi'
import { LoginRequest, LoginResponse } from "./auth.dto";
import { API_PATHS } from "../../utils/constants";
import { PaktConnector } from '../../connector';
import { ResponseDto } from '../../utils/response';

// Export all Types to Service
export * from "./auth.dto";

@Service({
  factory: (data: { id: string }) => {
    return new AuthenticationModule(data.id)
  },
  transient: true,
})
export class AuthenticationModule {
  private id: string
  private connector: PaktConnector
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector)
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: ResponseDto<LoginResponse> = await this.connector.post({ path: API_PATHS.LOGIN_PATH, body: credentials });
      return response.data;
    } catch (error: Error | any) {
      throw error;
    }
  }
}