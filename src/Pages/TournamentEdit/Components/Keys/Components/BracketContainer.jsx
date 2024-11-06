import React from "react";
import TournamentBracket from "./TournamentBracket";


const BracketContainer = ({ groups, setGroups, currentScores, isView }) => {
  return (
    <div className="bracket-container">
      {groups.map((group, index) => (
        <TournamentBracket key={index} group={group} setGroups={setGroups} currentScores={currentScores} isView={isView}/>
      ))}
    </div>
  );
};

export default BracketContainer;
