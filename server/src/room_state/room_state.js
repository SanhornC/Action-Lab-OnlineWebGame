import * as CONSTS_MOD from "../common/room_state_const.js";
import { PlayerRoomStateSer } from "../common/state_ser.js";

import { global_logger } from "../config.js";
import { Condition } from "../consts/conditions.js";
import { PlayerState } from "../player_state.js";
import { rs00_handle_player_act_on_room_warm_up_state } from "./room_state_transition/rs00_warm_up.js";
import { rs01_handle_player_act_on_room_playing_state } from "./room_state_transition/rs01_playing.js";
import { SceneManager } from "./scene_manager.js";

const logger = global_logger.make_local_logger("Room");

const RS_ROUND_0_PLAY_CARD_STATE_IDX = 0;
const RS_ROUND_0_FEEDBACK_STATE_IDX = 1;
const RS_ROUND_1_PLAY_CARD_STATE_IDX = 2;
const RS_ROUND_1_FEEDBACK_STATE_IDX = 3;
const RS_ROUND_2_PLAY_CARD_STATE_IDX = 4;
const RS_ROUND_2_FEEDBACK_STATE_IDX = 5;
const RS_MIDGAME_SURVEY_STATE_IDX = 6;
const RS_ROUND_3_PLAY_CARD_STATE_IDX = 7;
const RS_ROUND_3_FEEDBACK_STATE_IDX = 8;
const RS_ROUND_4_PLAY_CARD_STATE_IDX = 9;
const RS_ROUND_4_FEEDBACK_STATE_IDX = 10;
const RS_ROUND_5_PLAY_CARD_STATE_IDX = 11;
const RS_ROUND_5_FEEDBACK_STATE_IDX = 12;
const RS_ENDGAME_SURVEY_STATE_IDX = 13;

export class Room {
  /**@type {number} */
  room_id;

  /**@type {Condition} */
  condition;

  // Communication

  /**@type {PlayerState[]} */
  player_state_ref_list;

  /**@type {Map<number, number>} @private */
  player_id_to_in_room_idx_map;

  // State Info

  /**@type {SceneManager[]} @private*/
  scene_managers_list;

  /**@type {number} @private */
  room_scene_idx;

  /**@type {number} @private*/
  room_scene_state_idx;

  /**@type {number} */
  human_player_num;

  /**@type {boolean[]} */
  human_player_state_completion_flags;

  /**@type {number} */
  state_completed_player_num;

  // Testing

  /**@type {number[][]} @private*/
  test_player_nums_list;

  /**
   *
   * @param {number} room_id
   * @param {PlayerState[]} player_state_ref_list
   * @param {Condition} condition
   */
  constructor(room_id, player_state_ref_list, condition) {
    this.room_id = room_id;

    this.condition = condition;
    this.room_scene_idx = 0;

    this.human_player_num = player_state_ref_list.length;

    this.scene_managers_list = [
      new SceneManager(condition.scene_0),
      new SceneManager(condition.scene_1),
      new SceneManager(condition.scene_2),
    ];

    this.player_state_ref_list = player_state_ref_list;

    const players_len = player_state_ref_list.length;

    this.player_id_to_in_room_idx_map = new Map();

    const test_nums_list = [];
    const human_player_state_completion_flags = [];

    for (
      let in_room_player_idx = 0;
      in_room_player_idx < players_len;
      ++in_room_player_idx
    ) {
      const player_state_ref = player_state_ref_list[in_room_player_idx];
      const player_id = player_state_ref.player_id;
      logger.log(
        `Setting player with id${JSON.stringify(
          player_state_ref.make_player_state_ser()
        )} mapping to in-room player idx ${in_room_player_idx}`
      );

      this.player_id_to_in_room_idx_map.set(player_id, in_room_player_idx);

      test_nums_list.push([]);
      human_player_state_completion_flags.push(false);
    }
    this.human_player_state_completion_flags =
      human_player_state_completion_flags;
    this.test_player_nums_list = test_nums_list;
    this.room_scene_state_idx = 0;
    this.state_completed_player_num = 0;
    this.need_to_boardcast_flag = true;
  }

  /**
   *
   * @returns {SceneManager} scene manager
   */
  get_curr_scene_manager() {
    return this.scene_managers_list[this.room_scene_idx];
  }

  /**
   *
   * @param {number} player_id
   * @param {any} action_data
   */
  player_with_id_play_action(player_id, action_data) {
    const in_room_player_idx_opt =
      this.player_id_to_in_room_idx_map.get(player_id);
    if (in_room_player_idx_opt == undefined) {
      return;
    }
    const in_room_player_idx = in_room_player_idx_opt;
    const room_scene_state_idx = this.room_scene_state_idx;

    if (room_scene_state_idx == CONSTS_MOD.RS_SCENE_WARMUP_IDX) {
      rs00_handle_player_act_on_room_warm_up_state(this, in_room_player_idx);
    } else if (
      room_scene_state_idx >= CONSTS_MOD.RS_SCENE_ROUND_0_IDX &&
      room_scene_state_idx <= CONSTS_MOD.RS_SCENE_ROUND_5_IDX
    ) {
      rs01_handle_player_act_on_room_playing_state(
        this,
        in_room_player_idx,
        action_data
      );
    } else {
      logger.log("Towards end.");
      this.human_player_state_completion_flags[in_room_player_idx] = true;
      this.state_completed_player_num += 1;
      this.proceed_and_broadcast();
    }
  }

  /**
   *
   * @param {number} player_id
   * @param {number} test_num
   */
  player_with_id_play_test_num(player_id, test_num) {
    const player_idx = this.player_id_to_in_room_idx_map.get(player_id);

    if (player_idx == undefined) {
      logger.log(`Player with id ${player_id} not found..`);
      return;
    }

    this.test_player_nums_list[player_idx].push(test_num);
    this.update_all_client_state();
  }

  /**
   *
   * @param {number} in_room_player_idx
   */
  get_room_player_state_with_in_room_idx(in_room_player_idx) {
    if (this.player_state_ref_list.length <= in_room_player_idx) {
      logger.log(
        `Player with idx ${in_room_player_idx} not found in room with id ${this.room_id}.. out of range.`
      );
      return;
    }

    return new PlayerRoomStateSer(
      this.scene_managers_list[this.room_scene_idx].get_human_player_info(
        in_room_player_idx
      ),
      this.room_scene_idx,
      this.room_scene_state_idx,
      this.human_player_state_completion_flags[in_room_player_idx],
      this.test_player_nums_list
    );
  }

  /**
   *
   * @param {number} player_id
   */
  get_room_player_state(player_id) {
    const in_room_player_idx = this.player_id_to_in_room_idx_map.get(player_id);

    if (in_room_player_idx == undefined) {
      logger.log(
        `Player with id ${player_id} not found in room with id ${this.room_id}..`
      );
      return;
    }

    return this.get_room_player_state_with_in_room_idx(in_room_player_idx);
  }

  /**
   *
   * @param {number} player_in_room_idx
   */
  update_client_state_with_player_in_room_idx(player_in_room_idx) {
    const player_state_ref = this.player_state_ref_list[player_in_room_idx];

    player_state_ref.update_client_state(
      player_state_ref.make_total_state_with_room(
        this.get_room_player_state_with_in_room_idx(player_in_room_idx)
      )
    );
  }

  proceed_and_broadcast() {
    if (this.state_completed_player_num < this.human_player_num) {
      return;
    }
    this.state_completed_player_num = 0;
    for (
      let in_room_player_idx = 0;
      in_room_player_idx < this.human_player_num;
      ++in_room_player_idx
    ) {
      this.human_player_state_completion_flags[in_room_player_idx] = false; // Even though we can just set up a "true" flag and using false to represent true to save us some time...
    }
    this.room_scene_state_idx += 1;
    if (this.room_scene_state_idx >= CONSTS_MOD.RS_SCENE_STATE_NUM) {
      this.room_scene_state_idx = 0;
      this.room_scene_idx += 1;
    }
    this.update_all_client_state();
  }

  update_all_client_state() {
    const room_player_state_list = this.player_state_ref_list;
    for (
      let in_room_player_idx = 0;
      in_room_player_idx < room_player_state_list.length;
      ++in_room_player_idx
    ) {
      this.update_client_state_with_player_in_room_idx(in_room_player_idx);
    }
  }
}
