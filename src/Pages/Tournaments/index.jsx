import React, { useState } from "react";
import Button from "../../Components/Buttons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../Tournament/style.css";
import { getAllTorunaments } from "../../Service/Tournament";
import { useNavigate } from "react-router-dom";
const Tournaments = () => {
  const navigate = useNavigate();
  const [ data, setData ] = useState([]);

  const handleButtonClick = (id) => {
    navigate("/tournament/" + id);
  };
  const geTournaments = async () => {
    try {
      let req = await getAllTorunaments();
      //  console.log("sob", req);
      setData(req.data);
    } catch (e) {
      console.log("e", e);
    }
  };

  React.useEffect(() => {
    geTournaments();
  }, []);
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <div className="flex flex-col">Acompanhe aqui todos os eventos</div>
      <div className="w-full h-100 flex-col flex items-center juystify-center max-w-[80%] bg-[whitesmoke] p-4 rounded-[5px]">
        <p className="w-full items-start p-4 text-[22px] ">Torneios abertos</p>
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
    </div>
  );
};

export default Tournaments;
