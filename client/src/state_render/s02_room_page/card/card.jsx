/**
 *
 * @param {{card: Card, on_click: () => {}}} param
 * @return {react_mod.JSX}
 */
export function CardJSX({ card, on_click }) {
  return (
    <div className="game_card user_card" onClick={on_click}>
      <div className="game_card_content">
        <p className="game_card_content_text">{card.tag_0_string}</p>
        <p className="game_card_content_text">{card.tag_1_string}</p>
        <p className="game_card_content_text">{card.tag_2_string}</p>
      </div>
    </div>
  );
}
