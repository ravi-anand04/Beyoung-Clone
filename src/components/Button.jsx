import React from "react";

const Button = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${props.classes} `}
    >
      {props.children}
    </button>
  );
};

export default Button;
