import { Container, Service } from 'typedi';
import { AuthenticationModule, AuthenticationModuleType } from "./auth";
import { PaktConfig } from '../utils/config';
import { PAKT_CONFIG } from '../utils/token';

@Service({ transient: true })
class PaktSDK<T>  {
  auth: AuthenticationModuleType;

  constructor(private readonly id: string) {
    this.auth = Container.of(id).get(AuthenticationModule)
  }

  /**
   * Initialize Pakt SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init<T>(config: PaktConfig): Promise<PaktSDK<T>> {
    const defaultConfig: PaktConfig = {
      ...config,
    }

    const id = PaktSDK.generateRandomString()
    Container.of(id).set(PAKT_CONFIG, defaultConfig)
    return new PaktSDK<T>(id)
  }

  private static generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 60; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}

export default PaktSDK;