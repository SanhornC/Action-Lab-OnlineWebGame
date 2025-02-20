import * as ws_event_consts_mod from "../../common/ws_event_consts.js";
import { ServerState } from "../../server_state.js";

/**
 * @author {Zhifeng Wang}
 *
 * @param {number} player_id
 * @param {*} client_socket
 * @param {ServerState} server_state_ref
 */
export function add_ws_handler_of_ws_c_to_s_player_go_next_event(
  player_id,
  client_socket,
  server_state_ref
) {
  client_socket.on(ws_event_consts_mod.WS_EVENT_C_TO_S_GO_NEXT, (data) => {
    server_state_ref.player_go_next(player_id, data)
  });
}
