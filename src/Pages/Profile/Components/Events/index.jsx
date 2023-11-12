import React from "react";
import Button from "../../../../Components/Buttons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const Events = ({ data }) => {
  return (
    <div className="w-full h-100">
      {data &&
      data.length > 0 && (
        <div className="w-full h-100 flex flex-wrap gap-10 p-5">
          {data.map((value) => (
            <div className="card p-5 w-96 border border-1 rounded-[6px] grow">
              <p>{value.name}</p>
              <div className="flex items-center gap-10 justify-end">
                <p className="mt-2">R${value.data}</p>
                <p className="mt-2">R${value.reward}</p>
              </div>
              <div className="w-100 mt-2 flex items-end justify-end">
                <Button
                  text={"Ver evento"}
                  background={"#006ccc"}
                  color={"#fff"}
                  icon={faEye}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
