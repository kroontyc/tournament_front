import React from "react";
import TournamentBracket from "./TournamentBracket";


const BracketContainer = ({ groups, setGroups, currentScores }) => {
  return (
    <div className="bracket-container">
      {groups.map((group, index) => (
        <TournamentBracket key={index} group={group} setGroups={setGroups} currentScores={currentScores}/>
      ))}
    </div>
  );
};

export default BracketContainer;
