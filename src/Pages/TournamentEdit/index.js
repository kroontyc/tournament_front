import React, { useState } from "react";

import { byId } from "../../Service/Tournament";
import AddParticipants from "./Components/AddParticipants";
import Categories from "./Components/Categories";
import EditParticipants from "./Components/EditParticipants";
import Keys from "./Components/Keys";
import Arenas from "./Components/Arenas";
import Ranking from "./Components/Ranking";
import { TeamRanking } from "./Components/TeamRank";
const options = [
  "Adicionar participantes",
  "Editar participantes",
  "Pontuação",
  "Categorias",
  "Chaves",
  "Arenas",
  "Ranking"
];
const EditTournament = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("Adicionar participantes");
  const getTournamentById = async (id) => {
    try {
      let req = await byId(id);
      setData({ data: req.data[0], user: req.user[0] });
      if (req) {
        //console.log("asa", req);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  React.useEffect(() => {
    let param = window.location.pathname.split("/")[3];

    getTournamentById(param);
  }, []);
  return (
    <div className="w-full  items-center justify-center  flex flex-col">
      <div className="w-full">
        {data && data.data && (
          <div className="general-info w-full p-5 banner">
            <h1
              className="title text-white"
              style={{ backdropFilter: "blur(10px)" }}
            >
              {data.data.name}
            </h1>
            <div className="mt-10 flex items-center justify-center  w-full gap-20">
              <p
                className="text-white"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {data.data.data}
              </p>
              <p
                className="text-white"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {data.data.federation}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#eeeeee] h-[80px] w-full mb-10 flex gap-10 items-center p-[14px]">
        {options.map((value, key) => (
          <p
            key={key}
            className="me-2"
            onClick={() => {
              setTab(value);
            }}
          >
            <a
              href="#"
              aria-current="page"
              className={`
                inline-block p-4 ${
                  value === tab
                    ? "text-white bg-blue-300"
                    : "  rounded-t-lg active "
                }
                `}
            >
              {value}
            </a>
          </p>
        ))}
      </div>
      <div className="mt-2 w-full">
        {data && data.data && (
          <div className="w-full">
            {tab === "Adicionar participantes" && <AddParticipants />}
            {tab === "Editar participantes" && <EditParticipants />}
            {tab === "Pontuação" && <Ranking />}
            {tab === "Chaves" && <Keys owner={data} />}
            {tab === "Categorias" && <Categories data={data} />}
            {tab === "Arenas" && <Arenas data={data} />}
            {tab === "Ranking" && <TeamRanking />}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTournament;
