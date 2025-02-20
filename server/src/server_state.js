// Initialize Logger
import { global_logger, query } from "./config.js";
const logger = global_logger.make_local_logger("State");

import { PlayerState } from "./player_state.js";
import { Room } from "./room_state/room_state.js";
import { TotalStateSer } from "./common/state_ser.js";

import * as player_state_consts_mod from "./common/player_state_consts.js";
import { player_instruction_state_go_next } from "./server_state/s00_player_instruction_go_next.js";
import { get_condition_based_on_idx } from "./consts/conditions.js";
import { s01_player_playing_in_room } from "./server_state/s01_player_playing.js";

import { get_total_player_and_room_num } from "./database/database.js";

export class ServerState {
  /**@type {number} @private*/
  player_count_number;
  /**@type {number} @private*/
  room_count_number;

  /** @type {Map<number, PlayerState>} @private*/
  player_id_to_player_state_map;

  /**@type {Map<number, Room>} @private */
  room_id_to_room_map;

  /**@type {boolean} */
  lock;

  /**@type {number[]} */
  waitlist;

  next_room_config = {
    human_player_num: 2,
  };

  constructor() {
    this.lock = true;
    this.waitlist = [];
    this.player_id_to_player_state_map = new Map();
    this.room_id_to_room_map = new Map();
    get_total_player_and_room_num().then(
      ({ player_count_number, room_count_number }) => {
        this.player_count_number = player_count_number;
        this.room_count_number = room_count_number;
        this.lock = false;
        logger.log(`player_count: ${this.player_count_number}`);
        logger.log(`room_count: ${this.room_count_number}`);
      }
    );
  }

  /**
   * @returns  {PlayerState} Player State
   */
  add_player() {
    const next_player_id = this.player_count_number;

    logger.log(`Adding player with id ${next_player_id}`);

    const new_player_state = new PlayerState(next_player_id);

    this.player_id_to_player_state_map.set(next_player_id, new_player_state);
    this.player_count_number += 1;

    return new_player_state;
  }

  /**
   *
   * @param {number[]} player_id_list
   */
  add_room(player_id_list) {
    const room_id = this.room_count_number;

    this.room_count_number += 1;

    const player_state_ref_list = [];

    for (let id_i = 0; id_i < player_id_list.length; ++id_i) {
      const player_id = player_id_list[id_i];
      const player_state_ref = this.get_player_state_ref_from_id(player_id);
      player_state_ref.player_state_idx =
        player_state_consts_mod.PLAYER_STATE_2_PLAYING_IDX;
      player_state_ref.root_id_opt = room_id;
      logger.log(
        `Player with id ${player_state_ref.player_id} joining room ${room_id}`
      );

      player_state_ref_list.push(player_state_ref);
    }
    logger.log(`Make room(id=${room_id})`);
    const room = new Room(
      room_id,
      player_state_ref_list,
      get_condition_based_on_idx(0)
    );
    this.room_id_to_room_map.set(room_id, room);
  }

  /**
   *
   * @param {number} room_id
   * @returns {Room}
   */
  get_room_ref_from_id(room_id) {
    return this.room_id_to_room_map.get(room_id);
  }

  /**
   *
   * @param {number} player_id
   * @returns {PlayerState}
   */
  get_player_state_ref_from_id(player_id) {
    return this.player_id_to_player_state_map.get(player_id);
  }

  /**
   *
   * @param {number} player_id
   * @returns {TotalStateSer}
   *
   * This function is about sending all the needed information for the client to represent and render the page.
   *
   */
  get_player_total_state(player_id) {
    const player_state_ref = this.get_player_state_ref_from_id(player_id);

    if (player_state_ref == undefined) {
      return;
    }

    let room_ref_opt = undefined;
    const room_id_opt = player_state_ref.root_id_opt;
    if (room_id_opt != undefined) {
      const room_id = room_id_opt;

      room_ref_opt =
        this.get_room_ref_from_id(room_id).get_room_player_state(player_id);
    }
    logger.log(`Getting total state for player with id ${player_id}`);
    return player_state_ref.make_total_state_with_room(room_ref_opt);
  }

  /**
   *
   * @param {number} player_id
   * @param {{}} data
   */
  player_go_next(player_id, data) {
    const player_state_ref = this.get_player_state_ref_from_id(player_id);
    if (player_state_ref == undefined) {
      return;
    }
    const player_state_idx = player_state_ref.player_state_idx;
    if (
      player_state_idx ==
      player_state_consts_mod.PLAYER_STATE_0_INSTRUCTION_PAGE_IDX
    ) {
      logger.log(
        `Player with id=${player_id} proceeding from instruction state.`
      );
      player_instruction_state_go_next(this, player_state_ref);
    } else if (
      player_state_idx == player_state_consts_mod.PLAYER_STATE_2_PLAYING_IDX
    ) {
      logger.log(`Player with id ${player_id} playing in room.`);
      s01_player_playing_in_room(this, player_state_ref, data);
    }
    return [];
  }
}
