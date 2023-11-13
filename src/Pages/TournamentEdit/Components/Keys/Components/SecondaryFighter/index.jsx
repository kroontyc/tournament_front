import React from "react";

const SecondFighter = ({ data }) => {
  return (
    <div className="w-full flex flex-col border mt-2  p-1 cursor-pointer hover-card">
      <p className="lower-title  truncate">{data.second_fighter_name}</p>
      <div className="flex justify-between items-center">
        <p className="lower-title  truncate">{data.second_fighter_brand}</p>
        <p className="lower-title  truncate">{data.second_fighter_categorie}</p>
      </div>
    </div>
  );
};

export default SecondFighter;
