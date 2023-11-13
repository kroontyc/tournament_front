import React from "react";

const Fighter = ({ data }) => {
  return (
    <div className="w-full flex flex-col border  p-1 cursor-pointer hover-card">
      <p className="lower-title  truncate">{data.first_fighter_name}</p>
      <div className="flex justify-between items-center">
        <p className="lower-title  truncate">{data.first_fighter_brand}</p>
        <p className="lower-title  truncate">{data.first_fighter_categorie}</p>
      </div>
    </div>
  );
};

export default Fighter;
