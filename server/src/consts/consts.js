export const SCENE_NUM = 3;
export const SCENE_TYPE_NUM = 3;

export const CONDITION_NUM = 36;
export const CONDITION_GAME_NUM = 3;

/**
 * 
 * @param {number} scene_id 
 * @param {number} scene_type_id 
 * @return {number} scene_idx
 */
export function calc_scene_idx_fn(scene_id, scene_type_id) {
  return(scene_id - 1) * SCENE_TYPE_NUM + (scene_type_id - 1)
}

/**
 * 
 * @param {number} condition_id
 * @param {number} in_condition_scene_idx 
 * @return {number} scene info idx (for player and ai player cards)
 */
export function calc_scene_info_idx_from_condition_id_and_in_condition_scene_idx_fn(condition_id, in_condition_scene_idx) {
  return (condition_id - 1) * CONDITION_GAME_NUM + in_condition_scene_idx;
}