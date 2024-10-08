import React from "react";

const Fighter = ({ data, index, notColor }) => {
  return (
    <div className="w-[388px]">
      <div className="w-full flex   items-center  cursor-pointer min-h-[40px] min-w-[300px]">
        {!notColor && (
          <div
            className={
              index
                ? index % 2 == 0
                  ? "w-[10px] h-[40px] bg-red-500"
                  : "w-[10px] h-[40px] bg-blue-500"
                : "w-[10px] h-[40px] bg-red-500"
            }
          />
        )}
        <div className="flex flex-col ml-4">
          <p className="lower-title  truncate">{data.first_fighter_name}</p>
          <div className="flex  justify-between items-center">
            <p className="lower-title  truncate">{data.first_fighter_brand}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fighter;
