import { TotalStateSer } from "../../common/state_ser";
import { CardJSX } from "./card/card";
import Modal from "react-bootstrap/Modal";
import { AllSharedCardsJSX } from "./all_shared_cards/all_shared_cards";
import { LeftInfoNavJSX } from "./left_info_bar/left_info_bar";

/**
 *
 * @param {{total_state_ser: TotalStateSer }} param
 * @returns
 */
export function R1WaitRoomStateJSX({ total_state_ser }) {
  if (total_state_ser.room_opt == undefined) {
    throw Error("When in RoomJSX, `room_opt` shouldn't be undefined...");
  }
  const room = total_state_ser.room_opt;
  const cards = room.scene_data.available_cards;

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
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Waiting...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Waiting for other players...</Modal.Body>
      </Modal>
    </main>
  );
}
