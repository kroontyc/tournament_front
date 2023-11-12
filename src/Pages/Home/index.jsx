import React from "react";
import "./style.css";
import Button from "../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  return (
    <div className="bg-style h-[100%] flex flex-col">
      <div className="text-size w-[90%] flex items-end justify-end">
        <div
          className="text w-[556px] p-[12px]"
          style={{ backdropFilter: "blur(20px)", borderRadius: "10px" }}
        >
          <div className="w-[80%] mt-[54px] items-end flex justify-end text-white">
            <h1 className="title">Software para torneios</h1>
          </div>
          <div className="mt-[40px] flex w-[90%] items-end justify-end flex-col color-white text-white">
            <p>Peki - Go é um software para gestão e controle de torneios</p>
            <p>Crie, Acompanhe e atualize Resultados</p>
          </div>
          <div className="w-[30%] m-auto mt-[30px] justify-end flex items-end">
            <Button
              text={"Registrar Torneio"}
              background={"#5bb65b"}
              color={"#fff"}
              icon={faPlus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
