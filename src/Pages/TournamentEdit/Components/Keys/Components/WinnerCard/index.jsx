import React from "react";

const WinnerCard = ({ name, team, index, notColor }) => {
  return (
    <div>
      <div className="w-full flex   items-center  cursor-pointer min-h-[40px] min-w-[300px] border hover-card flex items-center">
        <div className="w-[10px] h-[40px] bg-yellow-500" />
        <div className="flex flex-col ml-4">
          <div className="flex items-center justify-between">
            <p className="lower-title  truncate">{name}</p>
            <p className="lower-title  truncate">Vencedor</p>
          </div>
          <div className="flex  justify-between items-center">
            <p className="lower-title  truncate">{team}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
