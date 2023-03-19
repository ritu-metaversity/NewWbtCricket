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
};
