// Initialize logger
import {
  DB_HOST,
  DB_USER,
  PORT,
  global_logger,
  curr_process,
} from "./config.js";
const logger = global_logger.make_local_logger("Root");

// Initialize express
import express from "express";
import cors from "cors";
export const express_app = express();
express_app.use(
  cors({
    origin: "*",
  })
);

express_app.use(express.json()); // This enables Express to parse incoming requests with JSON payloads

// Debugging Environment Variables
logger.log(`Node.js App Running on Port: ${PORT}`);
logger.log(`Database Host: ${DB_HOST}`);
logger.log(`Database User: ${DB_USER}`);

import http from "http";
import { Server } from "socket.io";

export const http_server = http.createServer(express_app);
export const socket_server = new Server(http_server, {
  cors: {
    origin: "*",
  },
});

// Invoking API requests
import { new_player_join_endpoint_post_handler_fn } from "./handler/http/new_player_join.js";
import { get_player_state_endpoint_get_handler_fn } from "./handler/http/get_player_state.js";
import { go_next_player_state_endpoint_post_handler_fn } from "./handler/http/go_next_player_state.js";

express_app.post(
  API_HTTP_NEW_PLAYER_JOIN_ENDPOINT,
  new_player_join_endpoint_post_handler_fn
);
express_app.get("/get_player_state", get_player_state_endpoint_get_handler_fn);
express_app.post(
  "/go_next_player_state",
  go_next_player_state_endpoint_post_handler_fn
);

http_server.listen(PORT, () => logger.log(`Listening on port ${PORT}`));

// Initialize Server State
import { ServerState } from "./server_state.js";
import {
  WS_EVENT_C_TO_S_GET_STATE_NAME,
  WS_EVENT_S_TO_C_SET_CLIENT_STATE,
} from "./common/ws_event_consts.js";

import { API_HTTP_NEW_PLAYER_JOIN_ENDPOINT } from "./common/http_endpoints_consts.js";
import { add_ws_handler_to_ws_c_to_s_text_ping_pong_event } from "./handler/ws/play_test_ping_pong.js";
import { add_ws_handler_of_ws_c_to_s_player_go_next_event } from "./handler/ws/player_go_next.js";

export const server_state = new ServerState();

function init_socket_server(socket_server) {
  socket_server.on("connection", async (client_socket) => {
    const { player_id: player_id_string } = client_socket.handshake.query;
    const player_id = Number.parseInt(player_id_string);
    logger.log(`Player ${player_id} connected with web socket.`);
    const player_ref = server_state.get_player_state_ref_from_id(
      player_id
    );
    if (player_ref != undefined) {
      player_ref.socket_connected(client_socket);
    }
    client_socket.on(WS_EVENT_C_TO_S_GET_STATE_NAME, () => {
      client_socket.emit(
        WS_EVENT_S_TO_C_SET_CLIENT_STATE,
        server_state.get_player_total_state(player_id)
      );
    });

    add_ws_handler_to_ws_c_to_s_text_ping_pong_event(
      player_id,
      client_socket,
      server_state
    );

    add_ws_handler_of_ws_c_to_s_player_go_next_event(
      player_id,
      client_socket,
      server_state
    )

    client_socket.emit(
      WS_EVENT_S_TO_C_SET_CLIENT_STATE,
      server_state.get_player_total_state(player_id)
    );
  });
}

init_socket_server(socket_server);

function graceful_shutdown() {
  logger.log("Shutting down"); // Seems to be not working
}

curr_process.on("SIGINT", graceful_shutdown);
curr_process.on("SIGTERM", graceful_shutdown);
curr_process.on("SIGUSR2", graceful_shutdown);
