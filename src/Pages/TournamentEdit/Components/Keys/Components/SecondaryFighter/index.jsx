import React from "react";

const SecondFighter = ({ data }) => {
  return (
    <div className="w-[388px] flex   items-center  cursor-pointer min-h-[40px]">
      <div className="w-[10px] h-[40px] bg-blue-500" />
      <div className="flex flex-col ml-4">
        <p className="lower-title  truncate">{data.second_fighter_name}</p>
        <div className="flex  justify-between items-center">
          <p className="lower-title  truncate">{data.second_fighter_brand}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondFighter;
