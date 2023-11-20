import React, { useState } from "react";

import { byId } from "../../Service/Tournament";
import AddParticipants from "./Components/AddParticipants";
import Categories from "./Components/Categories";
import EditParticipants from "./Components/EditParticipants";
import Keys from "./Components/Keys";
const options = [
  "Adicionar participantes",
  "Editar participantes",
  "Categorias",
  "Chaves"
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
    <div className="w-full p-[14px] items-center justify-center mt-[40px] flex flex-col">
      <div className="w-full">
        {data &&
        data.data && (
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
      <div className="bg-[#eeeeee] h-[80px] w-full mb-10 flex gap-10 items-center">
        {options.map((value) => (
          <p
            class="me-2"
            onClick={() => {
              setTab(value);
            }}
          >
            <a
              href="#"
              aria-current="page"
              class={`
                inline-block p-4 ${value === tab
                  ? "text-white bg-blue-300"
                  : "  rounded-t-lg active "}
                `}
            >
              {value}
            </a>
          </p>
        ))}
      </div>
      <div className="mt-10 w-full">
        {data &&
        data.data && (
        
            <div className="w-full">
              {tab === "Adicionar participantes" && <AddParticipants />}
              {tab === "Editar participantes" && <EditParticipants />}
              {tab === "Chaves" && <Keys />}
              {tab === "Categorias" && <Categories data={data}/>}
            </div>
          
        )}
      </div>
    </div>
  );
};

export default EditTournament;
