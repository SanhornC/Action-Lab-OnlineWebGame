import fs from "fs-extra";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log_file_path = path.join(__dirname, "..", "..", "logs", "app.log");

export class LocalLogger {
  /** @type {string} */
  from_string;
  /**@type {GlobalLogger} */
  global_logger_mut_ref;

  /**
   *
   * @param {string} from_string
   * @param {GlobalLogger} logger_mut_ref
   */
  constructor(from_string, logger_mut_ref) {
    this.from_string = from_string.padStart(30, " ");
    this.global_logger_mut_ref = logger_mut_ref;
  }

  /**
   *
   * @param {string} msg_string
   */
  log(msg_string) {
    this.global_logger_mut_ref.log(this.from_string, msg_string);
  }
}

export class GlobalLogger {
  /** @type {boolean} */
  log_time_flag;
  /** @type {boolean} */
  log_to_defulat_file_flag;

  /**
   *
   * @param {boolean} log_time_flag
   * @param {boolean} log_to_defulat_file_flag
   */
  constructor(log_time_flag, log_to_defulat_file_flag) {
    this.log_time_flag = log_time_flag;
    this.log_to_defulat_file_flag = log_to_defulat_file_flag;
  }

  /**
   *
   * @param {string} from_string
   * @param {string} msg_string
   */
  log(from_string, msg_string) {
    let log_msg;
    if (this.log_time_flag == true) {
      log_msg = `${new Date().toISOString()} ${from_string} - ${msg_string}`;
    } else {
      log_msg = `${from_string} : ${msg_string}`;
    }
    if (this.log_to_defulat_file_flag == true) {
      fs.appendFileSync(log_file_path, log_msg, "utf8");
    } else {
      console.log(log_msg);
    }
  }

  /**
   *
   * @param {string} from_string
   * @returns {LocalLogger}
   */
  make_local_logger(from_string) {
    return new LocalLogger(from_string, this);
  }
}
