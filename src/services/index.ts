import { Container, Service } from "typedi";
import { PaktConfig } from "../utils/config";
import { PAKT_CONFIG } from "../utils/token";
import { AccountModule } from "./account/account";
import { AccountModuleType } from "./account/account.dto";
import { AuthenticationModule, AuthenticationModuleType } from "./auth";
import { JobModule } from "./job/job";
import { JobModuleType } from "./job/job.dto";
import { NotificationModule, NotificationModuleType } from "./notification";
import { UploadModule } from "./upload";
import { UploadModuleType } from "./upload/upload.dto";
import { WalletModule } from "./wallet/wallet";
import { WalletModuleType } from "./wallet/wallet.dto";

@Service({ transient: true })
class PaktSDK<T> {
  auth: AuthenticationModuleType;
  connection: JobModuleType;
  account: AccountModuleType;
  notifications: NotificationModuleType;
  file: UploadModuleType;
  wallet: WalletModuleType;

  constructor(private readonly id: string) {
    this.auth = Container.of(id).get(AuthenticationModule);
    this.connection = Container.of(id).get(JobModule);
    this.account = Container.of(id).get(AccountModule);
    this.notifications = Container.of(id).get(NotificationModule);
    this.file = Container.of(id).get(UploadModule);
    this.wallet = Container.of(id).get(WalletModule);
  }
  /**
   * Initialize Pakt SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init<T>(config: PaktConfig): Promise<PaktSDK<T>> {
    const defaultConfig: PaktConfig = {
      ...config,
    };

    const id = PaktSDK.generateRandomString();
    Container.of(id).set(PAKT_CONFIG, defaultConfig);
    return new PaktSDK<T>(id);
  }
  /**
   * Generate Random String. This method is used to generate random strings.
   * @param config
   */
  private static generateRandomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 60; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export default PaktSDK;
