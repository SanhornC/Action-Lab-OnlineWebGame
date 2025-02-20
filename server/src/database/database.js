import { resolve } from "path";
import { query } from "../config.js";

const DB_PLAYER_COUNT_KEY_STRING = "player_count";
const DB_ROOM_COUNT_KEY_STRING = "room_count";

/**
 * # Get the number, or count, of all recorded players and created rooms.
 */
export function get_total_player_and_room_num() {
  // return query("SELECT * FROM server_state;").then((res) => {
  //   /**@type {{ key: string, value: string }[]} */
  //   const variables_list = res;
  //   const ans = {};
  //   for (let i = 0; i < variables_list.length; ++i) {
  //     const { key, value } = variables_list[i];
  //     if (key == DB_PLAYER_COUNT_KEY_STRING) {
  //       ans.player_count_number = Number(value);
  //     } else if (key == DB_ROOM_COUNT_KEY_STRING) {
  //       ans.room_count_number = Number(value);
  //     }
  //   }

  //   if (
  //     ans.player_count_number == undefined ||
  //     ans.room_count_number == undefined
  //   ) {
  //     throw Error("ServerState not initialized correctly.");
  //   }
  //   ans[DB_PLAYER_COUNT_KEY_STRING] = 0;
  //   ans[DB_ROOM_COUNT_KEY_STRING] = 0;
  //   return ans;
  // });

  return new Promise((res) => {
    /**@type {{ key: string, value: string }[]} */
    // const variables_list = res;
    const ans = {};
    // for (let i = 0; i < variables_list.length; ++i) {
    //   const { key, value } = variables_list[i];
    //   if (key == DB_PLAYER_COUNT_KEY_STRING) {
    //     ans.player_count_number = Number(value);
    //   } else if (key == DB_ROOM_COUNT_KEY_STRING) {
    //     ans.room_count_number = Number(value);
    //   }
    // }

    // if (
    //   ans.player_count_number == undefined ||
    //   ans.room_count_number == undefined
    // ) {
    //   throw Error("ServerState not initialized correctly.");
    // }
    ans[DB_PLAYER_COUNT_KEY_STRING] = 0;
    ans[DB_ROOM_COUNT_KEY_STRING] = 0;
    return ans;
  });
  
}

// Table: serverstate, Variables: player count, room count
/**
 * # Save player information to database.
 */
export function save_player_info_to_database() {}

/**
 * # Save room and game information to database.
 */
export function save_room_and_game_info_to_databse() {}
