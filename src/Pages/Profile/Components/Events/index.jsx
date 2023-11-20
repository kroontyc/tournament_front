import React from "react";
import Button from "../../../../Components/Buttons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../style.css";
const Events = ({ data }) => {
  const navigate = useNavigate();
  const handleButtonClick = (id) => {
    navigate("/tournament/" + id);
  };
  const handleEditBtn = (id) => {
    navigate("/tournament/edit/" + id);
  };
  return (
    <div className="w-full h-100">
      {data &&
        data.length > 0 && (
          <div className="w-full h-100 flex flex-col items-center bg-white">
            {data.map((value) => (
              <div className="card p-2 w-full border border-1  grow flex justify-between items-center">
                <div className="">
                  <p
                    className="title-card"
                    onClick={() => {
                      handleButtonClick(value.id);
                    }}
                  >
                    {value.name}
                  </p>
                  <div className="flex  flex-col">
                    <p className="mt-2" style={{ marginBlock: "0px" }}>
                      R${value.data}
                    </p>
                    <p className="mt-2" style={{ marginBlock: "0px" }}>
                      R${value.reward}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-[50px] h-[40px]"
                    src="https://static.todamateria.com.br/upload/ba/nd/bandeiradobrasil-2-cke.jpg"
                    alt="br"
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
