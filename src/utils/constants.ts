// Please note that some of these endpoints can be enabled or disabled according to policy settings on your Chainsite dashboard. Ensure the endpoint you want to utilize has its policy settings enabled.

export const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const API_PATHS = {
  API_VERSION: "/v1",
  // Authentication endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/create-account",
  ACCOUNT_VERIFY: "/auth/account/verify",
  RESEND_VERIFY_LINK: "/auth/account/verify",
  VALIDATE_PASSWORD_TOKEN: "/auth/validate/password",
  RESET_PASSWORD: "/auth/password/reset",
  CHANGE_PASSWORD: "/auth/password/change",

  // Collection endpoints
  COLLECTION: "/collection",
  COLLECTION_TYPE: "/collection-type",
  COLLECTION_MANY: "/collection/many",
  COLLECTION_UPDATE: "/collection/update",

  // Bookmark endpoints
  BOOKMARK: "/bookmark",

  // Notifications
  NOTIFICATION_FETCH: "/notifications/",
  NOTIFICATION_MARK_ALL: "/notifications/mark/all",
  NOTIFICATION_MARK_ONE: "/notifications/mark",

  // Manage Account and settings
  ACCOUNT: "/account",
  ACCOUNT_ONBOARD: "/account/onboard",
  ACCOUNT_UPDATE: "/account/update",
  ACCOUNT_PASSWORD: "/account/password/change",
  ACCOUNT_TWO_INIT: "/account/initiate/2fa",
  ACCOUNT_TWO_ACTIVATE: "/account/activate/2fa",
  ACCOUNT_TWO_DEACTIVATE: "/account/deactivate/2fa",
  ACCOUNT_LOGOUT: "/account/logout",

  // Wallet Endpoints
  WALLET_TRANSACTIONS: "/wallet/transactions",
  A_WALLET_TRANSACTION: "/wallet/transaction",
  WALLET_EXCHANGE: "/wallet/exchange",
  WALLET_DATA: "/wallet/data",
  WALLET_STATS: "/wallet/stats",
  WALLET_AGGREGATE_STATS: "/wallet/aggregate/stats",
  WALLETS: "/wallet",
  SINGLE_WALLET: "/wallet/coin",

  // File Upload
  FILE_UPLOAD: "/upload/",

  // Review
  ADD_REVIEW: "/reviews/",

  //Withdrawal
  CREATE_WITHDRAWAL: "/withdrawals/",
  FETCH_WITHDRAWALS: "/withdrawals/",

  //User Verification
  CREATE_SESSION: "/user-verification/veriff/session/new",
  SEND_SESSION_MEDIA: "/user-verification/veriff/session/media",
  SESSION_ATTEMPTS: "/user-verification/veriff/session/attempts",
  USER_VERIFICATION: "/user-verification/user",
  DELETE_SESSION: "/user-verification/veriff/session/delete",

  //Chat
  GET_USER_MESSAGES: "/chat/",

  //Connection Filter
  CREATE_CONNECTION_FILTER: "/conn-filter/",
  GET_CONNECTION_FILTER: "/conn-filter/user",
  UPDATE_CONNECTION_FILTER: "/conn-filter/",

  //Invite
  SEND_INVITE: "/invite/",
  ACCEPT_INVITE: "/invite",
  DECLINE_INVITE: "/invite",
  VIEW_ALL_INVITE: "/invite/",
  VIEW_A_INVITE: "/invite/:id",
};

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
