import { ApiResource } from "../apiService";
type resourceKeys =  'LOGIN' | 'SIGN_UP';
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
  SIGN_UP: {
    URL: "auth/signup",
    METHOD: "POST",
  },
  VERIFY_OTP: {
    URL: "auth/verify-otp",
    METHOD: "POST",
  },
  RESEND_OTP: {
    URL: "auth/send-otp",
    METHOD: "POST",
  },
  GOOGLE_LOGIN: {
    URL: "auth/google-login",
    METHOD: "GET",
  },
  CHANGE_PASSWORD: {
    URL: "enduser/change-password",
    METHOD: "POST",
  },
  RESET_PASSWORD: {
    URL: "auth/reset-password",
    METHOD: "POST",
  },
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: "http://43.205.50.127:9000/active_match/:sportId",
    METHOD: "GET",
  },
  SELF_REGISTER: {
    URL: "/user/self-register",
    METHOD: "POST",
  },
};