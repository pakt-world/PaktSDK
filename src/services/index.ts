import { Container, Service } from "typedi";
import { PaktConfig } from "../utils/config";
import { CHARACTERS } from "../utils/constants";
import { AUTH_TOKEN, PAKT_CONFIG, TEMP_TOKEN } from "../utils/token";
import { AccountModule, AccountModuleType } from "./account/account";
import { AuthenticationModule, AuthenticationModuleType } from "./auth";
import { BookMarkModule, BookMarkModuleType } from "./bookmark";
import { CollectionModule, CollectionModuleType } from "./collection/collection";
import { NotificationModule, NotificationModuleType } from "./notification";
import { ReviewModule, ReviewModuleType } from "./review";
import { UploadModule, UploadModuleType } from "./upload/upload";
import { WalletModule, WalletModuleType } from "./wallet/wallet";
import { WithdrawalModule } from "./withdrawal/withdrawal";
import { WithdrawalModuleType } from "./withdrawal/withdrawal.dto";

export * from "./account";
export * from "./auth";
export * from "./bookmark";
export * from "./collection";
export * from "./notification";
export * from "./review";
export * from "./upload";
export * from "./wallet";
export * from "./withdrawal";

@Service({ transient: true })
export class PaktSDK {
  auth: AuthenticationModuleType;
  bookmark: BookMarkModuleType;
  collection: CollectionModuleType;
  account: AccountModuleType;
  notifications: NotificationModuleType;
  file: UploadModuleType;
  wallet: WalletModuleType;
  withdrawal: WithdrawalModuleType;
  review: ReviewModuleType;

  constructor(id: string) {
    this.auth = Container.of(id).get(AuthenticationModule);
    this.collection = Container.of(id).get(CollectionModule);
    this.account = Container.of(id).get(AccountModule);
    this.notifications = Container.of(id).get(NotificationModule);
    this.file = Container.of(id).get(UploadModule);
    this.wallet = Container.of(id).get(WalletModule);
    this.withdrawal = Container.of(id).get(WithdrawalModule);
    this.review = Container.of(id).get(ReviewModule);
    this.bookmark = Container.of(id).get(BookMarkModule);
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
