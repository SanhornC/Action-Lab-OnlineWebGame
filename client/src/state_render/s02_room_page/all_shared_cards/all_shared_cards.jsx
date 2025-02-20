import "./all_shared_cards.css";

import { Card } from "../../../common/state_ser";

const PLAYER_COLORS_STRING_LIST = ["#41bfb3", "#f27457", "#f2ce1b", "#f2ce1b"]; // Theme colors
const PLAYER_AVATAR_STRING_LIST = ["monkey", "owl", "porcupine", "rabbit"]; // Background images

/**
 * @author {Zhifeng Wang}
 * @param {{
 *  in_scene_player_idx: number;
 * player_shared_card_list: Card[];
 * this_is_me_flag: boolean;
 * view_shared_card_fn: (card: Card, title: string) => {};
 * }} param
 * @returns {import("react").JSX}
 */
function PlayerSharedCardsColJSX({
  in_scene_player_idx,
  player_shared_card_list,
  this_is_me_flag,
  view_shared_card_fn,
}) {
  const player_avatar_string = PLAYER_AVATAR_STRING_LIST[in_scene_player_idx];
  const player_color_string = PLAYER_COLORS_STRING_LIST[in_scene_player_idx];
  const player_name = this_is_me_flag
    ? `You (${player_avatar_string})`
    : player_avatar_string;

  return (
    <div className="shared_card_column">
      <img
        src={`/sprites/${player_avatar_string}.png`}
        className="player_avatar"
      />
      <p className="player_header">{player_name}</p>
      <div className="player_card_container">
        {player_shared_card_list.map((card, card_idx) => (
          <div
            key={card_idx}
            className="shared_card"
            style={{
              border: `0.5rem solid ${player_color_string}`,
            }}
            onClick={() => {
              view_shared_card_fn(card, player_name);
            }}
          >
            {card_idx == player_shared_card_list.length - 1 && (
              <div className="new_badge">NEW</div>
            )}
            <p className="shared_card_content">{card.tag_0_string}</p>
            <p className="shared_card_content">{card.tag_1_string}</p>
            <p className="shared_card_content">{card.tag_2_string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * @author {Zhifeng Wang} to blame
 * @param {{
 *  all_player_shared_cards_list: Card[][];
 *  my_in_scene_player_idx: number;
 *  view_shared_card_fn: (card: Card, title: string)=>{}
 * }} param
 *
 * @returns
 */
export function AllSharedCardsJSX({
  all_player_shared_cards_list,
  my_in_scene_player_idx,
  view_shared_card_fn,
}) {
  return (
    <div className="shared_cards_container">
      {all_player_shared_cards_list.map((card_list, in_scene_player_idx) => (
        <PlayerSharedCardsColJSX
          key={in_scene_player_idx}
          in_scene_player_idx={in_scene_player_idx}
          player_shared_card_list={card_list}
          this_is_me_flag={my_in_scene_player_idx == in_scene_player_idx}
          view_shared_card_fn={view_shared_card_fn}
        />
      ))}
    </div>
  );
}
