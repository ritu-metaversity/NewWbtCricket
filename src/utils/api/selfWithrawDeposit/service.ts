import {
  apiHandler,
  ApiServiceInterface,
  apiWithSnackbar,
} from "../apiService";
import { selfResources } from "./resource";

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

export const selfServices = {
  selfWithdraw: async (data: SelfWithdrawPayload) => {
    const params = {
      resource: selfResources.SELF_WITHDRAW,
      data,
    };
    return await apiWithSnackbar(params);
  },
  selfDeposit: async (data: FormData) => {
    const params: ApiServiceInterface = {
      resource: selfResources.SELF_DEPOSIT,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await apiWithSnackbar(params);
  },
  getPaymentDetail: async () => {
    const params = {
      resource: selfResources.PAYMENT_DETAILS,
    };
    return await apiHandler(params);
  },
  getWithdrawList: async () => {
    const params = {
      resource: selfResources.WITHDRAW_LIST,
    };
    return await apiHandler(params);
  },
  getDepositList: async () => {
    const params = {
      resource: selfResources.DEPOSIT_LIST,
    };
    return await apiHandler(params);
  },
  isSelfAllowed: async (data: SelfAllowedPayload) => {
    const params = { resource: selfResources.IS_SELF, data };
    return await apiHandler(params);
  },
};
