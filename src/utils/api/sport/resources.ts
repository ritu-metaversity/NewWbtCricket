import { ApiResource } from "../apiService";

export const sportsResourses: { [x: string]: ApiResource } = {
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: `/active_match/:sportId`,
    METHOD: "GET",
  },
  GET_IN_PLAY: {
    URL: `/active_match/`,
    METHOD: "GET",
  },
};
