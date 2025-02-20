import * as react_mod from "react";

import {
  PageState,
  ServerConnection,
} from "../../server_connection/server_connection.js";
import * as player_state_consts_mod from "../../common/player_state_consts.js";

import { DevContainer, DevElem } from "../../dev_util/dev_elem.jsx";

import { InstructionPage } from "../../state_render/s00_instruction_page/instruction.jsx";
import { WaitingPage } from "../../state_render/s01_waiting_page/waiting.jsx";
import { RoomJSX } from "../../state_render/s02_room_page/room.jsx";

/**
 * # Player Page "/player/:player_id"
 *
 * @author {Zhifeng Wang}
 *
 * @returns {react_mod.JSX}
 */
export function PlayerPage(props) {
  const { player_id } = props.match.params;

  /**
   * @type {[PageState, function]}
   */
  let [page_state, set_page_state_fn] = react_mod.useState();
  let [state_refresh_count, set_state_refresh_count] = react_mod.useState(0);

  /**@type {ServerConnection} */
  const server_connection = window.action_lab.server_connection;

  if (server_connection.init_flag == false) {
    server_connection.init(player_id, set_page_state_fn);
  }

  react_mod.useEffect(() => {
    server_connection.update_set_page_state_fn(
      set_page_state_fn,
      set_state_refresh_count
    );
    server_connection.state_updated();
  }, [page_state]);

  if (page_state == undefined) {
    return <>Loading</>;
  }

  let page_elem = undefined;

  const total_state_ser = page_state.total_state_ser;
  console.log("Refreshing", state_refresh_count);
  if (
    total_state_ser.player_ser.player_state_idx ==
    player_state_consts_mod.PLAYER_STATE_0_INSTRUCTION_PAGE_IDX
  ) {
    page_elem = <InstructionPage />;
  } else if (
    total_state_ser.player_ser.player_state_idx ==
    player_state_consts_mod.PLAYER_STATE_1_WAITING_ROOM_IDX
  ) {
    page_elem = <WaitingPage />;
  } else if (
    total_state_ser.player_ser.player_state_idx ==
    player_state_consts_mod.PLAYER_STATE_2_PLAYING_IDX
  ) {
    page_elem = (
      <RoomJSX
        total_state_ser={total_state_ser}
        server_connection={server_connection}
        update_count={state_refresh_count}
      />
    );
  }
  return (
    <>
      <DevContainer>
        <DevElem
          server_connection={server_connection}
          total_state_ser={total_state_ser}
        />
      </DevContainer>

      {page_elem}
    </>
  );
}
