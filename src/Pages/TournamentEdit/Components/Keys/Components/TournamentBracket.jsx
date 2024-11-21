import React, { useState, useEffect } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import { Modal } from "flowbite-react";

const TournamentBracket = ({ group, setGroups, currentScores, isView }) => {
  const { titulo, regra, participants } = group;
  const STORAGE_KEY_GROUP = `bracketData_${
    window.location.pathname.split("/")[3]
  }_${titulo.replace(/\s+/g, "_")}`;

  const [selectedSeed, setSelectedSeed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [winners, setWinners] = useState({});
  const [rounds, setRounds] = useState([]);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const savedRounds = localStorage.getItem(STORAGE_KEY_GROUP);
    if (savedRounds) {
      setRounds(JSON.parse(savedRounds));
      console.log("Chaves carregadas do localStorage para", titulo);
    } else {
      generateRounds(participants);
    }
  }, [participants]);

  const handleEditWinner = (seedId) => {
    setSelectedSeed(seedId);
    setShowModal(true);
  };

  const handleSelectWinner = (teamIndex) => {
    const roundIndex = parseInt(selectedSeed.split("-")[0]);
    const seedIndex = parseInt(selectedSeed.split("-")[1]) - 1;
    const winner = rounds[roundIndex].seeds[seedIndex].teams[teamIndex];

    // Atualiza o vencedor no estado
    setWinners((prevWinners) => ({
      ...prevWinners,
      [selectedSeed]: teamIndex,
    }));

    // Atualiza imediatamente o rounds com o novo vencedor
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      updatedRounds[roundIndex].seeds[seedIndex].teams = [
        winner,
        { name: "A decidir" },
      ];
      return updatedRounds;
    });

    updateGroupsWithWinner(roundIndex, seedIndex, winner);

    if (roundIndex === rounds.length - 1) {
      const secondPlace =
        rounds[roundIndex].seeds[seedIndex].teams[1 - teamIndex];
      const thirdPlace =
        rounds[roundIndex - 1]?.seeds[0]?.teams[
          winners[`${roundIndex - 1}-1`] === 0 ? 1 : 0
        ];
      const fourthPlace =
        rounds[roundIndex - 1]?.seeds[0]?.teams[
          winners[`${roundIndex - 1}-1`] === 1 ? 0 : 1
        ];
      setPositions({
        winner,
        second: secondPlace,
        third: thirdPlace,
        fourth: fourthPlace,
      });
    }

    setShowModal(false);
  };

  const generateRounds = (currentParticipants) => {
    const newRounds = [];

    if (currentParticipants.length === 1) {
      newRounds.push({
        name: "Vencedor por W.O.",
        seeds: [
          {
            id: "0-1",
            teams: [{ ...currentParticipants[0] }],
            isWO: true,
          },
        ],
      });
      setRounds(newRounds);
      return;
    }

    const numRounds = Math.ceil(Math.log2(currentParticipants.length));
    let currentRoundParticipants = [...currentParticipants];

    for (let i = 0; i < numRounds; i++) {
      const isFinalRound = i === numRounds - 1;
      const round = {
        name: isFinalRound
          ? "Chave Final"
          : i === 0
          ? "Chave Inicial"
          : `Chave ${i + 1}`,
        seeds: [],
      };

      for (let j = 0; j < currentRoundParticipants.length; j += 2) {
        const team1 = currentRoundParticipants[j] || { name: "A decidir" };
        const team2 = currentRoundParticipants[j + 1] || { name: "A decidir" };

        round.seeds.push({
          id: `${i}-${j / 2 + 1}`,
          teams: [team1, team2],
          isFinalMatch: isFinalRound && j === 0,
        });
      }

      newRounds.push(round);

      currentRoundParticipants = round.seeds.map((seed, index) => {
        const winnerIndex = winners[`${i}-${index + 1}`];
        return winnerIndex !== undefined
          ? seed.teams[winnerIndex]
          : { name: "A decidir" };
      });
    }

    setRounds(newRounds);
  };

  const updateGroupsWithWinner = (roundIndex, seedIndex, winner) => {
    setGroups((prevGroups) => {
      const newGroups = [...prevGroups];
      const currentGroupIndex = newGroups.findIndex((g) => g.titulo === titulo);
      if (currentGroupIndex === -1) return prevGroups;

      const currentGroup = { ...newGroups[currentGroupIndex] };
      const updatedParticipants = [...currentGroup.participants];

      if (updatedParticipants[roundIndex + 1]) {
        updatedParticipants[roundIndex + 1][Math.floor(seedIndex / 2)] = winner;
      }

      currentGroup.participants = updatedParticipants;
      newGroups[currentGroupIndex] = currentGroup;

      return newGroups;
    });

    generateRounds(participants);
  };

  const getBackgroundColor = (team) => {
    if (positions.winner && team.name === positions.winner.name) {
      return {
        color: "yellow",
        position: `Primeiro Lugar + ${currentScores[1].points} Pontos`,
      };
    }
    if (positions.second && team.name === positions.second.name) {
      return {
        color: "#d4d4d4",
        position: `Segundo Lugar + ${currentScores[2].points} Pontos`,
      };
    }
    if (positions.third && team.name === positions.third.name) {
      return {
        color: "#8C7853",
        position: `Terceiro Lugar + ${currentScores[3].points} Pontos`,
      };
    }
    if (positions.fourth && team.name === positions.fourth.name) {
      return { color: "#4CAF50", position: "Quarto Lugar" };
    }
    return { color: "white", position: "" };
  };

  return (
    <div className="group border border-2 p-4 m-4">
      <div className="flex items-center gap-2">
        <h2>{`${titulo} - (${participants[0]?.sex || "N/A"})`}</h2>
        <p className="font-bold">{`${regra}`}</p>
      </div>
      <div style={{ width: "100%", overflow: "auto" }}>
        <Bracket
          rounds={rounds.map((round) => ({
            title: round.name,
            seeds: round.seeds.map((seed) => ({
              id: seed.id,
              date: "N/A",
              teams: seed.teams.map((team, index) => ({
                name: team.name || "",
                team: team?.team || "N/A",
                score: team?.score || 0,
                isWinner: winners[seed.id] === index,
                isChampion:
                  positions.winner && team.name === positions.winner.name,
              })),
              isWO: seed.isWO,
            })),
          }))}
          renderSeedComponent={({ seed }) =>
            seed.isWO ? (
              <div className="p-4 bg-yellow-200 rounded-lg w-[800px]">
                <div className="flex items-start p-1 gap-2 justify-between">
                  <div>
                    <p>{`${seed.teams[0].name}`}</p>
                    <p>{seed.teams[0].team}</p>
                  </div>
                  <div>Rank: + {currentScores[0].points} Pontos</div>
                </div>
              </div>
            ) : (
              <Seed>
                <SeedItem
                  style={{
                    border: "solid 3px #ededed",
                    backgroundColor: "white",
                    color: "black",
                    minWidth: "250px",
                  }}
                >
                  <div className="teams relative">
                    {seed.teams.map((team, index) => {
                      const { color, position } = getBackgroundColor(team);
                      return (
                        <SeedTeam
                          key={index}
                          className={
                            index === 0
                              ? "border-b-[3px] border-b border-[#ededed]"
                              : ""
                          }
                          style={{
                            backgroundColor: color,
                          }}
                        >
                          <div className="relative flex items-center justify-center w-full p-2">
                            <span>{`${team.name}`}</span>
                            <p className="absolute -bottom-1  transform text-black font-bold">{`${
                              position ? ` - ${position}` : ""
                            }`}</p>
                          </div>
                          {!isView ? (
                            <button
                              className="absolute top-1/2  transform -right-8 -translate-y-1/2 text-[10px] p-1 bg-blue-500 text-white rounded"
                              onClick={() => handleEditWinner(seed.id)}
                            >
                              Editar
                            </button>
                          ) : (
                            ""
                          )}
                        </SeedTeam>
                      );
                    })}
                  </div>
                </SeedItem>
              </Seed>
            )
          }
        />
      </div>

      <div className="relative z-10">
        <Modal
          className="w-full flex flex-col items-center"
          show={showModal}
          onClose={() => setShowModal(false)}
          position="center"
        >
          <Modal.Header>Selecione o vencedor</Modal.Header>
          <Modal.Body>
            <div className="p-2 flex flex-col gap-2 z-10">
              {selectedSeed &&
                rounds
                  .flatMap((round) => round.seeds)
                  .find((seed) => seed.id === selectedSeed)
                  .teams.map((team, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                      <div className="flex items-center gap-2 justify-between p-2 border border-2 border-[#ededed] hover:bg-gray-200">
                        <button
                          onClick={() => handleSelectWinner(index)}
                          className=" w-full white-none no-wrap"
                        >
                          {team.name}
                        </button>
                        <div>
                          <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Pontuação
                          </label>
                          <input
                            placeholder="Pontos..."
                            type="number"
                            id="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-fit "
                            required
                          />
                        </div>
                        <button
                        onClick={() => handleSelectWinner(index)}
                        className="text-[15px] p-1 bg-blue-500 text-white rounded w-full"
                      >
                        Definir como vencedor
                      </button>
                      </div>
                    </div>
                  ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default TournamentBracket;
