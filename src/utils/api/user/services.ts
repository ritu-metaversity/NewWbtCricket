import { apiWithSnackbar } from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
}

export const userServices = {
  user: async (id: number) => {
    const params = {
      resource: userResources.USER,
      pathVars: { id },
    };
    return await apiWithSnackbar(params);
  },
  fullUser: async () => {
    const params = { resource: userResources.USER_INFO };
    return await apiWithSnackbar(params);
  },
  update: async (data: any) => {
    const params = {
      resource: userResources.USER_UPDATE,
      data,
    };
    return await apiWithSnackbar(params);
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
  addMoney: async (data: any) => {
    const params = {
      resource: userResources.MAKE_TRANSACTION,
      data,
    };
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

  getLoginHistory:async () => {
    const params ={
    resource:userResources.LOGIN_HISTORY_VALUES,
    data:{userId:""}
    };
    return await apiWithSnackbar(params);
  },

  getChangePasswordHistory:async () => {
    const params ={
    resource:userResources.CHANGE_PASSWORD_HISTORY,
    data:{userId:""}
    };
    return await apiWithSnackbar(params);
  },

  getAccountStatement:async (data:any) =>{
    const params ={
      resource:userResources.USER_STATEMENT,
      data
    };
    return await apiWithSnackbar(params);
  },

  getCurrentBets:async (data:any) => {
    const params ={
      resource:userResources.CURRENT_BET,
      data
    };
    return await apiWithSnackbar(params);
  },

  getBetHistory:async (data:any) => {
    const params ={
      resource:userResources.BET_HISTORY,
      data
    };
    return await apiWithSnackbar(params);
  },

  getTestApi:async () => {
    const params={
      resource:userResources.TEST_API
    }
    return await apiWithSnackbar(params);
  }
 
};
