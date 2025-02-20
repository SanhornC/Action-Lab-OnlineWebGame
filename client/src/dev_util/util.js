export const DEV_FLAG_KEY_NAME = "dev_flag";

export function get_developer_mode_flag() {
  const opt = localStorage.getItem(DEV_FLAG_KEY_NAME);
  return opt != undefined && opt == "1";
}
