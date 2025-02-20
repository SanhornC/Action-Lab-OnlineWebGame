import express from "express";
import { global_logger } from "../../config.js";
import { server_state } from "../../index.js";

const logger = global_logger.make_local_logger("http:/get_player_state");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function get_player_state_endpoint_get_handler_fn(req, res) {
  logger.log("hit");
  const player_id = Number.parseInt(req.query.player_id);
  const player_full_state =
    server_state.get_player_full_state_packet(player_id);
  if (player_full_state == undefined) {
    res.sendStatus(400);
    logger.log(`Player with id ${player_id} not found...`);
    return;
  }
  res.send(player_full_state);
}
