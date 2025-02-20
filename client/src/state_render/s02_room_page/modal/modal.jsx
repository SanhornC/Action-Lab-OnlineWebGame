import "./modal.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const MT_NONE_IDX = 0;
export const MT_INTRODUCTION_IDX = 1;
export const MT_CARD_DETAIL_IDX = 2;
export const MT_FEEDBACK_IDX = 3;
export const MT_MIDGAME_SURVEY_IDX = 4;
export const MT_ENDGAME_SURVEY_IDX = 5;
export const MT_END_IDX = 6;

export class ModalState {
  /**@type {number} */
  modal_type_number;

  data;

  constructor(modal_type_number, data) {
    this.modal_type_number = modal_type_number;
    this.data = data;
  }
}

function CardModalJSX({ title, children, handle_close_fn, handle_play_fn }) {
  return (
    <Modal
      show={true}
      onHide={handle_close_fn}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="card_modal_body">
        {children}
        <div className="card_modal_button_container">
          <Button
            className="card_modal_button card_modal_button_close"
            onClick={handle_close_fn}
          >
            Back
          </Button>
          {handle_play_fn && (
            <Button
              className="card_modal_button card_modal_button_play"
              onClick={handle_play_fn}
            >
              Play
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function ModalComponentJSX({ close_modal_fn, title, children }) {
  return (
    <Modal
      show={true}
      onHide={close_modal_fn}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close_modal_fn}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

/**
 *
 * @param {{modal_state: ModalState, close_modal_fn: () => {}}} param0
 */
export function RoomModalJSX({ modal_state, close_modal_fn }) {
  const modal_type_number = modal_state.modal_type_number;

  if (modal_type_number == MT_INTRODUCTION_IDX) {
    /**@type {{scene_description_string: string}} */
    const { scene_description_string } = modal_state.data;
    return (
      <ModalComponentJSX
        close_modal_fn={close_modal_fn}
        title="Game Description"
      >
        <div style={{ fontSize: "15px" }}>
          {scene_description_string.split("<br>").map((line, index) => (
            <div key={index} style={{ marginLeft: 20 }}>
              {line}
            </div>
          ))}
        </div>
      </ModalComponentJSX>
    );
  } else if (modal_type_number == MT_CARD_DETAIL_IDX) {
    /**@type {selected_card: Card} */
    const { selected_card, title, play_card_fn } = modal_state.data;

    return (
      <CardModalJSX
        handle_close_fn={close_modal_fn}
        handle_play_fn={play_card_fn}
        title={title}
      >
        <p>{selected_card.description_string}</p>
      </CardModalJSX>
    );
  } else {
    return <></>;
  }
}
