import { PlayerState } from "../player_state.js";
import { ServerState } from "../server_state.js";

import { global_logger } from "../config.js";
const logger = global_logger.make_local_logger("s01_player_playing");
/**
 *
 * @param {ServerState} server_state_ref
 * @param {PlayerState} player_state_ref
 * @param {any} data
 */
export function s01_player_playing_in_room(
  server_state_ref,
  player_state_ref,
  data
) {
  const player_id = player_state_ref.player_id;
  const room_id_opt = player_state_ref.root_id_opt;
  if (room_id_opt == undefined) {
    return;
  }
  const room_id = room_id_opt;
  const room_mut_ref = server_state_ref.get_room_ref_from_id(room_id);
  room_mut_ref.player_with_id_play_action(player_id, data);
}
