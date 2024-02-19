import { sportsResourses } from "./resources";
import { apiHandler, ApiServiceInterface } from "../apiService";

export const sportServices = {
  activeSportList: () => {
    const params = {
      resource: sportsResourses.GET_ACTIVE_SPORTS_LIST,
    };
    return apiHandler(params);
  },
  activeEventFromSport: (gameIdForItemPage: number) => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_EVENT_FROM_SPORTS,
      pathVars: { sportId: gameIdForItemPage },
      betfair: true,
    };
    return apiHandler(params);
  },
  inplay: () => {
    const params: ApiServiceInterface = {
      resource: sportsResourses.GET_IN_PLAY,
      betfair: true,
    };
    return apiHandler(params);
  },
};
