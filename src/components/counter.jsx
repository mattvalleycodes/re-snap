import React from "react";
import PropTypes from "prop-types";
import classname from "classd";

const Counter = (props) => {
  const classes = classname`counter ${props.className}`;
  const message = props.cards ? `${props.cards} cards left!` : "No card left!";

  return <div className={classes}>{message}</div>;
};

Counter.propTypes = {
  cards: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Counter.defaultProps = {
  className: null,
};

export default Counter;
