import { get_scene_ai_player_card_idx_list } from "./scene/ai_player_card.js";
import { get_scene_card_list } from "./scene/cards.js";
import { get_scene_description } from "./scene/description.js";
import { get_scene_endgame_survey_question } from "./scene/endgame_survey.js";
import { get_scene_midgame_survey_questions } from "./scene/midgame_survey.js";
import { get_scene_player_card_idx_list } from "./scene/player_card.js";

import { CONDITION_NUM } from "./consts.js";

export class Scene {
  /**@type {Card[]} */
  scene_card_list;
  /**@type {string} */
  scene_description_string;
  /**@type {Question[]} */
  scene_midgame_question_list;
  /**@type {Question} */
  scene_endgame_question;
  /**@type {number[][]} */
  ai_player_to_play_card_idxs_list;
  /**@type {number[][]} */
  player_card_idxs_list;

  /**
   * 
   * @param {number} scene_id 
   * @param {number} scene_type_id 
   * @param {number} condition_id 
   * @param {number} in_condition_scene_idx 
   * @param {number} case_d_id
   * @param {number} case_variant_id  
   */
  constructor(
    scene_id, scene_type_id, 
    condition_id, in_condition_scene_idx,
    case_d_id, case_variant_id
  ) {
    const scene_card_list = get_scene_card_list(scene_id, scene_type_id);
    const scene_description_string = get_scene_description(scene_id, scene_type_id);
    const scene_midgame_question_list = get_scene_midgame_survey_questions(scene_id, scene_type_id);
    const scene_endgame_question = get_scene_endgame_survey_question(scene_id, scene_type_id);
    const ai_player_to_play_card_idxs_list = get_scene_ai_player_card_idx_list(condition_id, in_condition_scene_idx, case_d_id, case_variant_id);
    const player_card_idxs_list = get_scene_player_card_idx_list(condition_id, in_condition_scene_idx, case_d_id, case_variant_id);
    this.scene_card_list = scene_card_list;
    this.scene_description_string = scene_description_string;
    this.scene_midgame_question_list = scene_midgame_question_list;
    this.scene_endgame_question = scene_endgame_question;
    this.ai_player_to_play_card_idxs_list =
      ai_player_to_play_card_idxs_list;
    this.player_card_idxs_list = player_card_idxs_list;
  }
}

const CONDITION_DATA_LIST = [
[1,0,0,1,1,2,1,3,1],
[2,0,0,2,2,3,2,1,2],
[3,0,0,3,3,1,3,2,3],
[4,1,0,1,3,3,2,2,1],
[5,1,0,2,2,1,1,3,3],
[6,1,0,3,1,2,3,1,3],
[7,1,0,1,2,2,1,3,1],
[8,1,0,2,1,3,3,1,1],
[9,1,0,3,3,1,2,2,2],
[10,0,1,1,2,3,3,2,1],
[11,0,1,2,3,1,1,3,2],
[12,0,1,3,1,2,2,1,3],
[13,1,0,1,1,2,2,3,3],
[14,1,0,2,3,3,1,1,2],
[15,1,0,3,2,1,3,2,3],
[16,0,2,1,3,3,1,2,2],
[17,0,2,2,1,1,2,3,2],
[18,0,2,3,2,2,3,1,1],
[19,0,0,1,1,2,1,3,1],
[20,0,0,2,2,3,2,1,2],
[21,0,0,3,3,1,3,2,3],
[22,1,0,1,3,3,2,2,1],
[23,1,0,2,2,1,1,3,3],
[24,1,0,3,1,2,3,1,3],
[25,1,0,1,2,2,1,3,1],
[26,1,0,2,1,3,3,1,1],
[27,1,0,3,3,1,2,2,2],
[28,0,1,1,2,3,3,2,1],
[29,0,1,2,3,1,1,3,2],
[30,0,1,3,1,2,2,1,3],
[31,1,0,1,1,2,2,3,3],
[32,1,0,2,3,3,1,1,2],
[33,1,0,3,2,1,3,2,3],
[34,0,2,1,3,3,1,2,2],
[35,0,2,2,1,1,2,3,2],
[36,0,2,3,2,2,3,1,1],
]

export class Condition {
  /**@type {Scene} */
  scene_0;
  /**@type {Scene} */
  scene_1;
  /**@type {Scene} */
  scene_2;
  /**
   * 
   * @param {number} condition_id 
   * @param {number} case_d_id 
   * @param {number} case_variant_id 
   */
  constructor(condition_id) {
    const condition_idx = condition_id - 1;
    const [_, case_d_id, case_variant_id, scene_0_id, scene_0_type_id, scene_1_id, scene_1_type_id, scene_2_id, scene_2_type_id] = CONDITION_DATA_LIST[condition_idx];
    
    this.scene_0 = new Scene(scene_0_id, scene_0_type_id, condition_id, 0, case_d_id, case_variant_id);
    this.scene_1 = new Scene(scene_1_id, scene_1_type_id, condition_id, 1, case_d_id, case_variant_id);
    this.scene_2 = new Scene(scene_2_id, scene_2_type_id, condition_id, 2, case_d_id, case_variant_id);
  }
}

const CONDITION_LIST = [];

for (let condition_idx = 0; condition_idx < CONDITION_NUM; ++condition_idx) {
  CONDITION_LIST.push(new Condition(condition_idx + 1));
}

export function get_condition_based_on_idx(idx) {
  return CONDITION_LIST[idx]
}