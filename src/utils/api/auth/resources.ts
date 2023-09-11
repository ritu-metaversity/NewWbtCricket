import { ApiResource } from "../apiService";
export const authResourcs: {
  [x: string]: ApiResource;
} = {
  LOGIN: {
    URL: "login/client-login",
    METHOD: "POST",
  },
  LOGOUT: {
    URL: "login/logout",
    METHOD: "POST",
  },
  SELF_REGISTER: {
    URL: "/user/self-register",
    METHOD: "POST",
  },
  VALIDATE_JWT: {
    URL: "util/validate-jwt-token",
    METHOD: "POST",
  },
  SEARCH_BET_MARKET: {
    URL: "bets/search-bet-market-and-user",
    METHOD: "POST",
  },
  HOME_PAGE_BANNER_LIST: {
    URL: "enduser/user-banner-list",
    METHOD: "POST",
  },
};
