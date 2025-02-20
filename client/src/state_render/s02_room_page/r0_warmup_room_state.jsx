import { TotalStateSer } from "../../common/state_ser";
import { ServerConnection } from "../../server_connection/server_connection";
import { CardJSX } from "./card/card";

import { RoomModalJSX, ModalState } from "./modal/modal";
import { AllSharedCardsJSX } from "./all_shared_cards/all_shared_cards";
import { LeftInfoNavJSX } from "./left_info_bar/left_info_bar";

/**
 *
 * @param {{total_state_ser: TotalStateSer, server_connection: ServerConnection }} param
 * @returns
 */
export function R0WarmupRoomJSX({ total_state_ser, server_connection }) {
  if (total_state_ser.room_opt == undefined) {
    throw Error("When in RoomJSX, `room_opt` shouldn't be undefined...");
  }
  console.log(total_state_ser.room_opt);
  const room = total_state_ser.room_opt;
  const cards = room.scene_data.available_cards;

  const modal_state = new ModalState(1, {
    scene_description_string: room.scene_data.scene_description_string,
  });

  let close_modal_fn = () => {
    server_connection.player_go_next();
  };

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
        />
        <div className="user_cards_container">
          {cards.map((card, idx) => (
            <CardJSX key={idx} card={card}></CardJSX>
          ))}
        </div>
      </div>
      <RoomModalJSX modal_state={modal_state} close_modal_fn={close_modal_fn} />
    </main>
  );
}
