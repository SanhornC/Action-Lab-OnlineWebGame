import {WS_EVENT_C_TO_S_PLAY_TEST_PING_PONG} from "../../common/ws_event_consts.js";
import { ServerState } from "../../server_state.js";

/**
 * @author {Zhifeng Wang}
 *
 * @param {number} player_id
 * @param {*} client_socket
 * @param {ServerState} server_state_ref
 */
export function add_ws_handler_to_ws_c_to_s_text_ping_pong_event(
  player_id,
  client_socket,
  server_state_ref
) {
  client_socket.on(WS_EVENT_C_TO_S_PLAY_TEST_PING_PONG, ({action, play_in_room_flag}) => {
    const player_mut_ref = server_state_ref.get_player_state_ref_from_id(player_id);
    if (play_in_room_flag == true) {
      let room_id = player_mut_ref.root_id_opt;
      if (room_id == undefined) {
        return;
      }
      const room_mut_ref = server_state_ref.get_room_ref_from_id(room_id);
      room_mut_ref.player_with_id_play_test_num(player_id, action);
    } else {
      player_mut_ref.play_test_ping_pong(action);
      player_mut_ref.update_client_state(server_state_ref.get_player_total_state(player_id))
    }
  });
}
