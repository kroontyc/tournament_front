import React, { useEffect, useState } from "react";
import { byId } from "../../../../Service/Ranking";
import { Loading } from "../../../../Components/Loading";

export const TeamRanking = () => {
  const [inFetch, setInFetch] = useState(false);
  const [teams, setTeams] = useState([]);
  const getAllTeams = async () => {
    setInFetch(true);
    const id = window.location.pathname.split("/")[3];
    let req = await byId(id);
    setTeams(req);
    setInFetch(false);
  };

  useEffect(() => {
    getAllTeams();
  }, []);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        {inFetch ? (
          <Loading />
        ) : teams && teams.length ? (
          teams.map((team, key) => (
            <div
              key={key}
              className="border border-2 rounded-[4px] border-[#ededed] p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            >
              <div className="flex flex-col">
                <p className="text-sm text-[#656060dd]">Equipe:</p>
                <p>{team.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-[#656060dd]">Pontuação:</p>
                <p>{team.points}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não ha times cadastrados neste evento</p>
        )}
      </div>
    </div>
  );
};
