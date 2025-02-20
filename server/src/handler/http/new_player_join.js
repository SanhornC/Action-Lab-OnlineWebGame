import express from "express";
import { global_logger } from "../../config.js";
import { server_state } from "../../index.js";

const logger = global_logger.make_local_logger("http:/new_player_join");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function new_player_join_endpoint_post_handler_fn(req, res) {
  logger.log("hit");
  const new_player = server_state.add_player();

  res.send(new_player.make_player_state_ser());
}
