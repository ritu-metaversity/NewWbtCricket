import { ApiResource } from "../apiService";

export const userResources: {
  [x: string]: ApiResource;
} = {
  GET_IP_ADDRESS: {
    URL: "https://api.ipify.org/?format=json",
    METHOD: "GET",
  },
  GET_WALLET: {
    URL: "enduser/get-user-balance",
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
    URL: "user/first-login-cp",
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
  PROFIT_LOSS: {
    URL: "report/profit-loss-match-wise",
    METHOD: "POST",
  },
};
