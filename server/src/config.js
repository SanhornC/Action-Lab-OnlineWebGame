const env = process.env;

export const COMP_PLAYER_LIMIT = env.COMPUTER_PLAYER_LIMIT || "2";
export const DB_DATABASE = env.DB_DATABASE;
export const DB_HOST = env.DB_HOST;
export const DB_PASSWORD = env.DB_PASSWORD;
export const DB_USER = env.DB_USER;
export const PLAYER_LIMIT = env.PLAYER_LIMIT || "4";
export const PORT = env.PORT;
export const ROUND_LIMIT = env.ROUND_LIMIT || "6"; // Default round limit is 6
export const SOCKET_SERVER_URL = env.SOCKET_SERVER_URL;

export const LOG_FILE_FLAG = env.LOG_FILE_FLAG;
export const LOG_TIME_FLAG = env.LOG_TIME_FLAG;

import { createPool } from "mysql2";
import { GlobalLogger } from "./utils/log.js";

// // Serve the React app's build files
// app.use(express.static(path.join(__dirname, "public")));

// // All other requests should be handled by React
// app.get("*", (req: any, res: any) => {
//   logToFile("config.ts", `Serving React app for URL: ${req.url}`);
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

export const DB_CONFIG = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

import util from "util";
export const query = util.promisify(DB_CONFIG.query).bind(DB_CONFIG);

/**
 *
 * @param {string} query_string
 * @param {string[]} values
 * @returns
 */
export async function db_execute(query_string, values) {
  return DB_CONFIG.promise().execute(query_string, values);
}

export const curr_process = process;

export const global_logger = new GlobalLogger(LOG_TIME_FLAG, LOG_FILE_FLAG);

export function calc_timestamp_and_unix_timestamp() {
  const ts = new Date();
  const timestamp = `${ts.toISOString().split("T")[0]} ${
    ts.toTimeString().split(" ")[0]
  }`;
  const unix_timestamp = ts.valueOf().toString();
  return {
    timestamp,
    unix_timestamp,
  };
}
