import {  calc_scene_idx_fn } from "../consts.js"
import { Question } from "../../common/state_ser.js"

const SCENE_SURVEY_QUESTION_LIST = [
  ['Please select the best target for the final decision.', ['ME','NJ','PI','SA']],
  ['Please select the best target for the final decision.', ['X','Y','Z','The three options are indifferent']],
  ['Based on all information you got, please select the best target city to host the game.', ['Auro','Basa','Cilia','Debu']],
  ['Who is the most suspicious suspect?', ['The Suspect A','The suspect B','The suspect C','Not Sure']],
  ['Who is the most suspicious suspect?', ['The brother','The counter','The chef','The wife']],
  ['Who is the most suspicious suspect?', ['The servant', 'The ambassador from the East Realm','The son of the lord']],
  ['What kinds of symptoms is least likely to occur in the patient with disease X?', ['Blood Cancer','Bone broke','Heart Disease','Stroke']],
  ['Choose the best statement describing the presented chemicals.', ['Acrylamide was proven to lead to neural damage and cancer in humans','Ethanol in alcohol can make damage human body cells and it is related to cancer as well.','Acetaldehyde is created by micro- organisms during the process of frying.','Common mycotoxins including Aflatoxins, Ochratoxin A or Patulin or Fusarium  etc. seldom affect wheat-made products.']],
  ['What kind of disaster is most likely to happen if the situation of the rising sea level continues?', ['Landslides','Stringer typhoon or hurricane','drought','Wildfires']],
]

/**
 * 
 * @param {number} scene_id 
 * @param {number} scene_type_id 
 * @return {Question} End Game Question 
 */
export function get_scene_endgame_survey_question(scene_id, scene_type_id) {
  return SCENE_SURVEY_QUESTION_LIST[calc_scene_idx_fn(scene_id, scene_type_id)]
}