import { PlayerPlayCardData } from "../../common/state_ser.js";
import { Room } from "../room_state.js";

/**
 *
 * @param {Room} room_mut_ref
 * @param {number} in_room_player_idx
 * @param {PlayerPlayCardData} data
 */
export function rs01_handle_player_act_on_room_playing_state(
  room_mut_ref,
  in_room_player_idx,
  data
) {
  if (
    room_mut_ref.human_player_state_completion_flags[in_room_player_idx] == true
  ) {
    return;
  }

  if (data.action_type_number != 0) {
    return;
  }

  const scene_manager = room_mut_ref.get_curr_scene_manager();

  const play_result = scene_manager.human_player_play_card_by_in_scene_card_idx(
    in_room_player_idx,
    data.in_scene_card_idx
  );

  if (play_result == false) {
    return;
  }

  room_mut_ref.human_player_state_completion_flags[in_room_player_idx] = true;
  room_mut_ref.state_completed_player_num += 1;
  if (room_mut_ref.state_completed_player_num < room_mut_ref.human_player_num) {
    room_mut_ref.update_client_state_with_player_in_room_idx(
      in_room_player_idx
    );
  } else {
    scene_manager.proceed_to_next_round();
    room_mut_ref.proceed_and_broadcast();
  }
}
