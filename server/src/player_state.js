import * as player_state_consts_mod from "./common/player_state_consts.js";
import { WS_EVENT_S_TO_C_SET_CLIENT_STATE } from "./common/ws_event_consts.js";
import {
  PlayerRoomStateSer,
  PlayerStateSer,
  TotalStateSer,
} from "./common/state_ser.js";

export class PlayerState {
  /**@type {number} */
  player_id;

  /**@type {number} */
  player_idx;

  /**@type {number} */
  player_state_idx;

  /**@private */
  socket_mut_ref;

  /**@type {number | undefined} */
  root_id_opt;

  /** @type {number[]} */
  test_ping_pong_list = [];

  /**
   *
   * @param {number} player_id
   * @param {number} player_idx
   */
  constructor(player_id, player_idx) {
    this.player_id = player_id;
    this.player_idx = player_idx;
    this.player_state_idx = 0;
  }

  play_test_ping_pong(action) {
    this.test_ping_pong_list.push(action);
  }

  next() {
    if (
      this.player_state_idx <
      player_state_consts_mod.PLAYER_STATE_3_THANK_YOU_IDX
    ) {
      this.player_state_idx += 1;
    }
    return this.player_state_idx;
  }

  join_room(room_id) {
    this.root_id_opt = room_id;
  }

  leave_room() {
    this.root_id_opt = undefined;
  }

  update_client_state(data) {
    if (this.socket_mut_ref != undefined) {
      this.socket_mut_ref.emit(WS_EVENT_S_TO_C_SET_CLIENT_STATE, data);
      return true;
    } else {
      return false;
    }
  }

  socket_connected(socket) {
    this.socket_mut_ref = socket;
  }

  socket_disconnected() {
    this.socket_mut_ref = undefined;
  }

  /**
   *
   * @returns {PlayerStateSer} Serialized Player State
   */
  make_player_state_ser() {
    return {
      player_id: this.player_id,
      player_state_idx: this.player_state_idx,
      test_ping_pong_list: this.test_ping_pong_list,
    };
  }

  /**
   *
   * @param {PlayerRoomStateSer} room_ser
   * @returns {TotalStateSer} Total Serialized Player State
   */
  make_total_state_with_room(room_ser) {
    return { player_ser: this.make_player_state_ser(), room_opt: room_ser };
  }
}
