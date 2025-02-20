import { ServerConnection } from "../server_connection/server_connection";

import "./dev.css";
import { get_developer_mode_flag } from "./util";

export function DevContainer({ children }) {
  return (
    get_developer_mode_flag() && (
      <section id="$dev_container">
        <h2>Developer Utility</h2>
        {children}
      </section>
    )
  );
}

/**
 *
 * @param {{server_connection: ServerConnection}} params
 * @returns
 */
export function DevElem({ total_state_ser, server_connection }) {
  return (
    <section className="self_test_ping_pong">
      <button
        onClick={() => {
          server_connection.player_go_next({ dev_flag: true });
        }}
      >
        Player go next
      </button>
      <h2>Self Test Ping Pong</h2>
      <button
        onClick={() => {
          server_connection.play_test_ping_pong({
            action: Math.floor(Math.random() * 360),
            play_in_room_flag: false,
          });
        }}
      >
        Play Self Test Ping Pong
      </button>
      <button
        onClick={() => {
          server_connection.play_test_ping_pong({
            action: Math.floor(Math.random() * 360),
            play_in_room_flag: true,
          });
        }}
      >
        Play Room Test Ping Pong
      </button>
      <ol className="self_test_ping_pong_list">
        {total_state_ser.player_ser.test_ping_pong_list
          .map((elem, i) => {
            return (
              <li
                key={i}
                style={{
                  color: `hsl(${(elem + 180) % 360},50%,50%)`,
                  backgroundColor: `hsl(${elem},50%,50%)`,
                }}
              >
                {elem}
              </li>
            );
          })
          .reverse()}
      </ol>
    </section>
  );
}
