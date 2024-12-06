import React, { useEffect, useState } from "react";
import { byId } from "../../../../Service/Ranking";
import { Loading } from "../../../../Components/Loading";

export const TeamRanking = () => {
  const [inFetch, setInFetch] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamPoints, setTeamPoints] = useState({});

  const getAllTeams = async () => {
    setInFetch(true);
    const id = window.location.pathname.split("/")[3];
    const req = await byId(id);
    setTeams(req);

    const points = {};
    req.forEach((team) => {
      const storedPoints = localStorage.getItem(`${team.name.toUpperCase()}`);
      points[team.name] = storedPoints ? parseInt(storedPoints, 10) : 0;
    });
    setTeamPoints(points);

    setInFetch(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const points = {};
      teams.forEach((team) => {
        const storedPoints = localStorage.getItem(`${team.name.toUpperCase()}`);
        points[team.name] = storedPoints ? parseInt(storedPoints, 10) : 0;
      });
      setTeamPoints(points);
    }, 2000);

    return () => clearInterval(interval);
  }, [teams]);

  const getSortedTeams = () => {
    return [...teams].sort((a, b) => {
      const pointsA = teamPoints[a.name] || 0;
      const pointsB = teamPoints[b.name] || 0;
      return pointsB - pointsA;
    });
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  const randomUrls = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
    "https://picsum.photos/200/300?random=7",
    "https://picsum.photos/200/300?random=8",
    "https://picsum.photos/200/300?random=9",
    "https://picsum.photos/200/300?random=10",
    "https://picsum.photos/200/300?random=11",
    "https://picsum.photos/200/300?random=12",
    "https://picsum.photos/200/300?random=13",
    "https://picsum.photos/200/300?random=14",
    "https://picsum.photos/200/300?random=15",
    "https://picsum.photos/200/300?random=16",
    "https://picsum.photos/200/300?random=17",
    "https://picsum.photos/200/300?random=18",
    "https://picsum.photos/200/300?random=19",
    "https://picsum.photos/200/300?random=20",
    "https://picsum.photos/200/300?random=21",
    "https://picsum.photos/200/300?random=22",
    "https://picsum.photos/200/300?random=23",
    "https://picsum.photos/200/300?random=24",
    "https://picsum.photos/200/300?random=25",
    "https://picsum.photos/200/300?random=26",
    "https://picsum.photos/200/300?random=27",
    "https://picsum.photos/200/300?random=28",
    "https://picsum.photos/200/300?random=29",
    "https://picsum.photos/200/300?random=30",
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        {inFetch ? (
          <Loading />
        ) : teams && teams.length ? (
          getSortedTeams().map((team, key) => (
            <div
              key={key}
              className="border border-2 rounded-[4px] border-[#ededed] p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src={randomUrls[key]} // Obtém uma URL aleatória
                    alt="team-logo"
                    className="w-12 h-12  rounded-full border border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-[#656060dd]">Equipe:</p>
                  <p>{team.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-[#656060dd]">Pontuação:</p>
                <p>{teamPoints[team.name] || 0}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há times cadastrados neste evento</p>
        )}
      </div>
    </div>
  );
};
