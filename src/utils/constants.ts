export const API_PATHS = {
  API_VERSION: "/v1",
  // auth endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/create-account",
  ACCOUNT_VERIFY: "/auth/account/verify",
  RESEND_VERIFY_LINK: "/auth/account/verify",
  VALIDATE_PASSWORD_TOKEN: "/auth/validate/password",
  RESET_PASSWORD: "/auth/password/reset",
  CHANGE_PASSWORD: "/auth/password/change",
  // collection endpoints
  COLLECTION: "/collection",
  COLLECTION_TYPE: "/collection-type",
  COLLECTION_MANY: "/collection/many",
  // bookmark endpoints
  BOOKMARK: "/bookmark",
  // notifications
  NOTIFICATION_FETCH: "/notifications/",
  NOTIFICATION_MARK_ALL: "/notifications/mark/all",
  NOTIFICATION_MARK_ONE: "/notifications/mark",
  ACCOUNT: "/account",
  ACCOUNT_ONBOARD: "/account/onboard",
  ACCOUNT_PASSWORD: "/account/password/change",
  ACCOUNT_TWO_INIT: "/account/initiate/2fa",
  ACCOUNT_TWO_ACTIVATE: "/account/activate/2fa",
  ACCOUNT_TWO_DEACTIVATE: "/account/deactivate/2fa",
  ACCOUNT_LOGOUT: "/account/logout",
  WALLET_TRANSACTIONS: "/wallet/transactions",
  A_WALLET_TRANSACTION: "/wallet/transaction",
  WALLET_EXCHANGE: "/wallet/exchange",
  WALLET_DATA: "/wallet/data",
  WALLET_STATS: "/wallet/stats",
  WALLET_AGGREGATE_STATS: "/wallet/aggregate/stats",
  WALLETS: "/wallet",
  SINGLE_WALLET: "/wallet/coin",
  FILE_UPLOAD: "/upload/",
  ADD_REVIEW: "/job/review",
};
