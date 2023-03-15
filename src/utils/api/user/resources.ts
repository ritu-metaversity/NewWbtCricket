import { ApiResource } from "../apiService";
type resourceKeys = "LOGIN" | "SIGN_UP";
export const userResources: {
  [x: string]: ApiResource;
} = {
  GET_IP_ADDRESS: {
    URL: "https://api.ipify.org/?format=json",
    METHOD: "GET",
  },
  USER_INFO: {
    URL: "user/full-user",
    METHOD: "GET",
  },
  USER: {
    URL: "user/:id",
    METHOD: "GET",
  },
  USER_UPDATE: {
    URL: "user",
    METHOD: "PUT",
  },
  GET_WALLET: {
    URL: "enduser/get-user-balance",
    METHOD: "POST",
  },
  MAKE_TRANSACTION: {
    URL: "transaction",
    METHOD: "POST",
  },
  UPDATE_BUTTON_VALUE: {
    URL: "/enduser/set-stake-button",
    METHOD: "POST",
  },
  GET_BUTTON_VALUE: {
    URL: "/enduser/get-stake-button",
    METHOD: "POST",
  },
  CHANGE_PASSWORD: {
    URL: "enduser/change-password",
    METHOD: "POST",
  },
  OLD_CHANGE_PASSWORD: {
    URL: "enduser/first-login-cp",
    METHOD: "POST",
  },
  LOGIN_HISTORY_VALUES: {
    URL: "/util/login-history-report",
    METHOD: "POST",
  },
  CHANGE_PASSWORD_HISTORY: {
    URL: "/util/password-change-history-report",
    METHOD: "POST",
  },
  USER_PROFILE: {
    URL: "/enduser/profile",
    METHOD: "POST",
  },

  USER_STATEMENT: {
    URL: "/enduser/account-statement",
    METHOD: "POST",
  },
  CURRENT_BET: {
    URL: "/enduser/unsettled-bet",
    METHOD: "POST",
  },
  BET_HISTORY: {
    URL: "/enduser/settled-bet",
    METHOD: "POST",
  },
  BET_SPORTS_FOR_LIST: {
    URL: "/sport/active-sport-list",
    METHOD: "POST",
  },
  BET_MATCH_FOR_LIST: {
    URL: "/sport/event-detail-sport-wise",
    METHOD: "POST",
  },
  TEST_API: {
    URL: "http://89.39.105.69:9001/betfairodds/1.207796438",
    METHOD: "GET",
  },
  SELF_WITHDRAW: {
    URL: "enduser/self-withdraw-app",
    METHOD: "POST",
  },
  SELF_DEPOSIT: {
    URL: "enduser/self-deposit-app",
    METHOD: "POST",
  },
  PAYMENT_DETAILS: {
    URL: "enduser/get-paymnet-detail-app-id-wise",
    METHOD: "POST",
  },
  WITHDRAW_LIST: {
    URL: "enduser/withdraw-request-client",
    METHOD: "POST",
  },
  DEPOSIT_LIST: {
    URL: "enduser/depsosit-request-client",
    METHOD: "POST",
  },
  IS_SELF: {
    URL: "login/is-self-by-app-url",
    METHOD: "POST",
  },
};
