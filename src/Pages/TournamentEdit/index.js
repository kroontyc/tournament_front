import React, { useState } from "react";

import { byId } from "../../Service/Tournament";
import AddParticipants from "./Components/AddParticipants";
import EditParticipants from "./Components/EditParticipants";
import Keys from "./Components/Keys";

const EditTournament = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("ADD");
  const getTournamentById = async (id) => {
    try {
      let req = await byId(id);
      setData({ data: req.data[0], user: req.user[0] });
      if (req) {
        console.log("asa", req);
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
      <div className="mt-10">
        {data &&
        data.data && (
          <div>
            <h1 className="title">{data.data.name}</h1>
            <p className="sub-title">{data.data.federation}</p>
            <div className="mt-10 flex items-center gap-10">
              <div
                onClick={() => {
                  setTab("ADD");
                }}
                className={
                  tab === "ADD" ? (
                    "text-blue-500 underline cursor-pointer"
                  ) : (
                    " cursor-pointer"
                  )
                }
              >
                Adicionar Participantes
              </div>
              <div
                onClick={() => {
                  setTab("EDIT");
                }}
                className={
                  tab === "EDIT" ? (
                    "text-blue-500 underline cursor-pointer"
                  ) : (
                    " cursor-pointer"
                  )
                }
              >
                Editar Participantes
              </div>

              <div
                onClick={() => {
                  setTab("KEY");
                }}
                className={
                  tab === "KEY" ? (
                    "text-blue-500 underline cursor-pointer"
                  ) : (
                    " cursor-pointer"
                  )
                }
              >
                Chaves
              </div>
            </div>

            <div>
              {tab === "ADD" && <AddParticipants />}
              {tab === "EDIT" && <EditParticipants />}
              {tab === "KEY" && <Keys />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTournament;
