import { ApiResource } from "../apiService";

export const selfResources: {
  [x: string]: ApiResource;
} = {
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
