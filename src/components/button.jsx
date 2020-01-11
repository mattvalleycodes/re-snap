import React from "react";
import PropTypes from "prop-types";
import classnames from "classd";

const Button = (props) => {
  const classes = classnames`
    button
    ${props.disabled && "button--disabled"}
    ${props.className}
  `;

  const onButtonClicked = () => props.onClick(props);

  return (
    <button
      type="button"
      className={classes}
      disabled={props.disabled}
      onClick={onButtonClicked}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  className: null,
};

export default Button;
