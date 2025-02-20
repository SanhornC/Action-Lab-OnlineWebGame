import { PlayerState } from "../player_state.js";
import { ServerState } from "../server_state.js";

import { global_logger } from "../config.js";
const logger = global_logger.make_local_logger("s00_demo_go_next");
/**
 *
 * @param {ServerState} server_state_ref
 * @param {PlayerState} player_state_ref
 */
export function player_instruction_state_go_next(
  server_state_ref,
  player_state_ref
) {
  const player_id = player_state_ref.player_id;

  const needed_player_num = server_state_ref.next_room_config.human_player_num;
  if (needed_player_num <= server_state_ref.waitlist.length + 1) {
    logger.log(`Player with id ${player_id} joining`);
    let joining_player_id_list = [];
    for (let i = 0; i < needed_player_num - 1; ++i) {
      const to_add_player_id = server_state_ref.waitlist.pop();
      if (to_add_player_id == undefined) {
        throw new Error();
      }
      joining_player_id_list.push(to_add_player_id);
    }
    joining_player_id_list.push(player_id);

    server_state_ref.add_room(joining_player_id_list);

    for (let i = 0; i < joining_player_id_list.length; ++i) {
      const curr_player_id = joining_player_id_list[i];
      const player_state_ref =
        server_state_ref.get_player_state_ref_from_id(curr_player_id);
      player_state_ref.update_client_state(
        server_state_ref.get_player_total_state(player_state_ref.player_id)
      );
    }
  } else {
    logger.log(`Player with id ${player_id} go to wait list.`);
    player_state_ref.player_state_idx += 1;
    server_state_ref.waitlist.push(player_id);
    player_state_ref.update_client_state(
      server_state_ref.get_player_total_state(player_state_ref.player_id)
    );
  }
}
