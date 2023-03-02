import { sportsResourses } from "./resources";
import {
  apiHandler,
  ApiServiceInterface,
  apiWithSnackbar,
} from "../apiService";

interface GetSportsDataPayload {
  sportId: number;
}

export const sportServices = {
  activeSportList: () => {
    const params = {
      resource: sportsResourses.GET_ACTIVE_SPORTS_LIST,
    };
    return apiHandler(params);
  },
  activeEventFromSport: (sportId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_FROM_SPORTS,
      data: { sportId },
    };
    return apiHandler(params);
  },
  matchOdds: (eventIds: number[]) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_MARKET,
      params: { eventIds },
    };
    return apiHandler(params);
  },
  eventOdds: (eventId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_ODDS,
      pathVars: { eventId },
    };
    return apiHandler(params);
  },

  betListByMatchId: (matchId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_BETLIST_BY_MATCHID,
      data: { matchId },
    };
    return apiHandler(params);
  },

  getActiveFancy: (matchId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_ACTIVE_FANCY,
      data: { matchId },
    };
    return apiHandler(params);
  },

  getMatchOdds: (marketIds: any) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_MATCH_ODDS,
      data: { marketIds },
    };
    return apiHandler(params);
  },

  getActiveFancyOdds: (eventId: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_ACTIVE_FANCY_ODDS,
      data: { eventId },
    };
    return apiHandler(params);
  },

  updateBetPlace: (data: any) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.PLACE_BET,
      data,
    };
    return apiWithSnackbar(params);
  },

  getuserOddsPnl: (matchId: any) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.USER_ODDS_PNL,
      data: { matchId },
    };
    return apiHandler(params);
  },

  getuserFancyPnl: (matchId: any) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.USER_FANCY_PNL,
      data: { matchId },
    };
    return apiHandler(params);
  },
};
