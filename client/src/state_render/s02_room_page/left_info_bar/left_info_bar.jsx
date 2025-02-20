import "./left_info_bar.css";

/**
 *
 * @param {{scene_idx: number, scene_state_idx: number}} params
 * @returns
 */
export function LeftInfoNavJSX({ scene_idx, scene_state_idx }) {
  return (
    <div className="info_container">
      <div className="room_info_container">
        <div className="room_info">
          <p className="room_info_title">Scene Index:</p>
          <p className="room_info_text">{scene_idx}</p>
        </div>
        <div className="room_info">
          <p className="room_info_title">{"[Dev]: scene state index:"}</p>
          <p className="room_info_text">{scene_state_idx}</p>
        </div>
      </div>
    </div>
  );
}
