import {
  apiHandler,
  ApiServiceInterface,
  apiWithErrorSnackbar,
  apiWithSnackbar,
} from "../apiService";
import { userResources } from "./resources";

interface ChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
}

export interface ProfitLossPayload {
  sportId: string | number;
  matchId: string | number;
  fromDate: string;
  toDate: string;
  userId: "";
  index: number;
  noOfRecords: number;
  totalPages: number;
}

interface SelfAllowedPayload {
  appUrl: string;
}

interface SelfWithdrawPayload {
  accountHolderName: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  ifsc: string;
  amount: number;
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
  oldChangePassword: async (data: OldChangePasswordPayload) => {
    const params = { resource: userResources.OLD_CHANGE_PASSWORD, data };
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

  getSportsForList: async () => {
    const params = {
      resource: userResources.BET_SPORTS_FOR_LIST,
    };
    return await apiWithSnackbar(params);
  },

  getMatchForList: async (sportId: number) => {
    const params = {
      resource: userResources.BET_MATCH_FOR_LIST,
      data: { sportId },
    };
    return await apiWithSnackbar(params);
  },

  getTestApi: async () => {
    const params = {
      resource: userResources.TEST_API,
    };
    return await apiWithSnackbar(params);
  },
  selfWithdraw: async (data: SelfWithdrawPayload) => {
    const params = {
      resource: userResources.SELF_WITHDRAW,
      data,
    };
    return await apiWithSnackbar(params);
  },
  selfDeposit: async (data: FormData) => {
    const params: ApiServiceInterface = {
      resource: userResources.SELF_DEPOSIT,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await apiWithSnackbar(params);
  },
  getPaymentDetail: async () => {
    const params = {
      resource: userResources.PAYMENT_DETAILS,
    };
    return await apiHandler(params);
  },
  getWithdrawList: async () => {
    const params = {
      resource: userResources.WITHDRAW_LIST,
    };
    return await apiHandler(params);
  },
  getDepositList: async () => {
    const params = {
      resource: userResources.DEPOSIT_LIST,
    };
    return await apiHandler(params);
  },
  isSelfAllowed: async (data: SelfAllowedPayload) => {
    const params = { resource: userResources.IS_SELF, data };
    return await apiHandler(params);
  },
  profitLoss: async (data: ProfitLossPayload) => {
    const params = {
      resource: userResources.PROFIT_LOSS,
      data,
    };
    return await apiWithErrorSnackbar(params);
  },
  fancyPnlBook: async (data: any) => {
    const params = {
      resource: userResources.PNL_BOOK,
      data,
    };
    return await apiHandler(params);
  },
};
