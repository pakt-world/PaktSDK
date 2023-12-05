import { Token } from 'typedi';

interface PaktConfig {
    baseUrl: string;
    token: string;
    testnet?: boolean;
    verbose?: boolean;
}

declare enum Status {
    SUCCESS = "success",
    ERROR = "error"
}
interface ResponseDto<T> {
    data: T;
    status: Status;
    message?: string;
    code?: string;
    statusCode?: number;
    validation?: Record<string, any>;
}
type ErrorWithMessage = {
    message: string[] | object[] | any;
    code?: string;
};
declare const ErrorUtils: {
    tryFail: <T>(f: (() => Promise<T>) | (() => T)) => Promise<ResponseDto<T>>;
    newTryFail: <T_1>(f: (() => Promise<T_1>) | (() => T_1)) => Promise<T_1>;
    formatErrorMsg: (message: string) => string;
    toErrorWithMessage: (maybeError: unknown) => ErrorWithMessage;
    isErrorWithMessage(e: unknown): e is ErrorWithMessage;
};
declare const parseUrlWithQuery: (url: string, filter: object | any) => string;

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
    VALIDATE_REFERRAL: string;
    COLLECTION: string;
    COLLECTION_TYPE: string;
    COLLECTION_MANY: string;
    COLLECTION_UPDATE: string;
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
    ACCOUNT_FETCH_ALL: string;
    ACCOUNT_FETCH_SINGLE: string;
    ACCOUNT_LOGOUT: string;
    ACCOUNT_SEND_EMAIL_TWO_FA: string;
    TRANSACTIONS: string;
    A_TRANSACTION: string;
    TRANSACTION_STATS: string;
    TRANSACTION_AGGREGATE_STATS: string;
    TRANSACTION_EXCHANGE: string;
    WALLETS: string;
    SINGLE_WALLET: string;
    FILE_UPLOAD: string;
    ADD_REVIEW: string;
    GET_REVIEW: string;
    CREATE_WITHDRAWAL: string;
    FETCH_WITHDRAWALS: string;
    CREATE_SESSION: string;
    SEND_SESSION_MEDIA: string;
    SESSION_ATTEMPTS: string;
    USER_VERIFICATION: string;
    DELETE_SESSION: string;
    GET_USER_MESSAGES: string;
    CREATE_CONNECTION_FILTER: string;
    GET_CONNECTION_FILTER: string;
    UPDATE_CONNECTION_FILTER: string;
    SEND_INVITE: string;
    ACCEPT_INVITE: string;
    DECLINE_INVITE: string;
    VIEW_ALL_INVITE: string;
    VIEW_A_INVITE: string;
    CANCEL_AN_INVITE: string;
    FEEDS: string;
    FEEDS_DISMISS_ONE: string;
    FEEDS_DISMISS_ALL: string;
    CREATE_ORDER: string;
    VALIDATE_ORDER: string;
    RELEASE_ORDER: string;
    PAYMENT_METHODS: string;
    RPC: string;
};
type expectedISOCountries = "AW" | "AF" | "AO" | "AI" | "AX" | "AL" | "AD" | "AE" | "AR" | "AM" | "AS" | "AG" | "AU" | "AT" | "AZ" | "BI" | "BE" | "BJ" | "BF" | "BD" | "BG" | "BH" | "BS" | "BA" | "BL" | "BY" | "BZ" | "BM" | "BO" | "BR" | "BB" | "BN" | "BT" | "BW" | "CF" | "CA" | "CC" | "CH" | "CL" | "CN" | "CI" | "CM" | "CD" | "CD" | "CG" | "CK" | "CO" | "KM" | "CI" | "CV" | "CR" | "CU" | "CW" | "CX" | "KY" | "CY" | "CZ" | "DE" | "DJ" | "DM" | "DK" | "DO" | "DO" | "DO" | "DZ" | "EC" | "EG" | "ER" | "EH" | "ES" | "EE" | "ET" | "FI" | "FJ" | "FK" | "FR" | "FO" | "FM" | "GA" | "GB" | "GE" | "GG" | "GH" | "GI" | "GN" | "GP" | "GM" | "GW" | "GQ" | "GR" | "GD" | "GL" | "GT" | "GF" | "GU" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IM" | "IN" | "IO" | "IE" | "IR" | "IQ" | "IS" | "IL" | "IT" | "JM" | "JE" | "JO" | "JP" | "KZ" | "KZ" | "KE" | "KG" | "KH" | "KI" | "KN" | "KR" | "XK" | "KW" | "LA" | "LB" | "LR" | "LY" | "LC" | "LI" | "LK" | "LS" | "LT" | "LU" | "LV" | "MO" | "MF" | "MA" | "MC" | "MD" | "MG" | "MV" | "MX" | "MH" | "MK" | "ML" | "MT" | "MM" | "ME" | "MN" | "MP" | "MZ" | "MR" | "MS" | "MQ" | "MU" | "MW" | "MY" | "YT" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NU" | "NL" | "NO" | "NP" | "NR" | "NZ" | "OM" | "PK" | "PA" | "PN" | "PE" | "PH" | "PW" | "PG" | "PL" | "PR" | "PR" | "KP" | "PT" | "PY" | "PS" | "PF" | "QA" | "RE" | "RO" | "RU" | "RW" | "SA" | "SD" | "SN" | "SG" | "GS" | "SJ" | "SB" | "SL" | "SV" | "SM" | "SO" | "PM" | "RS" | "SS" | "ST" | "SR" | "SK" | "SI" | "SE" | "SZ" | "SX" | "SC" | "SY" | "TC" | "TD" | "TG" | "TH" | "TJ" | "TK" | "TM" | "TL" | "TO" | "TT" | "TN" | "TR" | "TV" | "TW" | "TZ" | "UG" | "UA" | "UY" | "US" | "UZ" | "VA" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "YE" | "ZA" | "ZM" | "ZW";

declare const PAKT_CONFIG: Token<PaktConfig>;
declare const AUTH_TOKEN: Token<string>;
declare const TEMP_TOKEN: Token<string>;
declare const isEmpty: (value: unknown) => boolean;

interface IChatMessage {
    _id: string;
    user: IUser | string;
    type: string;
    conversation: IChatConversation | string;
    mediaId: IFile | string;
    content: string;
    quotedContent: string;
    quotedContentId: IChatMessage | string;
    mediaType?: string;
    seen?: string;
    readBy?: string[];
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updateAt?: string | Date;
}
interface IChatConversation {
    _id: string;
    type: string;
    recipients: IUser[] | string[];
    messages: IChatMessage[] | string[];
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updateAt?: string | Date;
}
interface IFile {
    _id: string;
    name: string;
    uploaded_by: IUser | string;
    url: string;
    meta: object;
    status: boolean;
    isDeleted: boolean;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
interface ChatModuleType {
    getUserMessages(authToken: string): Promise<ResponseDto<IChatConversation[]>>;
}

type IUserTwoFaType = "email" | "google_auth" | "security_answer";
interface IUser {
    _id: string;
    type: string;
    email: string;
    lastName: string;
    firstName: string;
    score: number;
    profileCompleteness: number;
    profileImage?: {
        _id?: string;
        type?: string;
        size?: string;
        url: string;
    };
    bgImage?: {
        _id?: string;
        type?: string;
        size?: string;
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
            availability: "busy" | "available" | "working";
            tags: string[];
            tagsIds: any[];
            tagsCategory: string;
            about?: string;
        };
    };
    isPrivate?: boolean;
    socket?: {
        id: string;
        status: "ONLINE" | "AWAY" | "OFFLINE";
        conversation: IChatConversation;
    };
    twoFa?: {
        status: boolean;
        type: IUserTwoFaType;
        securityQuestion?: string;
    };
    meta?: Record<string, any>;
    isBookmarked?: boolean;
    bookmarkId?: string;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
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
interface RegisterDto {
    tempToken: {
        token: string;
        token_type: string;
        expiresIn: number;
    };
}
interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referral?: string;
}
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
type ValidateReferralDto = {
    valid: boolean;
    userId: string;
    referralId: string;
};
interface AuthenticationModuleType {
    login(email: string, password: string): Promise<ResponseDto<LoginDto>>;
    register(payload: RegisterPayload): Promise<ResponseDto<RegisterDto>>;
    verifyAccount(tempToken: string, token: string): Promise<ResponseDto<AccountVerifyDto>>;
    resendVerifyLink(email: string): Promise<ResponseDto<ResetDto>>;
    resetPassword(email: string): Promise<ResponseDto<ResetDto>>;
    changePassword(token: string, tempToken: string, password: string): Promise<ResponseDto<ChangePasswordDto>>;
    validatePasswordToken(token: string, tempToken: string): Promise<ResponseDto<ValidatePasswordToken>>;
    validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>;
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
    register(payload: RegisterPayload): Promise<ResponseDto<RegisterDto>>;
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
    changePassword(token: string, tempToken: string, password: string): Promise<ResponseDto<ChangePasswordDto>>;
    validatePasswordToken(token: string, tempToken: string): Promise<ResponseDto<ValidatePasswordToken>>;
    validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>;
}

type fetchAccountDto = {} & IUser;
interface updateUserDto {
    profileImage?: string;
    bgImage?: string;
    profile?: {
        contact?: {
            country?: string;
            state?: string;
            city?: string;
            address?: string;
            phone?: string;
        };
        bio?: {
            title?: string;
            description?: string;
        };
        talent?: {
            about?: string;
            availability?: "busy" | "available" | "working";
            tags?: string[];
            tagsIds?: string | any[];
            tagsCategory?: string;
        };
    };
    isPrivate?: boolean;
    socials?: {
        github?: string;
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
    meta?: Record<string, any>;
}
type TwoFATypeDto = "google_auth" | "email";
type TwoFAresponse = {
    type: TwoFATypeDto;
    qrCodeUrl?: string;
    tempToken?: {
        token: string;
        expiresIn: number;
    };
};
interface FilterUserDto {
    sort?: "score" | string;
    search?: string;
    tags?: string[];
    range?: number[];
    type?: "recipient" | "creator";
    owner?: boolean;
    profileCompletenessMin?: number;
    profileCompletenessMax?: number;
    page?: number;
    limit?: number;
}
interface FindUsers {
    pages: number;
    page: number;
    total: number;
    limit: number;
    data: Record<string, any>[] | IUser[];
}
interface AccountModuleType {
    getUser(authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    onboardEndpoint(tagCategory: string, profileImage: string, type: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    updateAccount(payload: updateUserDto, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    changePassword(oldPassword: string, newPassword: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    initate2FA(type: TwoFATypeDto, authToken: string): Promise<ResponseDto<TwoFAresponse>>;
    activate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
    deactivate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
    sendEmailTwoFA(authToken: string): Promise<ResponseDto<{}>>;
    getAUser(id: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    getUsers(authToken: string, filter?: FilterUserDto): Promise<ResponseDto<FindUsers>>;
    logout(authToken: string): Promise<ResponseDto<void>>;
}

declare class AccountModule implements AccountModuleType {
    private id;
    private connector;
    constructor(id: string);
    /**
     * getUser.
     */
    getUser(authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * onboardEndpoint.
     * @param skillCategory string
     * @param profileImage string
     * @param type string
     */
    onboardEndpoint(skillCategory: string, profileImage: string, type: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * onboardEndpoint.
     * @param skillCategory string
     * @param profileImage string
     * @param type string
     */
    updateAccount(payload: updateUserDto, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * change Password.
     * @param oldPassword string
     * @param newPassword string
     */
    changePassword(oldPassword: string, newPassword: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    /**
     * initate2FA.
     * @param type TwoFATypeDto
     */
    initate2FA(type: TwoFATypeDto, authToken: string): Promise<ResponseDto<TwoFAresponse>>;
    /**
     * active2FA.
     * @param code string
     */
    activate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
    /**
     * active2FA.
     * @param code string
     */
    deactivate2FA(code: string, authToken: string): Promise<ResponseDto<void>>;
    sendEmailTwoFA(authToken: string): Promise<ResponseDto<{}>>;
    getAUser(id: string, authToken: string): Promise<ResponseDto<fetchAccountDto>>;
    getUsers(authToken: string, filter?: FilterUserDto | undefined): Promise<ResponseDto<FindUsers>>;
    /**
     * Logout.
     */
    logout(authToken: string): Promise<ResponseDto<void>>;
}

type IInviteStatus = "pending" | "accepted" | "rejected";
interface IInviteDto {
    _id: string;
    sender: IUser | string;
    receiver: IUser | string;
    data: ICollectionDto | string;
    message: string;
    description: string;
    status: IInviteStatus;
    emailToken: string;
    acceptedAt?: string;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
interface SendInviteDto {
    recipient: string;
    collection: string;
}
type FilterInviteDto = ({
    page?: string;
    limit?: string;
} & IInviteDto) | any;
interface FindInvitesDto {
    data: IInviteDto[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
interface InviteModuleType {
    sendInvite(authToken: string, payload: SendInviteDto): Promise<ResponseDto<{}>>;
    acceptInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
    declineInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
    cancelInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
    getAll(authToken: string, filter?: FilterInviteDto): Promise<ResponseDto<FindInvitesDto>>;
    getAnInvite(authToken: string, id: string): Promise<ResponseDto<IInviteDto>>;
}

declare class InviteModule implements InviteModuleType {
    private id;
    private connector;
    constructor(id: string);
    sendInvite(authToken: string, payload: SendInviteDto): Promise<ResponseDto<{}>>;
    acceptInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
    declineInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
    getAll(authToken: string, filter?: FilterInviteDto): Promise<ResponseDto<FindInvitesDto>>;
    getAnInvite(authToken: string, id: string): Promise<ResponseDto<IInviteDto>>;
    cancelInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>>;
}

declare class CollectionModule implements CollectionModuleType {
    private id;
    private connector;
    constructor(id: string);
    /**
     * findall. This method finds all logged User's Jobs both created and assigned.
     * @param filter filterDto
     */
    getAll(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
    /**
     * findall. This method finds all logged User's Jobs both created and assigned.
     * @param filter filterCollectionDto
     */
    getById(authToken: string, id: string): Promise<ResponseDto<ICollectionDto>>;
    /**
     * getTypes. This method finds collection types accepted for creating collection
     * @param filter filterDto
     */
    getTypes(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
    /**
     * create. This method creates a new Job.
     * @param payload CreateCollectionDto
     */
    create(authToken: string, payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
    /**
     * createMany. This method creates multiple collections for a type
     * @param filter CreateManyCollectionDto
     */
    createMany(authToken: string, payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
    updateCollection(authToken: string, id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>>;
    getACollectionType(authToken: string, typeId: string): Promise<ResponseDto<ICollectionTypeDto>>;
    deleteACollection(authToken: string, collectionId: string): Promise<ResponseDto<{}>>;
    updateManyCollections(authToken: string, collections: UpdateManyCollectionsDto): Promise<ResponseDto<{}>>;
}

interface AddReviewDto {
    collectionId: string;
    rating: number;
    review: string;
    receiver: string;
}
interface FindReviewDto {
    count: number;
    pages: number;
    data: IReviewDto[];
}
type FilterReviewDto = ({
    page?: string;
    limit?: string;
} & IReviewDto) | any;
interface IReviewDto {
    _id: string;
    data: ICollectionDto;
    owner: IUser | string;
    receiver: IUser | string;
    type: string;
    review: string;
    rating: number;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
interface ReviewModuleType {
    addReview(authToken: string, payload: AddReviewDto): Promise<ResponseDto<void>>;
    viewAll(authToken: string, filter?: FilterReviewDto): Promise<ResponseDto<FindReviewDto>>;
    viewAReview(authToken: string, reviewId: string): Promise<ResponseDto<IReviewDto>>;
}

declare class ReviewModule implements ReviewModuleType {
    private id;
    private connector;
    constructor(id: string);
    viewAll(authToken: string, filter?: FilterReviewDto | undefined): Promise<ResponseDto<FindReviewDto>>;
    viewAReview(authToken: string, reviewId: string): Promise<ResponseDto<IReviewDto>>;
    addReview(authToken: string, payload: AddReviewDto): Promise<ResponseDto<void>>;
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
    _id: string;
    name: string;
    uploaded_by: UploadedUser | string;
    url: string;
    meta: Record<string, any> | undefined;
    status: boolean;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
interface FindUploadDto {
    count: number;
    pages: number;
    data: IUploadDto[];
}
type FilterUploadDto = ({
    page?: string;
    limit?: string;
} & IUploadDto) | any;
interface UploadModuleType {
    fileUpload(authToken: string, payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
    getFileUploads(authToken: string, filter?: FilterUploadDto): Promise<ResponseDto<FindUploadDto>>;
    getAFileUpload(authToken: string, id: string): Promise<ResponseDto<IUploadDto>>;
}

declare class UploadModule implements UploadModuleType {
    private id;
    private connector;
    constructor(id: string);
    fileUpload(authToken: string, payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
    getFileUploads(authToken: string, filter: FilterUploadDto): Promise<ResponseDto<FindUploadDto>>;
    getAFileUpload(authToken: string, id: string): Promise<ResponseDto<IUploadDto>>;
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
type ITransactionType = "sent" | "deposit" | "withdrawal" | "recieved" | "escrow" | "job-payout" | "fee-payout";
interface IWalletExchangeDto {
    avax: number;
}
interface IWalletDto {
    _id: string;
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
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updateAt?: string | Date;
}
interface ITransactionDto$1 {
    _id: string;
    owner: WalletUser;
    amount: number;
    sender: string;
    reciever: string;
    currency: string;
    usdValue: number;
    description: string;
    tx: string;
    type: ITransactionType;
    hash: string;
    method: ITransactionMethod;
    status: ITransactionStatus;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
type FindTransactionsDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    transactions: ITransactionDto$1[];
};
type ITransactionStatsFormat = "weekly" | "monthly" | "yearly";
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
    getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>>;
    getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>>;
    getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto$1>>;
    getTransactionStats(authToken: string, format: ITransactionStatsFormat): Promise<ResponseDto<ITransactionStatsDto[]>>;
    getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>>;
    getWallets(authToken: string): Promise<ResponseDto<IWalletDto[]>>;
    getSingleWallet(authToken: string, coin: string): Promise<ResponseDto<IWalletDto>>;
}

declare class WalletModule implements WalletModuleType {
    private id;
    private coin;
    private connector;
    constructor(id: string, coin?: string);
    getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>>;
    getATransaction(authToken: string, id: string): Promise<ResponseDto<ITransactionDto$1>>;
    getTransactionStats(authToken: string): Promise<ResponseDto<ITransactionStatsDto[]>>;
    getAggregateTransactionStats(authToken: string): Promise<ResponseDto<AggTxns[]>>;
    getWallets(authToken: string): Promise<ResponseDto<IWalletDto[]>>;
    getSingleWallet(authToken: string, coin: string): Promise<ResponseDto<IWalletDto>>;
    getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>>;
}

interface ICollectionTypeDto {
    _id: string;
    name: string;
    value: string;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updateAt?: string | Date;
}
type ICollectionStatus = "ongoing" | "pending" | "deleted" | "waiting" | "cancelled" | "completed";
interface IAttachmentDto {
    _id?: string;
    url?: string;
}
interface ICollectionDto {
    _id?: string;
    creator: IUser;
    owner?: IUser;
    receiver?: IUser;
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
    invite?: string | IInviteDto;
    invites?: string[] | IInviteDto[];
    applications?: string[];
    wallet?: string | IWalletDto;
    attachments?: IAttachmentDto[];
    attachmentData?: string[];
    status?: ICollectionStatus;
    inviteAccepted?: boolean;
    isPrivate?: boolean;
    rating?: string | IReviewDto;
    recipientRating?: string | IReviewDto;
    ratings?: string[] | IReviewDto[];
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
    payoutTransactions?: string[];
    failedPayoutCount?: number;
    meta?: Record<string, any>;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
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
    meta?: Record<string, any>;
    paymentFee?: number;
    parent?: string;
    image?: string;
    status?: ICollectionStatus;
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
        meta?: Record<string, any>;
        paymentFee?: number;
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
    receiver?: string;
} & ICollectionDto) | any;
type cancelCollectionDto = {
    reason: string;
    paymentPercentage: number;
};
interface UpdateCollectionDto {
    type?: string;
    name: string;
    description: string;
    isPrivate?: boolean;
    category?: string | undefined;
    paymentFee?: number | undefined;
    deliveryDate?: string | undefined;
    tags?: string[] | undefined;
    parent?: string;
    image?: string;
    status?: ICollectionStatus;
    attachments?: string[];
    meta?: Record<string, any>;
}
interface UpdateManyCollectionsDto {
    collections: {
        id: string;
        type?: string;
        name: string;
        description: string;
        isPrivate?: boolean;
        category?: string | undefined;
        paymentFee?: number | undefined;
        deliveryDate?: string | undefined;
        tags?: string[] | undefined;
        parent?: string;
        image?: string;
        status?: ICollectionStatus;
        attachments?: string[];
        meta?: Record<string, any>;
    }[];
}
interface CollectionModuleType {
    getAll(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
    getById(authToken: string, id: string): Promise<ResponseDto<ICollectionDto>>;
    getTypes(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
    getACollectionType(authToken: string, typeId: string): Promise<ResponseDto<ICollectionTypeDto>>;
    create(authToken: string, payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
    createMany(authToken: string, payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
    updateCollection(authToken: string, id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>>;
    deleteACollection(authToken: string, id: string): Promise<ResponseDto<{}>>;
    updateManyCollections(authToken: string, collections: UpdateManyCollectionsDto): Promise<ResponseDto<{}>>;
}

interface IFeed {
    _id: string;
    creator?: string;
    owner?: string;
    owners?: IUser[] | string[];
    data?: ICollectionDto | string;
    description: string;
    title: string;
    type: string;
    isPublic?: boolean;
    closed?: boolean;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
declare enum FEED_TYPES_ENUM {
    COLLECTION_INVITE = "collection_invite",
    COLLECTION_INVITE_REJECTED = "collection_invite_rejected",
    COLLECTION_INVITE_ACCEPTED = "collection_invite_accepted",
    COLLECTION_INVITE_CANCELLED = "collection_invite_cancelled",
    COLLECTION_CREATED = "collection_created",
    COLLECTION_UPDATE = "collection_update",
    COLLECTION_DELIVERED = "collection_delivered",
    COLLECTION_CANCELLED = "collection_cancelled",
    COLLECTION_COMPLETED = "collection_completed",
    COLLECTION_REVIEWED = "collection_reviewed",
    PAYMENT_RELEASED = "payment_released",
    REFERRAL_SIGNUP = "referral_signup",
    REFERRAL_COLLECTION_COMPLETION = "referral_job_completion"
}
type FEED_TYPES = "collection_invite" | "collection_invite_rejected" | "collection_invite_accepted" | "collection_invite_cancelled" | "collection_created" | "collection_update" | "collection_delivered" | "collection_cancelled" | "collection_completed" | "collection_reviewed" | "payment_released" | "referral_signup" | "referral_job_completion";
interface CreateFeedDto {
    title: string;
    description: string;
    type: FEED_TYPES;
    data: string;
    isPublic: boolean;
    owners?: string[] | string;
}
type FilterFeedDto = {
    page?: string;
    limit?: string;
    owner?: string;
    type?: FEED_TYPES;
    isOwner?: boolean;
    isPublic?: boolean;
};
interface FindFeedDto {
    data: IFeed[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
interface FeedModuleType {
    create(authToken: string, payload: CreateFeedDto): Promise<ResponseDto<{}>>;
    getAll(authToken: string, filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>>;
    getById(authToken: string, filterId: string): Promise<ResponseDto<IFeed>>;
    dismissAllFeeds(authToken: string): Promise<ResponseDto<{}>>;
    dismissAFeed(authToken: string, filterId: string): Promise<ResponseDto<{}>>;
}

declare class FeedModule implements FeedModuleType {
    private id;
    private connector;
    constructor(id: string);
    create(authToken: string, payload: CreateFeedDto): Promise<ResponseDto<{}>>;
    getAll(authToken: string, filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>>;
    getById(authToken: string, filterId: string): Promise<ResponseDto<IFeed>>;
    dismissAllFeeds(authToken: string): Promise<ResponseDto<{}>>;
    dismissAFeed(authToken: string, filterId: string): Promise<ResponseDto<{}>>;
}

interface ICollectionBookmarkDto {
    _id?: string;
    owner?: IUser | string;
    data?: ICollectionDto | string;
    feed?: IFeed;
    invite?: IInviteDto;
    user?: IUser;
    type?: BookmarkType;
    active?: boolean;
    isDeleted?: boolean;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
type FindCollectionBookMarkDto = {
    page: number;
    pages: number;
    total: number;
    limit: number;
    data: ICollectionBookmarkDto[];
};
type createBookMarkDto = {
    reference: string;
    type: BookmarkType;
};
type filterBookmarkDto = {
    page?: string;
    limit?: string;
} | ICollectionBookmarkDto | Record<string, any>;
declare enum BookmarkEnumType {
    FEED = "feed",
    COLLECTION = "collection",
    INVITE = "invite",
    USER = "user"
}
type BookmarkType = "feed" | "collection" | "invite" | "user";
interface BookMarkModuleType {
    getAll(authToken: string, filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
    getById(authToken: string, id: string, filter?: Record<string, any> | ICollectionBookmarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    create(authToken: string, payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    delete(authToken: string, id: string): Promise<ResponseDto<any>>;
}

declare class BookMarkModule {
    private id;
    private connector;
    constructor(id: string);
    /**
     * findall. This method finds all logged User's Bookmark collections.
     * @param filter filterBookmarkDto
     */
    getAll(authToken: string, filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
    /**
     * findall. This method finds bookmarked collection by id.
     * @param filter Record<string, any> | ICollectionBookmarkDto
     */
    getById(authToken: string, id: string, filter?: Record<string, any> | ICollectionBookmarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    /**
     * create. This method creates a new collection bookmark.
     * @param payload createBookMarkDto
     */
    create(authToken: string, payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
    /**
     * delete. This method deleted a collection bookmark.
     * @param payload is, the bookmark id
     */
    delete(authToken: string, id: string): Promise<ResponseDto<ICollectionBookmarkDto>>;
}

declare class ChatModule implements ChatModuleType {
    private id;
    private connector;
    constructor(id: string);
    getUserMessages(authToken: string): Promise<ResponseDto<IChatConversation[]>>;
}

type IConnectionKeys = "tags" | "tagCount" | "afroScore";
type IConnectionFilterDecider = "greater_than" | "less_than" | "equal_to" | "contains" | "between";
type IConnectionEvents = "CREATE_CONVERSATION";
interface IConnectionFilter {
    _id?: string;
    event: IConnectionEvents;
    key: IConnectionKeys;
    value: string | number | string[];
    decider: IConnectionFilterDecider;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
interface ConnectionFilterModuleType {
    create(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
    getForAUser(authToken: string): Promise<ResponseDto<IConnectionFilter>>;
    update(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
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
            availability: "busy" | "available" | "working";
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
    _id: string;
    owner: NotificationUser;
    title: string;
    description: string;
    read: boolean;
    notifyUser: NotificationUser;
    data: string;
    isAdmin: boolean;
    type: INotificationType;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
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
    getAll(authToken: string, filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>>;
    markOneAsRead(authToken: string, id: string, filter?: filterNotificationDto): Promise<ResponseDto<void>>;
    markAll(authToken: string): Promise<ResponseDto<void>>;
}

declare class NotificationModule implements NotificationModuleType {
    private id;
    private connector;
    constructor(id: string);
    getAll(authToken: string, filter?: filterNotificationDto): Promise<ResponseDto<FindNotificationDto>>;
    markAll(authToken: string): Promise<ResponseDto<void>>;
    markOneAsRead(authToken: string, id: string): Promise<ResponseDto<void>>;
}

type IPaymentCoins = "usdc" | "avax";
declare enum IPaymentStatusEnum {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    WAITING = "waiting",
    CANCELLED = "cancelled",
    DELETED = "deleted"
}
type IPaymentStatusType = "pending" | "ongoing" | "completed" | "waiting" | "cancelled" | "deleted";
interface ICreatePaymentDto {
    coin: IPaymentCoins;
    collection: string;
}
interface IPaymentDataDto {
    coin: string;
    address: string;
    collectionAmount: number;
    collectionAmountCoin: string;
    expectedFee: string;
    amountToPay: string;
    usdFee: string;
    usdAmount: string;
    feePercentage: number;
    rate: number;
    chainId: string;
}
interface IValidatePaymentDto {
    collection: string;
    status?: IPaymentStatusType;
}
interface IReleasePaymentDto {
    collection: string;
    amount: number;
}
interface IBlockchainCoinDto {
    name: string;
    symbol: string;
    icon: string;
    reference: string;
    priceTag: string;
    contractAddress: string;
    decimal: string;
    rpcChainId: string;
    isToken: boolean;
    active: boolean;
}
interface IRPCDto {
    rpcName: string;
    rpcChainId: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    rpcNativeCurrency: {
        name: string;
        symbol: string;
        decimals: string;
    };
    active: boolean;
}
interface PaymentModuleType {
    create(authToken: string, payload: ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>>;
    validate(authToken: string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>>;
    release(authToken: string, payload: IReleasePaymentDto): Promise<ResponseDto<{}>>;
    paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>>;
    activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>>;
}

declare class PaymentModule implements PaymentModuleType {
    private id;
    private connector;
    constructor(id: string);
    create(authToken: string, payload: ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>>;
    validate(authToken: string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>>;
    release(authToken: string, payload: IReleasePaymentDto): Promise<ResponseDto<{}>>;
    paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>>;
    activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>>;
}

type VerificationDocumentTypes = "PASSPORT" | "ID_CARD" | "RESIDENCE_PERMIT" | "DRIVERS_LICENSE" | "VISA" | "OTHER";
interface ICreateSessionPayload {
    firstName: string;
    lastName: string;
    gender: "M" | "F";
    country: expectedISOCountries;
    fullAddress: string;
    documentType: VerificationDocumentTypes;
    documentNumber: string;
    dateOfBirth: string;
}
interface ISendSessionMedia {
    context: "face" | "document-front" | "document-back";
    file: object;
}
interface IVerification {
    _id: string;
    owner: string;
    sessionID?: string;
    sessionToken?: string;
    verificationID?: string;
    providerCreatedTime?: string;
    type?: string;
    status?: IVerificationStatus;
    verificationMetaData?: Record<string, any>;
    country?: string;
    documentType?: string;
    documentValidFrom?: string;
    documentValidUntil?: string;
    providerReason?: string;
    providerReasonCode?: number;
    mediaId?: string;
    mediaMimeType?: string;
    mediaUrl?: string;
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
type IVerificationStatus = "created" | "approved" | "resubmission_requested" | "declined" | "expired" | "abandoned" | "submitted" | "review";
interface CreateSessionResponse {
    status: string;
    verification: {
        id: string;
        url: string;
        vendorData: string;
        host: string;
        status: IVerificationStatus;
        sessionToken: string;
    };
}
interface SendSessionMediaResponse {
    status: IVerificationStatus;
    image: {
        context: "face" | "document-front" | "document-back";
        id: string;
        name: string;
        timestamp: null;
        size: number;
        mimetype: string;
        url: string;
    };
}
interface SessionAttempts {
    status: "success";
    verifications: IVerification[];
}
interface UserVerificationModuleType {
    createSession(authToken: string, payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>>;
    sendSessionMedia(authToken: string, payload: ISendSessionMedia): Promise<ResponseDto<SendSessionMediaResponse>>;
    getSessionAttempts(authToken: string): Promise<ResponseDto<SessionAttempts>>;
    getUserVerifications(authToken: string): Promise<ResponseDto<IVerification[]>>;
}

declare class UserVerificationModule implements UserVerificationModuleType {
    private id;
    private connector;
    constructor(id: string);
    createSession(authToken: string, payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>>;
    sendSessionMedia(authToken: string, payload: ISendSessionMedia): Promise<ResponseDto<SendSessionMediaResponse>>;
    getSessionAttempts(authToken: string): Promise<ResponseDto<SessionAttempts>>;
    getUserVerifications(authToken: string): Promise<ResponseDto<IVerification[]>>;
}

interface CreateWithdrawal {
    coin: string;
    amount: number;
    address: string;
    password: string;
}
interface FilterWithdrawal {
    page?: number;
    limit?: number;
    owner: string;
}
type FindWithdrawalsDto = {
    page: number;
    pages: number;
    total: number;
    data: IWithdrawalDto[];
};
interface ITransactionDto {
    _id: string;
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
    createdAt?: string | Date;
    deletedAt?: string | Date;
    updatedAt?: string | Date;
}
type IWithdrawalStatus = "pending" | "processing" | "completed" | "failed";
interface IWithdrawalDto {
    _id: string;
    owner: string | IUser;
    txId: string | ITransactionDto;
    chainTxId: string;
    coin: string;
    address: string;
    amount: number;
    usdValue: number;
    usdRate: number;
    status: IWithdrawalStatus;
}
interface WithdrawalModuleType {
    createWithdrawal(authToken: string, payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
    fetchWithdrawal(authToken: string, filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>>;
}

declare class ConnectionFilterModule implements ConnectionFilterModuleType {
    private id;
    private connector;
    constructor(id: string);
    create(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
    update(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
    getForAUser(authToken: string): Promise<ResponseDto<IConnectionFilter>>;
}

declare class WithdrawalModule implements WithdrawalModuleType {
    private id;
    private connector;
    constructor(id: string);
    createWithdrawal(authToken: string, payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
    fetchWithdrawal(authToken: string, filter: FilterWithdrawal): Promise<ResponseDto<FindWithdrawalsDto>>;
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
    userVerification: UserVerificationModuleType;
    chat: ChatModuleType;
    connectionFilter: ConnectionFilterModuleType;
    invite: InviteModuleType;
    feed: FeedModuleType;
    payment: PaymentModuleType;
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

export { API_PATHS, AUTH_TOKEN, AccountModule, AccountModuleType, AccountVerifyDto, AddReviewDto, AggTxns, AuthenticationModule, AuthenticationModuleType, BookMarkModule, BookMarkModuleType, BookmarkEnumType, BookmarkType, CHARACTERS, ChangePasswordDto, ChatModule, ChatModuleType, CollectionModule, CollectionModuleType, ConnectionFilterModule, ConnectionFilterModuleType, CreateCollectionDto, CreateFeedDto, CreateFileUpload, CreateManyCollectionDto, CreateSessionResponse, CreateWithdrawal, ErrorUtils, FEED_TYPES, FEED_TYPES_ENUM, FeedModule, FeedModuleType, FilterFeedDto, FilterInviteDto, FilterReviewDto, FilterUploadDto, FilterUserDto, FilterWithdrawal, FindCollectionBookMarkDto, FindCollectionDto, FindCollectionTypeDto, FindFeedDto, FindInvitesDto, FindNotificationDto, FindReviewDto, FindTransactionsDto, FindUploadDto, FindUsers, FindWithdrawalsDto, IBlockchainCoinDto, IChatConversation, IChatMessage, ICollectionBookmarkDto, ICollectionDto, ICollectionStatus, ICollectionTypeDto, IConnectionEvents, IConnectionFilter, IConnectionFilterDecider, IConnectionKeys, ICreatePaymentDto, ICreateSessionPayload, IFeed, IFile, IInviteDto, IInviteStatus, INotificationDto, IPaymentCoins, IPaymentDataDto, IPaymentStatusEnum, IPaymentStatusType, IRPCDto, IReleasePaymentDto, IReviewDto, ISendSessionMedia, ITransactionDto$1 as ITransactionDto, ITransactionStatsDto, ITransactionStatsFormat, ITransactionType, IUploadDto, IUser, IUserTwoFaType, IValidatePaymentDto, IVerification, IVerificationStatus, IWalletDto, IWalletExchangeDto, IWithdrawalDto, IWithdrawalStatus, InviteModule, InviteModuleType, LoginDto, NotificationModule, NotificationModuleType, PAKT_CONFIG, PaktConfig, PaktSDK, PaymentModule, PaymentModuleType, RegisterDto, RegisterPayload, ResendVerifyDto, ResetDto, ResponseDto, ReviewModule, ReviewModuleType, SendInviteDto, SendSessionMediaResponse, SessionAttempts, Status, TEMP_TOKEN, TwoFATypeDto, TwoFAresponse, UpdateCollectionDto, UpdateManyCollectionsDto, UploadModule, UploadModuleType, UserVerificationModule, UserVerificationModuleType, ValidatePasswordToken, ValidateReferralDto, VerificationDocumentTypes, WalletModule, WalletModuleType, WithdrawalModule, WithdrawalModuleType, assignCollectionDto, cancelCollectionDto, createBookMarkDto, expectedISOCountries, fetchAccountDto, filterBookmarkDto, filterCollectionDto, filterNotificationDto, isEmpty, parseUrlWithQuery, updateUserDto };
