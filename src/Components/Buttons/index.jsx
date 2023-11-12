import React from "react";

const Button = (props) => {
  const { width, color text } = props;
  return (
     <button style={{ width: width, color: color }}>
        {{text}}
     </button>
  );
};
export default Button;
