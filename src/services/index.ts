import { Container, Service } from "typedi";
import { PaktConfig } from "../utils/config";
import { CHARACTERS } from "../utils/constants";
import { AUTH_TOKEN, PAKT_CONFIG, TEMP_TOKEN } from "../utils/token";
import { AccountModule, AccountModuleType } from "./account/account";
import { AuthenticationModule, AuthenticationModuleType } from "./auth";
import { CollectionModule, CollectionModuleType } from "./collection/collection";
import { NotificationModule, NotificationModuleType } from "./notification";
import { UploadModule, UploadModuleType } from "./upload/upload";
import { WalletModule, WalletModuleType } from "./wallet/wallet";
import { WithdrawalModule } from "./withdrawal/withdrawal";
import { WithdrawalModuleType } from "./withdrawal/withdrawal.dto";

@Service({ transient: true })
class PaktSDK {
  auth: AuthenticationModuleType;
  collection: CollectionModuleType;
  account: AccountModuleType;
  notifications: NotificationModuleType;
  file: UploadModuleType;
  wallet: WalletModuleType;
  withdrawal: WithdrawalModuleType;

  constructor(id: string) {
    this.auth = Container.of(id).get(AuthenticationModule);
    this.collection = Container.of(id).get(CollectionModule);
    this.account = Container.of(id).get(AccountModule);
    this.notifications = Container.of(id).get(NotificationModule);
    this.file = Container.of(id).get(UploadModule);
    this.wallet = Container.of(id).get(WalletModule);
    this.withdrawal = Container.of(id).get(WithdrawalModule);
  }
  /**
   * Initialize Pakt SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init(config: PaktConfig): Promise<PaktSDK> {
    const defaultConfig: PaktConfig = {
      ...config,
    };

    const id = PaktSDK.generateRandomString();
    Container.of(id).set(PAKT_CONFIG, defaultConfig);
    Container.of(id).set(AUTH_TOKEN, "");
    Container.of(id).set(TEMP_TOKEN, "");
    return new PaktSDK(id);
  }
  /**
   * Generate Random String. This method is used to generate random strings.
   * @param config
   */
  private static generateRandomString() {
    const characters = CHARACTERS;
    let result = "";
    for (let i = 0; i < 60; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export default PaktSDK;
