import {
  apiHandler,
  apiWithErrorSnackbar,
  apiWithSnackbar,
} from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
  currentPassword: string;
}

export interface ProfitLossPayload {
  sportId: string;
  matchId: string;
  fromDate: string;
  toDate: string;
  userId: "";
  index: number;
  noOfRecords: number;
  totalPages: number;
  tabId:0|1
}

interface OldChangePasswordPayload {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
  oldPassword: string;
  userid: string;
  token: string;
}

export const userServices = {
  getIpfy: async () => {
    const params = {
      resource: userResources.GET_IP_ADDRESS,
      noAuth: true,
    };
    return await apiHandler(params);
  },
  wallet: async () => {
    const params = {
      resource: userResources.GET_WALLET,
    };
    return await apiWithSnackbar(params);
  },

  profile: async () => {
    const params = {
      resource: userResources.USER_PROFILE,
    };
    return await apiWithSnackbar(params);
  },

  changePassword: async (data: ChangePasswordPayload) => {
    const params = { resource: userResources.CHANGE_PASSWORD, data };
    return await apiWithSnackbar(params);
  },
  oldChangePassword: async (data: OldChangePasswordPayload) => {
    const params = { resource: userResources.OLD_CHANGE_PASSWORD, data };
    return await apiWithSnackbar(params);
  },
  updateButtonValue: async (data: any) => {
    const params = {
      resource: userResources.UPDATE_BUTTON_VALUE,
      data,
    };
    return await apiWithSnackbar(params);
  },
  getButtonValue: async () => {
    const params = {
      resource: userResources.GET_BUTTON_VALUE,
    };
    return await apiWithSnackbar(params);
  },

  getLoginHistory: async (data: any) => {
    const params = {
      resource: userResources.LOGIN_HISTORY_VALUES,
      data: data,
    };
    return await apiWithSnackbar(params);
  },

  getChangePasswordHistory: async (data: any) => {
    const params = {
      resource: userResources.CHANGE_PASSWORD_HISTORY,
      data: data,
    };
    return await apiWithSnackbar(params);
  },

  getAccountStatement: async (data: any) => {
    const params = {
      resource: userResources.USER_STATEMENT,
      data,
    };
    return await apiWithSnackbar(params);
  },

  getCurrentBets: async (data: any) => {
    const params = {
      resource: userResources.CURRENT_BET,
      data,
    };
    return await apiWithSnackbar(params);
  },

  getBetHistory: async (data: any) => {
    const params = {
      resource: userResources.BET_HISTORY,
      data,
    };
    return await apiWithSnackbar(params);
  },

  profitLoss: async (data: ProfitLossPayload) => {
    const params = {
      resource: userResources.PROFIT_LOSS,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
};
