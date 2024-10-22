import React from "react";
import TournamentBracket from "./TournamentBracket";


const BracketContainer = ({ groups }) => {
  return (
    <div className="bracket-container">
      {groups.map((group, index) => (
        <TournamentBracket key={index} group={group} />
      ))}
    </div>
  );
};

export default BracketContainer;
