import * as react_mod from "react";
import * as room_scene_state_consts_mod from "../../common/room_state_const.js";

import "./room.css";

import { TotalStateSer } from "../../common/state_ser";
import { ServerConnection } from "../../server_connection/server_connection.js";
import { R0WarmupRoomJSX } from "./r0_warmup_room_state.jsx";
import { R2PlayingRoomStateJSX } from "./r2_playing_room_state.jsx";
import { R1WaitRoomStateJSX } from "./r1_wait_room_state.jsx";
/**
 *
 * @param {{total_state_ser: TotalStateSer, server_connection: ServerConnection }} param
 * @returns
 */
export function RoomJSX({ total_state_ser, server_connection }) {
  if (total_state_ser.room_opt == undefined) {
    throw Error("When in RoomJSX, `room_opt` shouldn't be undefined...");
  }

  const room = total_state_ser.room_opt;
  if (room.player_completed_curr_step == true) {
    return <R1WaitRoomStateJSX total_state_ser={total_state_ser} />;
  } else if (
    room.room_scene_state_idx == room_scene_state_consts_mod.RS_SCENE_WARMUP_IDX
  ) {
    return (
      <R0WarmupRoomJSX
        total_state_ser={total_state_ser}
        server_connection={server_connection}
      />
    );
  } else {
    return (
      <R2PlayingRoomStateJSX
        total_state_ser={total_state_ser}
        server_connection={server_connection}
        round_idx={total_state_ser.room_opt.room_scene_state_idx}
      />
    );
  }
}
