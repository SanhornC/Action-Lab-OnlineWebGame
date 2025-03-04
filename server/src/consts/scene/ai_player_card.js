import { calc_scene_info_idx_from_condition_id_and_in_condition_scene_idx_fn } from "../consts.js"

const SCENE_PLAYER_CARDS_LIST = [
  [1,0,0,0,1,1,[24, 10, 21, 26, 22, 39],[8, 4, 32, 13, 35, 12]],
  [1,1,0,0,2,1,[22, 35, 21, 0, 19, 17],[4, 7, 6, 5, 32, 24]],
  [1,2,0,0,3,1,[27, 11, 14, 39, 30, 18],[5, 1, 31, 22, 7, 34]],
  [2,0,0,0,2,2,[15, 23, 36, 6, 12, 38],[8, 24, 26, 4, 7, 22]],
  [2,1,0,0,3,2,[31, 20, 36, 12, 26, 14],[28, 5, 32, 7, 43, 17]],
  [2,2,0,0,1,2,[23, 10, 29, 25, 8, 40],[20, 19, 5, 33, 26, 38]],
  [3,0,0,0,3,3,[38, 8, 13, 37, 29, 33],[7, 14, 1, 15, 21, 34]],
  [3,1,0,0,1,3,[20, 6, 21, 29, 7, 26],[28, 0, 10, 35, 5, 2]],
  [3,2,0,0,2,3,[22, 16, 24, 11, 34, 12],[15, 4, 23, 28, 39, 29]],
  [4,0,1,0,1,3,[20, 39, 11, 28, 35, 0],[23, 21, 13, 12, 2, 33]],
  [4,1,1,0,3,2,[6, 9, 19, 28, 7, 5],[10, 36, 2, 27, 17, 25]],
  [4,2,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [5,0,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [5,1,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [5,2,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [6,0,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [6,1,1,0,2,3,[5, 7, 33, 15, 28, 4],[18, 24, 0, 31, 29, 9]],
  [6,2,1,0,1,3,[20, 39, 11, 28, 35, 0],[23, 21, 13, 12, 2, 33]],
  [7,0,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [7,1,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [7,2,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [8,0,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [8,1,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [8,2,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [9,0,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [9,1,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [9,2,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [10,0,0,1,1,2,[25, 19, 2, 18, 13, 38],[23, 36, 27, 17, 15, 8]],
  [10,1,0,1,3,3,[37, 14, 32, 26, 9, 34],[12, 3, 11, 25, 5, 29]],
  [10,2,0,1,2,1,[0, 7, 12, 18, 30, 24],[22, 10, 31, 20, 25, 19]],
  [11,0,0,1,2,3,[11, 4, 25, 0, 8, 29],[17, 1, 40, 18, 6, 34]],
  [11,1,0,1,1,1,[26, 4, 33, 11, 17, 12],[24, 7, 30, 9, 23, 22]],
  [11,2,0,1,3,2,[12, 5, 38, 2, 1, 17],[30, 34, 4, 10, 23, 26]],
  [12,0,0,1,3,1,[39, 1, 17, 35, 21, 34],[12, 13, 25, 0, 20, 30]],
  [12,1,0,1,2,2,[6, 24, 17, 11, 21, 22],[3, 40, 16, 35, 28, 12]],
  [12,2,0,1,1,3,[29, 0, 15, 13, 27, 2],[20, 19, 37, 23, 1, 7]],
  [13,0,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [13,1,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [13,2,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [14,0,1,0,2,3,[5, 7, 33, 15, 28, 4],[18, 24, 0, 31, 29, 9]],
  [14,1,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [14,2,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [15,0,1,0,3,2,[6, 9, 19, 28, 7, 5],[10, 36, 2, 27, 17, 25]],
  [15,1,1,0,1,3,[20, 39, 11, 28, 35, 0],[23, 21, 13, 12, 2, 33]],
  [15,2,1,0,2,3,[5, 7, 33, 15, 28, 4],[18, 24, 0, 31, 29, 9]],
  [16,0,0,2,1,3,[33, 9, 27, 23, 18, 39],[38, 16, 36, 35, 7, 26]],
  [16,1,0,2,3,1,[32, 19, 21, 0, 4, 2],[10, 27, 6, 22, 30, 18]],
  [16,2,0,2,2,2,[2, 1, 21, 35, 16, 0],[29, 15, 33, 4, 12, 38]],
  [17,0,0,2,2,1,[36, 11, 30, 20, 13, 40],[37, 14, 9, 5, 19, 17]],
  [17,1,0,2,1,2,[34, 37, 13, 17, 0, 9],[28, 22, 12, 33, 8, 40]],
  [17,2,0,2,3,2,[25, 11, 1, 10, 4, 9],[3, 31, 24, 7, 26, 14]],
  [18,0,0,2,3,2,[25, 11, 1, 10, 4, 9],[3, 31, 24, 7, 26, 14]],
  [18,1,0,2,2,3,[9, 2, 8, 18, 40, 7],[32, 22, 27, 28, 34, 12]],
  [18,2,0,2,1,1,[16, 3, 17, 9, 38, 1],[2, 28, 19, 13, 22, 39]],
  [19,0,0,0,1,1,[24, 10, 21, 26, 22, 39],[8, 4, 32, 13, 35, 12]],
  [19,1,0,0,2,1,[22, 35, 21, 0, 19, 17],[4, 7, 6, 5, 32, 24]],
  [19,2,0,0,3,1,[27, 11, 14, 39, 30, 18],[5, 1, 31, 22, 7, 34]],
  [20,0,0,0,2,2,[15, 23, 36, 6, 12, 38],[8, 24, 26, 4, 7, 22]],
  [20,1,0,0,3,2,[31, 20, 36, 12, 26, 14],[28, 5, 32, 7, 43, 17]],
  [20,2,0,0,1,2,[23, 10, 29, 25, 8, 40],[20, 19, 5, 33, 26, 38]],
  [21,0,0,0,3,3,[38, 8, 13, 37, 29, 33],[7, 14, 1, 15, 21, 34]],
  [21,1,0,0,1,3,[20, 6, 21, 29, 7, 26],[28, 0, 10, 35, 5, 2]],
  [21,2,0,0,2,3,[22, 16, 24, 11, 34, 12],[15, 4, 23, 28, 39, 29]],
  [22,0,1,0,1,3,[20, 39, 11, 28, 35, 0],[23, 21, 13, 12, 2, 33]],
  [22,1,1,0,3,2,[6, 9, 19, 28, 7, 5],[10, 36, 2, 27, 17, 25]],
  [22,2,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [23,0,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [23,1,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [23,2,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [24,0,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [24,1,1,0,2,3,[5, 7, 33, 15, 28, 4],[18, 24, 0, 31, 29, 9]],
  [24,2,1,0,1,3,[20, 39, 11, 28, 35, 0],[23, 21, 13, 12, 2, 33]],
  [25,0,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [25,1,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [25,2,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [26,0,1,0,2,1,[22, 40, 23, 4, 5, 7],[20, 21, 18, 39, 24, 36]],
  [26,1,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [26,2,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [27,0,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [27,1,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [27,2,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [28,0,0,1,1,2,[25, 19, 2, 18, 13, 38],[23, 36, 27, 17, 15, 8]],
  [28,1,0,1,3,3,[37, 14, 32, 26, 9, 34],[12, 3, 11, 25, 5, 29]],
  [28,2,0,1,2,1,[0, 7, 12, 18, 30, 24],[22, 10, 31, 20, 25, 19]],
  [29,0,0,1,2,3,[11, 4, 25, 0, 8, 29],[17, 1, 40, 18, 6, 34]],
  [29,1,0,1,1,1,[26, 4, 33, 11, 17, 12],[24, 7, 30, 9, 23, 22]],
  [29,2,0,1,3,2,[12, 5, 38, 2, 1, 17],[30, 34, 4, 10, 23, 26]],
  [30,0,0,1,3,1,[39, 1, 17, 35, 21, 34],[12, 13, 25, 0, 20, 30]],
  [30,1,0,1,2,2,[6, 24, 17, 11, 21, 22],[3, 40, 16, 35, 28, 12]],
  [30,2,0,1,1,3,[29, 0, 15, 13, 27, 2],[20, 19, 37, 23, 1, 7]],
  [31,0,1,0,1,1,[24, 10, 6, 8, 13, 4],[9, 21, 11, 5, 12, 2]],
  [31,1,1,0,2,2,[20, 0, 13, 8, 4, 24],[35, 36, 11, 9, 22, 2]],
  [31,2,1,0,3,3,[36, 19, 17, 7, 15, 14],[25, 13, 26, 6, 34, 23]],
  [32,0,1,0,2,3,[5, 7, 33, 15, 28, 4],[18, 24, 0, 31, 29, 9]],
  [32,1,1,0,3,1,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [32,2,1,0,1,2,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [33,0,1,0,3,2,[6, 9, 19, 28, 7, 5],[10, 36, 2, 27, 17, 25]],
  [33,1,1,0,1,3,[37, 2, 23, 5, 22, 1],[0, 14, 35, 3, 34, 32]],
  [33,2,1,0,2,3,[23, 10, 32, 20, 33, 19],[17, 29, 18, 16, 38, 28]],
  [34,0,0,2,1,3,[33, 9, 27, 23, 18, 39],[38, 16, 36, 35, 7, 26]],
  [34,1,0,2,3,1,[32, 19, 21, 0, 4, 2],[10, 27, 6, 22, 30, 18]],
  [34,2,0,2,2,2,[2, 1, 21, 35, 16, 0],[29, 15, 33, 4, 12, 38]],
  [35,0,0,2,2,1,[36, 11, 30, 20, 13, 40],[37, 14, 9, 5, 19, 17]],
  [35,1,0,2,1,2,[34, 37, 13, 17, 0, 9],[28, 22, 12, 33, 8, 40]],
  [35,2,0,2,3,2,[25, 11, 1, 10, 4, 9],[3, 31, 24, 7, 26, 14]],
  [36,0,0,2,3,2,[25, 11, 1, 10, 4, 9],[3, 31, 24, 7, 26, 14]],
  [36,1,0,2,2,3,[9, 2, 8, 18, 40, 7],[32, 22, 27, 28, 34, 12]],
  [36,2,0,2,1,1,[16, 3, 17, 9, 38, 1],[2, 28, 19, 13, 22, 39]],
]

/**
 * 
 * @param {number} condition_id 
 * @param {number} in_condition_scene_idx 
 * @param {number} case_d_id 
 * @param {number} case_variant_id 
 * @return {number[][]} ai player 0 to-play cards, ai player 1 to-play cards
 */
export function get_scene_ai_player_card_idx_list(condition_id, in_condition_scene_idx, case_d_id, case_variant_id) {
  const scene_ai_player_cards_info = SCENE_PLAYER_CARDS_LIST[calc_scene_info_idx_from_condition_id_and_in_condition_scene_idx_fn(condition_id, in_condition_scene_idx)];
  if (scene_ai_player_cards_info[2] != case_d_id || scene_ai_player_cards_info[3] != case_variant_id) {
    throw Error("Case Info doesn't match.");
  }
  return [scene_ai_player_cards_info[6], scene_ai_player_cards_info[7]]
}