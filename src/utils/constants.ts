// Please note that some of these endpoints can be enabled or disabled according to policy settings on your Chainsite dashboard. Ensure the endpoint you want to utilize has its policy settings enabled.

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

  // Bookmark endpoints
  BOOKMARK: "/bookmark",

  // Notifications
  NOTIFICATION_FETCH: "/notifications/",
  NOTIFICATION_MARK_ALL: "/notifications/mark/all",
  NOTIFICATION_MARK_ONE: "/notifications/mark",

  // Manage Account and settings
  ACCOUNT: "/account",
  ACCOUNT_ONBOARD: "/account/onboard",
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
};
