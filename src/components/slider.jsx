import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classd";

const Slider = (props) => {
  const [value, setValue] = useState(props.value);
  const classes = classnames`slider ${props.className}`;

  const onChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    props.onChange(props, newValue);
  };

  return (
    <input
      type="range"
      min={props.min}
      max={props.max}
      value={value}
      className={classes}
      onChange={onChange}
    />
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  className: null,
  value: null,
};

export default Slider;
