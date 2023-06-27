import { ApiResource } from "../apiService";

export const inPlayDetailResources: { [x: string]: ApiResource } = {
  GET_BETLIST_BY_MATCHID: {
    URL: "enduser/bet-list-by-matchid",
    METHOD: "POST",
  },
  PLACE_BET: {
    URL: "/enduser/place-bets",
    METHOD: "POST",
  },

  USER_FANCY_PNL: {
    URL: "/enduser/user-fancy-pnl",
    METHOD: "POST",
  },

  USER_ODDS_PNL: {
    URL: "/enduser/user-odds-pnl",
    METHOD: "POST",
  },
  PNL_BOOK: {
    URL: "enduser/user-fancy-book",
    METHOD: "POST",
  },
  Bet_List_History: {
    URL: "enduser/bet-list-history",
    METHOD: "POST",
  },

};
