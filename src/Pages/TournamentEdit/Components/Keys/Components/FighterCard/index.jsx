import React from "react";

const Fighter = ({ data, index }) => {
  return (
    <div className="w-full flex  border items-center  cursor-pointer hover-card min-h-[40px] min-w-[300px]">
      <div
        className={
          index ? index % 2 == 0 ? (
            "w-[10px] h-[40px] bg-red-500"
          ) : (
            "w-[10px] h-[40px] bg-blue-500"
          ) : (
            "w-[10px] h-[40px] bg-red-500"
          )
        }
      />
      <div className="flex flex-col ml-4">
        <p className="lower-title  truncate">{data.first_fighter_name}</p>
        <div className="flex  justify-between items-center">
          <p className="lower-title  truncate">{data.first_fighter_brand}</p>
          <p className="lower-title  truncate">
            {data.first_fighter_categorie}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fighter;
