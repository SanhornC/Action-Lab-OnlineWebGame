import { Scene } from "../consts/conditions.js";

import { global_logger } from "../config.js";
import { RoomPlayerSceneData } from "../common/state_ser.js";
const logger = global_logger.make_local_logger("Scene Manager");

const ALL_PLAYER_NUM = 4;
const HUMAN_PLAYER_NUM = 2;
const AI_PLAYER_NUM = 2;

function make_shuffled_index_list(length) {
  const ans_list = [];
  for (let i = 0; i < length; ++i) {
    ans_list.push(i);
  }
  for (let i = 0; i < length - 1; ++i) {
    const swap_idx = i + Math.floor(Math.random() * (length - i));
    const temp = ans_list[i];
    ans_list[i] = ans_list[swap_idx];
    ans_list[swap_idx] = temp;
  }
  return ans_list;
}

/**
 *
 * @param {number[]} original_list
 * @return {number[]} new list
 */
function clone_list(original_list) {
  const new_list = [];
  for (let i = 0; i < original_list.length; ++i) {
    new_list.push(original_list[i]);
  }
  return new_list;
}

export class SceneManager {
  /**@type {Scene} */
  scene_ref;

  /**
   * @private
   * @type {number[][]}
   *
   */
  all_player_played_cards;

  /**
   * @private
   * @type {number[]}
   *
   */
  all_player_mapping;

  /**@type {number[][]} */
  human_player_available_cards_list;

  /**@type {(number | undefined)[]} */
  human_player_to_play_card_idx_list;

  /**
   * @private
   * @type {number}
   *  */
  round_idx;

  /**
   *
   * @param {Scene} scene_ref
   */
  constructor(scene_ref) {
    this.scene_ref = scene_ref;
    this.all_player_mapping = make_shuffled_index_list(ALL_PLAYER_NUM);

    const human_player_mapping = make_shuffled_index_list(HUMAN_PLAYER_NUM);

    this.all_player_played_cards = [];
    for (let player_i = 0; player_i < ALL_PLAYER_NUM; ++player_i) {
      this.all_player_played_cards.push([]);
    }
    const human_player_available_cards_list = [];
    const human_player_to_play_card_idx_list = [];
    for (
      let human_player_i = 0;
      human_player_i < HUMAN_PLAYER_NUM;
      ++human_player_i
    ) {
      const mapped_human_player_i = human_player_mapping[human_player_i];
      human_player_available_cards_list.push(
        clone_list(scene_ref.player_card_idxs_list[mapped_human_player_i])
      );
      human_player_to_play_card_idx_list.push(undefined);
    }
    this.human_player_available_cards_list = human_player_available_cards_list;
    this.human_player_to_play_card_idx_list =
      human_player_to_play_card_idx_list;
    this.round_idx = 0;
  }

  /**
   *
   * @param {number} human_player_idx
   * @returns {RoomPlayerSceneData}
   */
  get_human_player_info(human_player_idx) {
    const available_card_idx_list =
      this.human_player_available_cards_list[human_player_idx];
    const ans_available_cards = [];
    // logger.log(`${human_player_idx}'s card idxs: ${available_card_idx_list}`);
    for (let i = 0; i < available_card_idx_list.length; ++i) {
      const in_scene_card_idx = available_card_idx_list[i];
      ans_available_cards.push(
        this.scene_ref.scene_card_list[in_scene_card_idx]
      );
    }

    const all_player_played_ref = this.all_player_played_cards;
    const all_player_played_cards = [];
    for (
      let player_i = 0;
      player_i < all_player_played_ref.length;
      ++player_i
    ) {
      const ans_player_cards = [];
      const player_card_idx_list = all_player_played_ref[player_i];
      for (
        let card_idx_i = 0;
        card_idx_i < player_card_idx_list.length;
        ++card_idx_i
      ) {
        const card_idx = player_card_idx_list[card_idx_i];
        ans_player_cards.push(this.scene_ref.scene_card_list[card_idx]);
      }
      all_player_played_cards.push(ans_player_cards);
    }

    return {
      scene_description_string: this.scene_ref.scene_description_string,
      all_player_played_cards,
      round_idx: this.round_idx,
      available_cards: ans_available_cards,
      in_scene_player_idx: this.all_player_mapping[human_player_idx],
    };
  }

  /**
   * @param {number} in_scene_player_idx
   * @param {number} in_scene_card_idx
   */
  human_player_play_card_by_in_scene_card_idx(
    in_scene_player_idx,
    in_scene_card_idx
  ) {
    logger.log(in_scene_player_idx);
    const available_card_idx_list =
      this.human_player_available_cards_list[in_scene_player_idx];
    let among_available_cards_flag = false;
    const updated_available_card_idx_list = [];
    for (
      let card_idx_i = 0;
      card_idx_i < available_card_idx_list.length;
      ++card_idx_i
    ) {
      const card_idx = available_card_idx_list[card_idx_i];
      if (card_idx == in_scene_card_idx) {
        if (among_available_cards_flag == true) {
          logger.log(`Duplicated card ${in_scene_card_idx}?...`);
          return false;
        }
        among_available_cards_flag = true;
      } else {
        updated_available_card_idx_list.push(card_idx);
      }
    }

    this.human_player_available_cards_list[in_scene_player_idx] =
      updated_available_card_idx_list;

    if (among_available_cards_flag == false) {
      logger.log(`Card ${in_scene_card_idx} not found...`);
      return false;
    }

    if (
      this.human_player_to_play_card_idx_list[in_scene_player_idx] != undefined
    ) {
      logger.log(`Player in_scene_idx=${in_scene_player_idx} already played.`);
      return false;
    }

    this.human_player_to_play_card_idx_list[in_scene_player_idx] =
      in_scene_card_idx;

    return true;
  }

  proceed_to_next_round() {
    const human_player_num = this.human_player_available_cards_list.length;
    for (
      let human_player_i = 0;
      human_player_i < human_player_num;
      ++human_player_i
    ) {
      const to_play_card_idx =
        this.human_player_to_play_card_idx_list[human_player_i];
      if (to_play_card_idx == undefined) {
        logger.log(`Player in_scene_idx=${human_player_i} not ready.`);
        return false;
      }
      this.human_player_to_play_card_idx_list[human_player_i] = undefined;
      const mapped_player_i = this.all_player_mapping[human_player_i];
      this.all_player_played_cards[mapped_player_i].push(to_play_card_idx);
    }
    const ai_player_num = this.all_player_mapping.length - human_player_num;
    for (let ai_player_i = 0; ai_player_i < ai_player_num; ++ai_player_i) {
      const mapped_player_i =
        this.all_player_mapping[human_player_num + ai_player_i];
      this.all_player_played_cards[mapped_player_i].push(
        this.scene_ref.ai_player_to_play_card_idxs_list[ai_player_i][
          this.round_idx
        ]
      );
    }
    this.round_idx += 1;
    return true;
  }
}
