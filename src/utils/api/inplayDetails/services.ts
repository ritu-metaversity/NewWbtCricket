import {
  apiHandler,
  ApiServiceInterface,
  apiWithErrorSnackbar,
  apiWithSnackbar,
} from "../apiService";
import { inPlayDetailResources } from "./resources";

export const inPlayDetailServices = {
  betListByMatchId: (matchId: number) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.GET_BETLIST_BY_MATCHID,
      data: { matchId },
    };
    return apiHandler(params);
  },
  betListHistory: (data: any) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.Bet_List_History,
      data
    };
    return apiHandler(params);
  },
  CompletedBetsonBetpage: (data: any) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.fetch_client_completed_fancy,
      data
    };
    return apiHandler(params);
  },
  updateBetPlace: (data: any) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.PLACE_BET,
      data,
    };
    return apiHandler(params);
  },

  getuserOddsPnl: (matchId: any) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.USER_ODDS_PNL,
      data: { matchId },
    };
    return apiHandler(params);
  },

  getuserFancyPnl: (matchId: any) => {
    const params: ApiServiceInterface = {
      resource: inPlayDetailResources.USER_FANCY_PNL,
      data: { matchId },
    };
    return apiHandler(params);
  },
  newFancy: async (id: string) => {
    const params: ApiServiceInterface = {
      resource: {
        // URL: "http://89.39.105.69:9001/fancy/:id",
        URL: "fancy/:id",
        METHOD: "GET",
      },
      betfair: true,
      noAuth: true,
      pathVars: { id: id },
    };
    return await apiHandler(params);
  },
  newFancySlower: async (id: string) => {
    const params: ApiServiceInterface = {
      resource: {
        URL: "/fancy/:id",
        METHOD: "GET",
      },
      betfair: true,
      pathVars: { id: id },
    };
    return await apiHandler(params);
  },
  fancyPnlBook: async (data: any) => {
    const params = {
      resource: inPlayDetailResources.PNL_BOOK,
      data,
    };
    return await apiHandler(params);
  },
};
