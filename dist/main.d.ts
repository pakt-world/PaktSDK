import { Token } from 'typedi';

interface PaktConfig {
    baseUrl: string;
    token: string;
    testnet?: boolean;
    verbose?: boolean;
}

declare enum Status {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
interface ResponseDto<T> {
    data: T;
    status: Status;
    message?: string;
    code?: string;
}
type ErrorWithMessage = {
    message: string[] | object[] | any;
    code?: string;
};
declare const ErrorUtils: {
    tryFail: <T>(f: (() => Promise<T>) | (() => T)) => Promise<ResponseDto<T>>;
    formatErrorMsg: (message: string) => string;
    toErrorWithMessage: (maybeError: unknown) => ErrorWithMessage;
    isErrorWithMessage(e: unknown): e is ErrorWithMessage;
};
declare const parseUrlWithQUery: (url: string, filter: object | any) => string;

interface IUser {
    _id: string;
    type: string;
    email: string;
    lastName: string;
    firstName: string;
    score: number;
    profileCompleteness: number;
    profileImage?: {
        url: string;
    };
    profile: {
        contact?: {
            city?: string;
            state?: string;
            phone?: string;
            address?: string;
            country?: string;
        };
        bio?: {
            title?: string;
            description?: string;
        };
        talent: {
            availability: string;
            tags: string[];
            tagsIds: any[];
            tagsCategory: string;
            about?: string;
        };
    };
    socket?: {
        id: string;
        status: string;
        conversation: string;
    };
}
type LoginDto = {
    email: string;
    token: string;
    onboarded: boolean;
    isVerified: boolean;
    tempToken: {
        token: string;
        expiresIn: number;
    };
} & IUser;
type RegisterDto = {
    tempToken: {
        token: string;
        token_type: string;
        expiresIn: number;
    };
};
type AccountVerifyDto = {
    token: string;
    expiresIn: number;
} & IUser;
type ResetDto = {
    tempToken: {
        token: string;
        expiresIn: number;
    };
};
type ResendVerifyDto = void;
type ChangePasswordDto = void;
type ValidatePasswordToken = void;
interface AuthenticationModuleType {
    login(email: string, password: string): Promise<ResponseDto<LoginDto>>;
    register(firstName: string, lastName: string, email: string, password: string): Promise<ResponseDto<RegisterDto>>;
    verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>>;
    resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>>;
    resetPassword(email: string): Promise<ResponseDto<ResetDto>>;
    changePassword(token: string, pasword: string): Promise<ResponseDto<ChangePasswordDto>>;
    validatePasswordToken(token: string): Promise<ResponseDto<ValidatePasswordToken>>;
}

declare class AuthenticationModule implements AuthenticationModuleType {
    private id;
    private connector;
    constructor(id: string);
    /**
     * login. This method authenticates a user.
     * @param email
     * @param password
     */
    login(email: string, password: string): Promise<ResponseDto<LoginDto>>;
    /**
     * register. This method creates a new user account.
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     */
    register(firstName: string, lastName: string, email: string, password: string): Promise<ResponseDto<RegisterDto>>;
    /**
     * verifyAccount. This method verifies a new user account
     * @param tempToken
     * @param token
     */
    verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>>;
    /**
     * resetPassword. This method sends an email for account password reset
     * @param email
     */
    resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>>;
    /**
     * resetPassword. This method sends an email for account password reset
     * @param email
     */
    resetPassword(email: string): Promise<ResponseDto<ResetDto>>;
    /**
     * changePassword. This method changes account password
     * @param token
     * @param password
     */
    changePassword(token: string, password: string): Promise<ResponseDto<ChangePasswordDto>>;
    validatePasswordToken(token: string): Promise<ResponseDto<ValidatePasswordToken>>;
}

type fetchAccountDto = {} & IUser;
type updateUserDto = {
    userName: string;
    profileImage: string;
    profile: {
        contact: {
            country: string;
            state: string;
            city: string;
            address: string;
            phone: string;
        };
        bio: {
            title: string;
            description: string;
        };
        talent: {
            about: string;
            availability: string;
            tags: string[];
            tagsIds: string | any[];
            tagsCategory: string;
        };
        privateEarnings: boolean;
        privateInvestments: boolean;
    };
    socials: {
        github: string;
        twitter: string;
        linkedin: string;
        website: string;
    };
};
type TwoFATypeDto = "google_auth" | "email";
type TwoFAresponse = {
    type: TwoFATypeDto;
    qrCodeUrl?: string;
    tempToken?: {
        token: string;
        expiresIn: number;
    };
};
interface AccountModuleType {
    getUser(): Promise<ResponseDto<fetchAccountDto>>;
    onboardEndpoint(tagCategory: string, profileImage: string, type: string): Promise<ResponseDto<fetchAccountDto>>;
    updateAccount(payload: updateUserDto): Promise<ResponseDto<fetchAccountDto>>;
    changePassword(oldPassword: string, newPassword: string): Promise<ResponseDto<fetchAccountDto>>;
    initate2FA(type: TwoFATypeDto): Promise<ResponseDto<TwoFAresponse>>;
    active2FA(code: string): Promise<ResponseDto<void>>;
    deactive2FA(code: string): Promise<ResponseDto<void>>;
    logout(): Promise<ResponseDto<void>>;
}

declare class AccountModule implements AccountModuleType {
    private id;
    private connector;
    constructor(id: string);
    /**
     * getUser.
     * @param payload CreateJobDto
     */
    getUser(): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * onboardEndpoint.
     * @param skillCategory string
     * @param profileImage string
     * @param type string
     */
    onboardEndpoint(skillCategory: string, profileImage: string, type: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * onboardEndpoint.
     * @param skillCategory string
     * @param profileImage string
     * @param type string
     */
    updateAccount(payload: updateUserDto): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * change Password.
     * @param oldPassword string
     * @param newPassword string
     */
    changePassword(oldPassword: string, newPassword: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * initate2FA.
     * @param type TwoFATypeDto
     */
    initate2FA(type: TwoFATypeDto): Promise<ResponseDto<TwoFAresponse>>;
    /**
     * active2FA.
     * @param code string
     */
    active2FA(code: string): Promise<ResponseDto<void>>;
    /**
     * active2FA.
     * @param code string
     */
    deactive2FA(code: string): Promise<ResponseDto<void>>;
    /**
     * Logout.
     */
    logout(): Promise<ResponseDto<void>>;
}

interface UploadedUser {
    profile: {
        talent: {
            tags: string[];
            availability: string;
            tagsIds: object[];
        };
    };
    _id: string;
    firstName: string;
    lastName: string;
    type: string;
    score: number;
}
interface CreateFileUpload {
    file: Object;
}
interface IUploadDto {
    name: string;
    uploaded_by: UploadedUser | string;
    url: string;
    meta: Record<string, any> | undefined;
    status: boolean;
    deletedAt: Date;
}
interface UploadModuleType {
    fileUpload(payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
}

declare class UploadModule implements UploadModuleType {
    private id;
    private connector;
    constructor(id: string);
    fileUpload(payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
}

interface ICollectionTypeDto {
    _id: string;
    name: string;
    value: string;
    createdAt?: string;
    updateAt?: string;
}
interface IAttachmentDto {
    _id?: string;
    url?: string;
}
interface ICollectionDto {
    _id?: string;
    creator: IUser;
    owner?: IUser;
    owners?: IUser[];
    name: string;
    description: string;
    type: string;
    build?: string;
    category?: string;
    parent?: ICollectionDto | string;
    collections?: ICollectionDto[] | string[];
    stage?: number;
    image?: IUploadDto;
    invite?: string;
    invites?: string[];
    applications?: string[];
    wallet?: string;
    attachments?: IAttachmentDto[];
    attachmentData?: string[];
    status?: string;
    inviteAccepted?: boolean;
    isPrivate?: boolean;
    emailToken?: string;
    rating?: string;
    recipientRating?: string;
    score?: number;
    progress?: number;
    isDeleted?: boolean;
    charges?: string;
    expectedAmount?: string;
    usdExpectedAmount?: string;
    usdExpectedFee?: string;
    rate?: string;
    cancellationReason?: string;
    completed?: boolean;
}
type CreateCollectionDto = {
    type: string;
    name: string;
    category?: string;
    description: string;
    isPrivate: boolean;
    deliveryDate?: string;
    tags?: string[];
    attachments?: string[];
};
type CreateManyCollectionDto = {
    type: string;
    parent: string;
    collections: {
        name: string;
        description: string;
        isPrivate: boolean;
        category?: string;
        deliveryDate?: string;
        tags?: string[];
        attachments?: string[];
    }[];
};
type assignCollectionDto = {
    collectionId: string;
    talentId: string;
};
type FindCollectionDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    data: ICollectionDto[];
};
type FindCollectionTypeDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    data: ICollectionTypeDto[];
};
type filterCollectionDto = ({
    page?: string;
    limit?: string;
} & ICollectionDto) | any;
type cancelJobDto = {
    reason: string;
    paymentPercentage: number;
};
interface CollectionModuleType {
    getAll(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
    getById(id: string): Promise<ResponseDto<ICollectionDto>>;
    getTypes(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
    create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
    createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
}

interface ICollectionBookmarkDto {
    _id?: string;
    owner: string;
    data: ICollectionDto | string;
    active: boolean;
    isDeleted?: boolean;
}
type FindCollectionBookMarkDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    data: ICollectionBookmarkDto[];
};
type createBookMarkDto = {
    collection: string;
};
type filterBookmarkDto = {
    page?: string;
    limit?: string;
} | ICollectionBookmarkDto;
interface BookMarkModuleType {
    getAll(filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
    getById(id: string, filter?: Record<string, any> | ICollectionBookmarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    delete(id: string): Promise<ResponseDto<any>>;
}

declare class BookMarkModule {
    private id;
    private connector;
    constructor(id: string);
    /**
     * findall. This method finds all logged User's Bookmark collections.
     * @param filter filterNotificationDto
     */
    getAll(filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
    /**
     * findall. This method finds bookmarked collection by id.
     * @param filter Record<string, any>
     */
    getById(id: string, filter?: Record<string, any> | ICollectionBookmarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    /**
     * create. This method creates a new collection bookmark.
     * @param payload CreateJobDto
     */
    create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    /**
     * delete. This method deleted a collection bookmark.
     * @param payload CreateJobDto
     */
    delete(id: string): Promise<ResponseDto<ICollectionBookmarkDto>>;
}

declare class CollectionModule {
    private id;
    private connector;
    constructor(id: string);
    /**
     * findall. This method finds all logged User's Jobs both created and assigned.
     * @param filter filterDto
     */
    getAll(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
    /**
     * findall. This method finds all logged User's Jobs both created and assigned.
     * @param filter filterCollectionDto
     */
    getById(id: string, filter?: filterCollectionDto): Promise<ResponseDto<ICollectionDto>>;
    /**
     * getTypes. This method finds collection types accepted for creating collection
     * @param filter filterDto
     */
    getTypes(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
    /**
     * create. This method creates a new Job.
     * @param payload CreateCollectionDto
     */
    create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
    /**
     * createMany. This method creates multiple collections for a type
     * @param filter CreateManyCollectionDto
     */
    createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
}

declare enum INotificationType {
    NEW_PROJECT = "new_project",
    NEW_JOB = "new_job",
    ASSIGNED_JOB = "assigned_job",
    NEW_DEPOSIT = "new_deposit",
    NEW_TRANSFER = "new_transfer",
    NEW_WITHDRAWAL = "new_withdrawal",
    INVITE_ACCEPTED = "invite_accepted",
    INVITE_RECEIVED = "invite_received",
    INVITE_REJECTED = "invite_rejected",
    ADMIN_CONFIGURE = "ADMIN_CONFIGURE",
    USER_REGISTER = "USER_REGISTER",
    USER_LOGIN = "USER_LOGIN",
    PROJECT_CREATE = "PROJECT_CREATE",
    JOB_CREATE = "JOB_CREATE",
    JOB_ASSIGN = "JOB_ASSIGN",
    JOB_CANCEL = "JOB_CANCEL",
    JOB_APPLY = "JOB_APPLY",
    WALLET_GENERATED = "WALLET_GENERATED"
}
interface NotificationUser {
    profile: {
        talent: {
            tags: string[];
            availability: string;
            skillIds: object[];
        };
    };
    _id: string;
    firstName: string;
    lastName: string;
    type: string;
    score: number;
}
interface INotificationDto {
    owner: NotificationUser;
    title: string;
    description: string;
    read: boolean;
    notifyUser: NotificationUser;
    data: string;
    isAdmin: boolean;
    type: INotificationType;
}
type FindNotificationDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    notification: INotificationDto[];
};
type filterNotificationDto = ({
    page?: string;
    limit?: string;
} & INotificationDto) | any;
interface NotificationModuleType {
    getAll(filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>>;
    markOneAsRead(id: string, filter?: filterNotificationDto): Promise<ResponseDto<void>>;
    markAll(): Promise<ResponseDto<void>>;
}

declare class NotificationModule implements NotificationModuleType {
    private id;
    private connector;
    constructor(id: string);
    getAll(filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>>;
    markAll(): Promise<ResponseDto<void>>;
    markOneAsRead(id: string): Promise<ResponseDto<void>>;
}

interface AddReviewDto {
    collectionId: string;
    rating: number;
    review: string;
}
interface ReviewModuleType {
    addReview(payload: AddReviewDto): Promise<ResponseDto<void>>;
}

declare class ReviewModule implements ReviewModuleType {
    private id;
    private connector;
    constructor(id: string);
    addReview(payload: AddReviewDto): Promise<ResponseDto<void>>;
}

interface WalletUser {
    profile: {
        talent: {
            tags: string[];
            availability: string;
            tagsIds: object[];
        };
    };
    _id: string;
    firstName: string;
    lastName: string;
    type: string;
    score: number;
}
declare enum IWalletStatus {
    ACTIVE = "active",
    DEACTIVATED = "deactivated",
    BLOCKED = "blocked"
}
declare enum ITransactionStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
declare enum ITransactionMethod {
    SENT = "sent",
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    RECIEVED = "recieved",
    ESCROW = "escrow",
    JOBPAYOUT = "job-payout",
    FEEPAYOUT = "fee-payout"
}
interface IWalletExchangeDto {
    avax: number;
}
interface IWalletDto {
    owner: WalletUser;
    amount: number;
    ledger: number;
    lock: number;
    lockedUsd: number;
    usdValue: number;
    usdRate: number;
    spendable: number;
    address: string;
    coin: string;
    walletId: string;
    walletData: string;
    status: IWalletStatus;
    prod: boolean;
    isSystem: boolean;
}
interface ITransactionDto$1 {
    owner: WalletUser;
    amount: number;
    sender: string;
    reciever: string;
    currency: string;
    usdValue: number;
    description: string;
    tx: string;
    type: string;
    hash: string;
    method: ITransactionMethod;
    status: ITransactionStatus;
}
type FindTransactionsDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    transactions: ITransactionDto$1[];
};
interface ITransactionStatsDto {
    _id: number;
    count: number;
    date: string;
}
interface AggTxns {
    type: string;
    amount: number;
    date: string;
}
interface WalletModuleType {
    getExchange(): Promise<ResponseDto<IWalletExchangeDto>>;
    getTransactions(): Promise<ResponseDto<FindTransactionsDto>>;
    getATransaction(id: string): Promise<ResponseDto<ITransactionDto$1>>;
    getTransactionStats(): Promise<ResponseDto<ITransactionStatsDto[]>>;
    getAggregateTransactionStats(): Promise<ResponseDto<AggTxns[]>>;
    getWalletData(): Promise<ResponseDto<IWalletDto>>;
    getWallets(): Promise<ResponseDto<IWalletDto[]>>;
    getSingleWallet(coin: string): Promise<ResponseDto<IWalletDto>>;
}

declare class WalletModule implements WalletModuleType {
    private id;
    private coin;
    private connector;
    constructor(id: string, coin?: string);
    getTransactions(): Promise<ResponseDto<FindTransactionsDto>>;
    getATransaction(id: string): Promise<ResponseDto<ITransactionDto$1>>;
    getTransactionStats(): Promise<ResponseDto<ITransactionStatsDto[]>>;
    getAggregateTransactionStats(): Promise<ResponseDto<AggTxns[]>>;
    getWalletData(): Promise<ResponseDto<IWalletDto>>;
    getWallets(): Promise<ResponseDto<IWalletDto[]>>;
    getSingleWallet(coin: string): Promise<ResponseDto<IWalletDto>>;
    getExchange(): Promise<ResponseDto<IWalletExchangeDto>>;
}

interface CreateWithdrawal {
    coin: string;
    amount: number;
    address: string;
    password: string;
}
interface FilterWithdrawal {
    page: number;
    limit: number;
    owner: string;
}
type FindWithdrawalsDto = {
    page: number;
    pages: number;
    total: number;
    data: IWithdrawalDto[];
};
interface ITransactionDto {
    owner: IUser | string;
    amount: number;
    sender: string;
    reciever: IUser | string;
    currency: string;
    usdValue: number;
    description: string;
    tx: string;
    type: string;
    hash: string;
    method: string;
    status: string;
    data?: string;
    createdAt?: string;
    updatedAt?: string;
}
interface IWithdrawalDto {
    owner: string | IUser;
    txId: string | ITransactionDto;
    chainTxId: string;
    coin: string;
    address: string;
    amount: number;
    usdValue: number;
    usdRate: number;
    status: string;
}
interface WithdrawalModuleType {
    createWithdrawal(payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
    fetchWithdrawal(filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>>;
}

declare class WithdrawalModule implements WithdrawalModuleType {
    private id;
    private connector;
    constructor(id: string);
    createWithdrawal(payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
    fetchWithdrawal(filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>>;
}

declare class PaktSDK {
    auth: AuthenticationModuleType;
    bookmark: BookMarkModuleType;
    collection: CollectionModuleType;
    account: AccountModuleType;
    notifications: NotificationModuleType;
    file: UploadModuleType;
    wallet: WalletModuleType;
    withdrawal: WithdrawalModuleType;
    review: ReviewModuleType;
    constructor(id: string);
    /**
     * Initialize Pakt SDK. This method must be called before any other method.
     * Default configuration is used if no configuration is provided.
     * @param config
     */
    static init(config: PaktConfig): Promise<PaktSDK>;
    /**
     * Generate Random String. This method is used to generate random strings.
     * @param config
     */
    private static generateRandomString;
}

declare const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
declare const API_PATHS: {
    API_VERSION: string;
    LOGIN: string;
    REGISTER: string;
    ACCOUNT_VERIFY: string;
    RESEND_VERIFY_LINK: string;
    VALIDATE_PASSWORD_TOKEN: string;
    RESET_PASSWORD: string;
    CHANGE_PASSWORD: string;
    COLLECTION: string;
    COLLECTION_TYPE: string;
    COLLECTION_MANY: string;
    BOOKMARK: string;
    NOTIFICATION_FETCH: string;
    NOTIFICATION_MARK_ALL: string;
    NOTIFICATION_MARK_ONE: string;
    ACCOUNT: string;
    ACCOUNT_ONBOARD: string;
    ACCOUNT_UPDATE: string;
    ACCOUNT_PASSWORD: string;
    ACCOUNT_TWO_INIT: string;
    ACCOUNT_TWO_ACTIVATE: string;
    ACCOUNT_TWO_DEACTIVATE: string;
    ACCOUNT_LOGOUT: string;
    WALLET_TRANSACTIONS: string;
    A_WALLET_TRANSACTION: string;
    WALLET_EXCHANGE: string;
    WALLET_DATA: string;
    WALLET_STATS: string;
    WALLET_AGGREGATE_STATS: string;
    WALLETS: string;
    SINGLE_WALLET: string;
    FILE_UPLOAD: string;
    ADD_REVIEW: string;
    CREATE_WITHDRAWAL: string;
    FETCH_WITHDRAWALS: string;
};

declare const PAKT_CONFIG: Token<PaktConfig>;
declare const AUTH_TOKEN: Token<string>;
declare const TEMP_TOKEN: Token<string>;

export { API_PATHS, AUTH_TOKEN, AccountModule, AccountModuleType, AccountVerifyDto, AddReviewDto, AggTxns, AuthenticationModule, AuthenticationModuleType, BookMarkModule, BookMarkModuleType, CHARACTERS, ChangePasswordDto, CollectionModule, CollectionModuleType, CreateCollectionDto, CreateFileUpload, CreateManyCollectionDto, CreateWithdrawal, ErrorUtils, FilterWithdrawal, FindCollectionBookMarkDto, FindCollectionDto, FindCollectionTypeDto, FindNotificationDto, FindTransactionsDto, FindWithdrawalsDto, ICollectionBookmarkDto, ICollectionDto, INotificationDto, ITransactionDto$1 as ITransactionDto, ITransactionStatsDto, IUploadDto, IUser, IWalletDto, IWalletExchangeDto, IWithdrawalDto, LoginDto, NotificationModule, NotificationModuleType, PAKT_CONFIG, PaktConfig, PaktSDK, RegisterDto, ResendVerifyDto, ResetDto, ResponseDto, ReviewModule, ReviewModuleType, Status, TEMP_TOKEN, TwoFATypeDto, TwoFAresponse, UploadModule, UploadModuleType, ValidatePasswordToken, WalletModule, WalletModuleType, WithdrawalModule, WithdrawalModuleType, assignCollectionDto, cancelJobDto, createBookMarkDto, fetchAccountDto, filterBookmarkDto, filterCollectionDto, filterNotificationDto, parseUrlWithQUery, updateUserDto };
