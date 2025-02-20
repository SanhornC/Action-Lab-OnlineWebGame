import express from "express";
import { global_logger } from "../../config.js";
import { server_state } from "../../index.js";

const logger = global_logger.make_local_logger("http:/go_next_player_state");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function go_next_player_state_endpoint_post_handler_fn(req, res) {
  logger.log("hit");
  const player_id = req.body.player_id;
  const player_state_ref = server_state.get_player_state(player_id);
  player_state_ref.next();
  res.send(player_state_ref.to_json());
}
