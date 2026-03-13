// Please note that some of these endpoints can be enabled or disabled according to policy settings on your Chainsite dashboard. Ensure the endpoint you want to utilize has its policy settings enabled.

export const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const API_PATHS = {
  API_VERSION: "/v1",
  v1: {
    // Authentication endpoints
    LOGIN: "/v1/auth/login",
    LOGIN_TWO_FA: "/v1/auth/login/2fa",
    REGISTER: "/v1/auth/create-account",
    ACCOUNT_VERIFY: "/v1/auth/account/verify",
    RESEND_VERIFY_LINK: "/v1/auth/verify/resend",
    VALIDATE_PASSWORD_TOKEN: "/v1/auth/validate/password",
    RESET_PASSWORD: "/v1/auth/password/reset",
    RESEND_RESET_PASSWORD: "/v1/auth/password/reset/resend",
    CHANGE_PASSWORD: "/v1/auth/password/change",
    VALIDATE_REFERRAL: "/v1/auth/referral/validate/",
    RESEND_TWO_FA_EMAIL_CODE: "/v1/auth/2fa/email/code",
    GOOGLE_OAUTH_GENERATE_STATE: "/v1/auth/google/oauth/generate-state",
    GOOGLE_OAUTH_VALIDATE_STATE: "/v1/auth/google/oauth/validate-state",
    WEB3_AUTH_REQUEST: "/v1/auth/web3/request",
    WEB3_AUTH_VALIDATE: "/v1/auth/web3/validate",
    WEB3_AUTH_ONBOARD: "/v1/auth/web3/onboard",

    // Collection endpoints
    COLLECTION: "/v1/collection",
    COLLECTION_TYPE: "/v1/collection-type",
    COLLECTION_MANY: "/v1/collection/many",
    COLLECTION_UPDATE: "/v1/collection",

    // Bookmark endpoints
    BOOKMARK: "/v1/bookmark",

    // Notifications
    NOTIFICATION_FETCH: "/v1/notifications/",
    NOTIFICATION_MARK_ALL: "/v1/notifications/mark/all",
    NOTIFICATION_MARK_ONE: "/v1/notifications/mark",

    // Manage Account and settings
    ACCOUNT: "/v1/account",
    ACCOUNT_ONBOARD: "/v1/account/onboard",
    ACCOUNT_UPDATE: "/v1/account/update",
    ACCOUNT_PASSWORD: "/v1/account/password/change",
    ACCOUNT_TWO_INIT: "/v1/account/initiate/2fa",
    ACCOUNT_TWO_ACTIVATE: "/v1/account/activate/2fa",
    ACCOUNT_TWO_DEACTIVATE: "/v1/account/deactivate/2fa",
    ACCOUNT_FETCH_ALL: "/v1/account/user",
    ACCOUNT_FETCH_SINGLE: "/v1/account/user/",
    ACCOUNT_LOGOUT: "/v1/account/logout",
    ACCOUNT_SEND_EMAIL_TWO_FA: "/v1/account/2fa/email",

    //transaction endpoi  nts
    TRANSACTIONS: "/v1/transaction/",
    A_TRANSACTION: "/v1/transaction",
    TRANSACTION_STATS: "/v1/transaction/stats",
    TRANSACTION_AGGREGATE_STATS: "/v1/transaction/aggregate/stats",
    TRANSACTION_EXCHANGE: "/v1/transaction/exchange",

    // Wallet Endpoints
    WALLETS: "/v1/wallet/",
    SINGLE_WALLET_BY_ID: "/v1/wallet/",
    SINGLE_WALLET_BY_COIN: "/v1/wallet/coin",

    // File Upload
    FILE_UPLOAD: "/v1/upload/",

    // Review
    ADD_REVIEW: "/v1/reviews/",
    GET_REVIEW: "/v1/reviews/",

    //Withdrawal
    CREATE_WITHDRAWAL: "/v1/withdrawals/",
    FETCH_WITHDRAWALS: "/v1/withdrawals/",

    //User Verification
    CREATE_SESSION: "/v1/user-verification/veriff/session/new",
    SEND_SESSION_MEDIA: "/v1/user-verification/veriff/session/media",
    SESSION_ATTEMPTS: "/v1/user-verification/veriff/session/attempts",
    USER_VERIFICATION: "/v1/user-verification/user",
    DELETE_SESSION: "/v1/user-verification/veriff/session/delete",

    //Chat
    GET_USER_MESSAGES: "/v1/chat/",

    //Connection Filter
    CREATE_CONNECTION_FILTER: "/v1/conn-filter/",
    GET_CONNECTION_FILTER: "/v1/conn-filter/user",
    UPDATE_CONNECTION_FILTER: "/v1/conn-filter/",

    //Invite
    SEND_INVITE: "/v1/invite/",
    ACCEPT_INVITE: "/v1/invite",
    DECLINE_INVITE: "/v1/invite",
    VIEW_ALL_INVITE: "/v1/invite/",
    VIEW_A_INVITE: "/v1/invite/",
    CANCEL_AN_INVITE: "/v1/invite/",

    //Feeds
    FEEDS: "/v1/feeds",
    FEEDS_DISMISS_ONE: "/v1/feeds/dismiss",
    FEEDS_DISMISS_ALL: "/v1/feeds/dismiss/all",

    //Payment
    CREATE_ORDER: "/v1/payment/",
    VALIDATE_ORDER: "/v1/payment/validate",
    RELEASE_ORDER: "/v1/payment/release",
    PAYMENT_METHODS: "/v1/payment/coins",
    RPC: "/v1/payment/rpc",

    //Referrals endpoint
    FETCH_USER_REFERRALS: "/v1/referrals/",
    FETCH_USER_REFERRAL_STATS: "/v1/referrals/stats",
    SEND_REFERRALS_INVITE: "/v1/referrals/invite",

    //Tags-category endpoint
    FETCH_CATEGORIES: "/v1/tag-category/",
    FETCH_CATEGORIES_BY_ID: "/v1/tag-category",

    //Direct Deposit endpoints
    CREATE_DIRECT_DEPOSIT: "/v1/payment-public/direct-deposit",
    VALIDATE_DIRECT_DEPOSIT: "/v1/payment-public/validate",
    FETCH_PAYMENT_METHODS: "/v1/payment-public/coins",
    FETCH_ACTIVE_RPC: "/v1/payment-public/rpc",
  },
  v2: {
    COLLECTION_SCHEMA: {
      FETCH_ONE: "/v2/collection-schema/",
      FETCH_MANY: "/v2/collection-schema/",
    },
    COLLECTION_STORE: "/v2/collection-store",
  },
  SYSTEM_V2: {
    COLLECTION_SCHEMA: {
      CREATE: "/system-v2/collection-schema",
      UPDATE: "/system-v2/collection-schema",
      DELETE: "/system-v2/collection-schema",
    },
  },
};
export interface IModel {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export type expectedISOCountries =
  | "AW"
  | "AF"
  | "AO"
  | "AI"
  | "AX"
  | "AL"
  | "AD"
  | "AE"
  | "AR"
  | "AM"
  | "AS"
  | "AG"
  | "AU"
  | "AT"
  | "AZ"
  | "BI"
  | "BE"
  | "BJ"
  | "BF"
  | "BD"
  | "BG"
  | "BH"
  | "BS"
  | "BA"
  | "BL"
  | "BY"
  | "BZ"
  | "BM"
  | "BO"
  | "BR"
  | "BB"
  | "BN"
  | "BT"
  | "BW"
  | "CF"
  | "CA"
  | "CC"
  | "CH"
  | "CL"
  | "CN"
  | "CI"
  | "CM"
  | "CD"
  | "CD"
  | "CG"
  | "CK"
  | "CO"
  | "KM"
  | "CI"
  | "CV"
  | "CR"
  | "CU"
  | "CW"
  | "CX"
  | "KY"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DM"
  | "DK"
  | "DO"
  | "DO"
  | "DO"
  | "DZ"
  | "EC"
  | "EG"
  | "ER"
  | "EH"
  | "ES"
  | "EE"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FR"
  | "FO"
  | "FM"
  | "GA"
  | "GB"
  | "GE"
  | "GG"
  | "GH"
  | "GI"
  | "GN"
  | "GP"
  | "GM"
  | "GW"
  | "GQ"
  | "GR"
  | "GD"
  | "GL"
  | "GT"
  | "GF"
  | "GU"
  | "GY"
  | "HK"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IM"
  | "IN"
  | "IO"
  | "IE"
  | "IR"
  | "IQ"
  | "IS"
  | "IL"
  | "IT"
  | "JM"
  | "JE"
  | "JO"
  | "JP"
  | "KZ"
  | "KZ"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KN"
  | "KR"
  | "XK"
  | "KW"
  | "LA"
  | "LB"
  | "LR"
  | "LY"
  | "LC"
  | "LI"
  | "LK"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "MO"
  | "MF"
  | "MA"
  | "MC"
  | "MD"
  | "MG"
  | "MV"
  | "MX"
  | "MH"
  | "MK"
  | "ML"
  | "MT"
  | "MM"
  | "ME"
  | "MN"
  | "MP"
  | "MZ"
  | "MR"
  | "MS"
  | "MQ"
  | "MU"
  | "MW"
  | "MY"
  | "YT"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NU"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NZ"
  | "OM"
  | "PK"
  | "PA"
  | "PN"
  | "PE"
  | "PH"
  | "PW"
  | "PG"
  | "PL"
  | "PR"
  | "PR"
  | "KP"
  | "PT"
  | "PY"
  | "PS"
  | "PF"
  | "QA"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "SA"
  | "SD"
  | "SN"
  | "SG"
  | "GS"
  | "SJ"
  | "SB"
  | "SL"
  | "SV"
  | "SM"
  | "SO"
  | "PM"
  | "RS"
  | "SS"
  | "ST"
  | "SR"
  | "SK"
  | "SI"
  | "SE"
  | "SZ"
  | "SX"
  | "SC"
  | "SY"
  | "TC"
  | "TD"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TM"
  | "TL"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TV"
  | "TW"
  | "TZ"
  | "UG"
  | "UA"
  | "UY"
  | "US"
  | "UZ"
  | "VA"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "ZA"
  | "ZM"
  | "ZW";
