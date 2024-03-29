import {
  apiHandler,
  ApiServiceInterface,
  apiWithSnackbar,
} from "../apiService";
import { authResourcs as authResources } from "./resources";

interface LoginPayload {
  userId: string;
  password: string;
}

export const authServices = {
  login: async (data: LoginPayload) => {
    const params = {
      resource: authResources.LOGIN,
      data,
    };
    return await apiWithSnackbar(params);
  },
  
  registeration: (data: any) => {
    const params: ApiServiceInterface = {
      resource: authResources.SELF_REGISTER,
      data,
    };
    return apiWithSnackbar(params);
  },

  logout: () => {
    const params: ApiServiceInterface = {
      resource: authResources.LOGOUT,
    };
    return apiHandler(params);
  },
  validateToken: async () => {
    const params = {
      resource: authResources.VALIDATE_JWT,
    };
    return await apiHandler(params);
  },
  searchBetMarketAS: async (data:any) => {
    const params = {
      resource: authResources.SEARCH_BET_MARKET,data
    };
    return await apiHandler(params);
  },
  HOMEPAGEBANNERLISTDATA: async (data:any) => {
    const params = {
      resource: authResources.HOME_PAGE_BANNER_LIST,data
    };
    return await apiHandler(params);
  },
};
