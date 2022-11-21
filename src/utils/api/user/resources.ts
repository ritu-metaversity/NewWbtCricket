import { ApiResource } from "../apiService";
type resourceKeys =  'LOGIN' | 'SIGN_UP';
export const userResources: {
  [x: string]: ApiResource;
} = {
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
    URL: "user/get-balance",
    METHOD: "GET",
  },
  MAKE_TRANSACTION: {
    URL: "transaction",
    METHOD: "POST",
  },
  UPDATE_BUTTON_VALUE: {
    URL: "/user/update-stack",
    METHOD: "PATCH",
  },
  GET_BUTTON_VALUE: {
    URL: "/user/get-user-stacks",
    METHOD: "GET",
  },
  CHANGE_PASSWORD: {
    URL: "user/change-password",
    METHOD: "PATCH",
  },
};