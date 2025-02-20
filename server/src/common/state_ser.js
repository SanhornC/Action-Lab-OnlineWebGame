export class Card {
  /**@type {number} */
  in_scene_index;

  /**
   * @type {string}
   */
  tag_0_string;
  /**
   * @type {string}
   */
  tag_1_string;
  /**
   * @type {string}
   */
  tag_2_string;
  /**
   * @type {string}
   */
  description_string;

  constructor(
    in_scene_index,
    tag_0_string,
    tag_1_string,
    tag_2_string,
    description_string
  ) {
    this.in_scene_index = in_scene_index;
    this.tag_0_string = tag_0_string;
    this.tag_1_string = tag_1_string;
    this.tag_2_string = tag_2_string;
    this.description_string = description_string;
  }
}

export class Question {
  /** @type {string} */
  description_string;
  /**@type {string[]} */
  option_string_list;

  constructor(description_string, option_string_list) {
    this.description_string = description_string;
    this.option_string_list = option_string_list;
  }
}

/**
 * # Serialized Player State
 */
export class PlayerStateSer {
  /**@type {number} */
  player_id;

  /**@type {number} */
  player_state_idx;

  /**@type {number[]} */
  test_ping_pong_list;
}

export class RoomPlayerSceneData {
  /**@type {string} */
  scene_description_string;

  /**@type {Card[][]} */
  all_player_played_cards;

  /**@type {Card[]} */
  available_cards;

  /**@type {number} */
  in_scene_player_idx;
}

/**
 * # Serialized Room State for A Player
 */
export class PlayerRoomStateSer {
  /**@type {RoomPlayerSceneData} */
  scene_data;

  /**@type {number} */
  room_scene_idx;

  /**@type {number} */
  room_scene_state_idx;

  /**@type {boolean} */
  player_completed_curr_step;

  /**@type {number[][]} */
  test_player_nums_list;

  constructor(
    scene_data,
    room_scene_idx,
    room_scene_state_idx,
    player_completed_curr_step,
    test_player_nums_list
  ) {
    this.scene_data = scene_data;
    this.room_scene_idx = room_scene_idx;
    this.room_scene_state_idx = room_scene_state_idx;
    this.player_completed_curr_step = player_completed_curr_step;
    this.test_player_nums_list = test_player_nums_list;
  }
}

/**
 * # Serialized Total State
 */
export class TotalStateSer {
  /**@type {PlayerStateSer} */
  player_ser;
  /**@type {undefined | PlayerRoomStateSer} */
  room_opt;
}

// Data Collections

export class PlayerPlayCardData {
  action_type_number = 0;
  /**@type {number} */
  in_scene_card_idx;

  /**
   *
   * @param {number} in_scene_card_idx
   */
  constructor(in_scene_card_idx) {
    this.in_scene_card_idx = in_scene_card_idx;
  }
}
