import { Container, Service } from "typedi";
import { PaktConfig } from "../utils/config";
import { CHARACTERS } from "../utils/constants";
import { AUTH_TOKEN, PAKT_CONFIG, TEMP_TOKEN } from "../utils/token";
import { AccountModule, AccountModuleType } from "./account/account";
import { AuthenticationModule, AuthenticationModuleType } from "./auth";
import { BookMarkModule, BookMarkModuleType } from "./bookmark";
import { ChatModule, ChatModuleType } from "./chat";
import { CollectionModule, CollectionModuleType } from "./collection/collection";
import { ConnectionFilterModule } from "./connectionFilter";
import { ConnectionFilterModuleType } from "./connectionFilter/connectionFilter.dto";
import { FeedModule } from "./feed";
import { FeedModuleType } from "./feed/feed.dto";
import { InviteModule, InviteModuleType } from "./invite";
import { NotificationModule, NotificationModuleType } from "./notification";
import { ReviewModule, ReviewModuleType } from "./review";
import { UploadModule, UploadModuleType } from "./upload/upload";
import { UserVerificationModule, UserVerificationModuleType } from "./userVerification";
import { WalletModule, WalletModuleType } from "./wallet/wallet";
import { WithdrawalModule } from "./withdrawal/withdrawal";
import { WithdrawalModuleType } from "./withdrawal/withdrawal.dto";

export * from "./account";
export * from "./auth";
export * from "./bookmark";
export * from "./chat";
export * from "./collection";
export * from "./connectionFilter";
export * from "./feed";
export * from "./invite";
export * from "./notification";
export * from "./review";
export * from "./upload";
export * from "./userVerification";
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
  userVerification: UserVerificationModuleType;
  chat: ChatModuleType;
  connectionFilter: ConnectionFilterModuleType;
  invite: InviteModuleType;
  feed: FeedModuleType;

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
    this.userVerification = Container.of(id).get(UserVerificationModule);
    this.chat = Container.of(id).get(ChatModule);
    this.connectionFilter = Container.of(id).get(ConnectionFilterModule);
    this.invite = Container.of(id).get(InviteModule);
    this.feed = Container.of(id).get(FeedModule);
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
