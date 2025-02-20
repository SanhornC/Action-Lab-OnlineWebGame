export const API_DOMAIN_HTTP = import.meta.env.VITE_API_DOMAIN_HTTP;
export const API_DOMAIN_WS = import.meta.env.VITE_API_DOMAIN_WS;

export const API_HTTP_GET_PLAYER_STATE_DOMAIN_ENDPOINT = `${API_DOMAIN_HTTP}/get_player_state`;

export const API_HTTP_NEW_PLAYER_JOIN_DOMAIN_ENDPOINT = `${API_DOMAIN_HTTP}/new_player_join`;

// Temp
export const API_HTTP_GO_NEXT_PLAYER_STATE_DOMAIN_ENDPOINT = `${API_DOMAIN_HTTP}/go_next_player_state`;
export const API_HTTP_SUBMIT_DEMOGRAPH_SURVEY_DOMAIN_ENDPOINT = `${API_DOMAIN_HTTP}/demographic`;
export const GET_JSON_FETCH_OPT = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
