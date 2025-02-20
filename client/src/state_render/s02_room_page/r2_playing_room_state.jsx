import * as react_mod from "react";

import { TotalStateSer } from "../../common/state_ser";
import { CardJSX } from "./card/card";
import { ModalState, RoomModalJSX } from "./modal/modal";
import { PlayerPlayCardData } from "../../common/state_ser";
import { Card } from "../../common/state_ser";
import { AllSharedCardsJSX } from "./all_shared_cards/all_shared_cards";
import { LeftInfoNavJSX } from "./left_info_bar/left_info_bar";

/**
 *
 * @param {{total_state_ser: TotalStateSer, server_connection: ServerConnection, round_idx: number }} param
 * @returns
 */
export function R2PlayingRoomStateJSX({
  total_state_ser,
  server_connection,
  round_idx,
}) {
  if (total_state_ser.room_opt == undefined) {
    throw Error("When in RoomJSX, `room_opt` shouldn't be undefined...");
  }

  const room = total_state_ser.room_opt;
  const cards = room.scene_data.available_cards;
  /**
   * @type {[ModalState, ({modal_type_number: number, data}) => {}]}
   */
  const [modal_state, set_modal_state] = react_mod.useState(new ModalState(0));

  let close_modal_fn = () => {
    set_modal_state(new ModalState(0));
  };

  /**
   *
   * @param {Card} card
   * @param {string} modal_title
   * @param {boolean} playable_flag
   */
  function view_card_detail(card, modal_title, playable_flag) {
    set_modal_state(
      new ModalState(2, {
        selected_card: card,
        title: modal_title,
        play_card_fn: playable_flag
          ? () => {
              console.log("playing", card);
              server_connection.player_go_next(
                new PlayerPlayCardData(card.in_scene_index)
              );
              close_modal_fn();
            }
          : undefined,
      })
    );
  }

  const all_player_shared_cards_list = room.scene_data.all_player_played_cards;

  return (
    <main className="room_body">
      <LeftInfoNavJSX
        scene_idx={room.room_scene_idx}
        scene_state_idx={room.room_scene_state_idx}
      />
      <div className="cards_container">
        <AllSharedCardsJSX
          all_player_shared_cards_list={all_player_shared_cards_list}
          my_in_scene_player_idx={room.scene_data.in_scene_player_idx}
          view_shared_card_fn={view_card_detail}
        />
        <div className="user_cards_container">
          {cards.map((card, idx) => (
            <CardJSX
              key={idx}
              card={card}
              on_click={() => {
                view_card_detail(card, "Your Card", true);
              }}
              on_play
            ></CardJSX>
          ))}
        </div>
      </div>
      <RoomModalJSX modal_state={modal_state} close_modal_fn={close_modal_fn} />
    </main>
  );
}
