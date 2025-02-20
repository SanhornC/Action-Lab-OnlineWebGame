import socket_io_client from "socket.io-client";

import { API_DOMAIN_WS } from "../config";
import * as WS_EVENT_CONSTS_MOD from "../common/ws_event_consts";

import { TotalStateSer } from "../common/state_ser.js";

export class PageState {
  /**c {TotalStateSer} */
  total_state_ser;

  /**@type {number} */
  update_count;
}

/**
 * # Server Connection
 * @author {Zhifeng Wang}
 */
export class ServerConnection {
  player_id;
  /**@type {PageState} */
  page_state;

  /**@type {function} */
  set_state_fn;

  refresh_fn;

  /**@type {boolean} */
  needs_update_flag = false;

  init_flag = false;

  constructor() {}

  /**
   * @author {Zhifeng Wang}
   * @param {number} player_id
   * @param {function} set_page_state_fn
   *
   */
  init(player_id, set_page_state_fn) {
    this.init_flag = true;
    console.log("Building Server Connection");
    this.socket_mut_ref = socket_io_client(API_DOMAIN_WS, {
      query: { player_id },
    });

    this.player_id = player_id;
    this.set_page_state_fn = set_page_state_fn;
    this.socket_mut_ref.emit(
      WS_EVENT_CONSTS_MOD.WS_EVENT_C_TO_S_GET_STATE_NAME
    );

    this.socket_mut_ref.on(
      WS_EVENT_CONSTS_MOD.WS_EVENT_S_TO_C_SET_CLIENT_STATE,
      (total_state_ser_from_server) => {
        this.needs_update_flag = true;
        if (this.page_state == undefined) {
          this.page_state = { update_count: 0 };
        }
        this.page_state.total_state_ser = total_state_ser_from_server;
        this.page_state.update_count += 1;

        console.log("Updating client state: ", this.page_state);

        if (this.set_page_state_fn != undefined) {
          this.set_page_state_fn({ ...this.page_state });
        }
      }
    );
  }

  /**
   * @author {Zhifeng Wang}
   * @param {function} set_page_state_fn
   */
  update_set_page_state_fn(set_page_state_fn) {
    this.set_page_state_fn = set_page_state_fn;
    if (this.needs_update_flag == true) {
      this.needs_update_flag = false;
      set_page_state_fn(this.page_state);
    }
  }

  state_updated() {
    this.needs_update_flag = false;
  }

  /**
   * @author {Zhifeng Wang}
   * @param {number} action
   */
  play_test_ping_pong(action) {
    this.socket_mut_ref.emit(
      WS_EVENT_CONSTS_MOD.WS_EVENT_C_TO_S_PLAY_TEST_PING_PONG,
      action
    );
  }

  player_go_next(data) {
    this.socket_mut_ref.emit(WS_EVENT_CONSTS_MOD.WS_EVENT_C_TO_S_GO_NEXT, data);
  }

  /**
   * @author {Zhifeng Wang}
   * @returns {PageState} Page State
   */
  get_page_state() {
    this.needs_update_flag = false;
    return this.page_state;
  }
}
