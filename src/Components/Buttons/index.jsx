import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
const Button = (props) => {
  const { width, color, text, background, icon, click, value } = props;
  return (
    <button
      style={{
        width: width,
        background: background,
        color: color,
        fontSize: "14px",
        textShadow: "0 -1px 0 rgba(0,0,0,0.25)",
        borderRadius: "6px",
        lineHeight: "19px",
        fontWeight: "600",
        whiteSpace: "nowrap"
      }}
      value={value}
      onClick={(event) => {
        click ? click(event.target.value) : console.log("");
      }}
      className="p-[15px] btn flex items-center gap-2"
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </button>
  );
};
export default Button;
