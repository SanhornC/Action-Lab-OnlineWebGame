import { Room } from "../room_state.js";

/**
 *
 * @param {Room} room_mut_ref
 * @param {number} in_room_player_idx
 */
export function rs00_handle_player_act_on_room_warm_up_state(
  room_mut_ref,
  in_room_player_idx
) {
  if (
    room_mut_ref.human_player_state_completion_flags[in_room_player_idx] == true
  ) {
    return;
  }
  room_mut_ref.human_player_state_completion_flags[in_room_player_idx] = true;
  room_mut_ref.state_completed_player_num += 1;
  if (room_mut_ref.state_completed_player_num < room_mut_ref.human_player_num) {
    room_mut_ref.update_client_state_with_player_in_room_idx(
      in_room_player_idx
    );
  } else {
    room_mut_ref.proceed_and_broadcast();
  }
}
