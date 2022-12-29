import { ApiResource } from "../apiService";

export const sportsResourses: { [x: string]: ApiResource } = {
  GET_ACTIVE_SPORTS_LIST: {
    URL: "/enduser/active-sport-list",
    METHOD: "POST",
  },
  GET_EVENT_FROM_SPORTS: {
    URL: "/enduser/active-sport-match-wise",
    METHOD: "POST",
  },
  GET_EVENT_MARKET: {
    URL: "https://odds-api.kalyanexch.com/event-odds/match-odds",
    METHOD: "GET",
  },
  GET_EVENT_ODDS: {
    URL: "https://odds-api.kalyanexch.com/event-odds/odds/:eventId",
    METHOD: "GET",
  },
  GET_BETLIST_BY_MATCHID:{
    URL:"http://api.a2zscore.com/admin-new-apis/enduser/bet-list-by-matchid",
    METHOD:"POST"
  },
  GET_ACTIVE_FANCY:{
    URL:"/enduser/active-fancy",
    METHOD:"POST"
  },
  GET_MATCH_ODDS:{
    URL:"/enduser/get-odds",
    METHOD:"POST"
  }
  ,
  GET_ACTIVE_FANCY_ODDS:{
    URL:"/enduser/get-fancy-odds",
    METHOD:"POST"
  }
};
