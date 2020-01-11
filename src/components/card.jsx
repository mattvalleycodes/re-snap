import React from "react";
import classnames from "classd";
import PropTypes from "prop-types";
import consts from "../consts";

const Card = (props) => {
  if (props.type && !props.rank) {
    throw new Error(
      "Card: type and rank props should be provided together. Rank is missing.",
    );
  }

  if (!props.type && props.rank) {
    throw new Error(
      "Card: type and rank props should be provided together. Type is missing.",
    );
  }

  const isFaceDown = !props.type && !props.rank;

  const classes = classnames`
    card
    ${props.type && `card--${props.type}`}
    ${isFaceDown && "card--face-down"}
    ${!isFaceDown && "card--face-up"}
    ${props.disabled && "card--disabled"}
    ${props.className}
  `;

  const onCardClicked = () => props.onClick && props.onClick(props);

  return (
    <button
      type="button"
      className={classes}
      onClick={onCardClicked}
      disabled={props.disabled}
    >
      {!isFaceDown && props.rank[0].toUpperCase()}
    </button>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(consts.card.types),
  rank: PropTypes.oneOf(consts.card.ranks),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Card.defaultProps = {
  className: null,
  onClick: null,
  rank: null,
  type: null,
  disabled: false,
};

export default Card;
