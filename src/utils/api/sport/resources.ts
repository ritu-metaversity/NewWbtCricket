import { ApiResource } from "../apiService";

export const sportsResourses: { [x: string]: ApiResource } = {
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: "http://43.205.50.127:9000/betfair_api/active_match/:sportId",
    METHOD: "GET",
  },
  GET_IN_PLAY: {
    URL: "http://43.205.50.127:9000/betfair_api/active_match/",
    METHOD: "GET",
  },
};
