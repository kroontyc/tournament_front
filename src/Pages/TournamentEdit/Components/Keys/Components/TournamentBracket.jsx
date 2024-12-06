import React, { useState, useEffect } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import { Modal } from "flowbite-react";
import { getRecoveryMatch, insertMatchInArena } from "../../../../../Service/Match";

const TournamentBracket = ({
  group,
  setGroups,
  currentScores,
  isView,
  isSave,
}) => {
  const { titulo, regra, participants } = group;
  let randomUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
    "data:image/png;base64,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",
  ];
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [winners, setWinners] = useState({});
  const [rounds, setRounds] = useState([]);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    recoveredData()
   
  }, [participants]);

  const handleEditWinner = (seedId) => {
    setSelectedSeed(seedId);
    setShowModal(true);
  };

  const recoveredData = async () => {
    let exist =  await verifyIfExist();
   
    if(exist && exist.match) {
      try {
       let  toJson = JSON.parse(exist.match.json_match);
        console.log("toJson", toJson);
        setRounds(toJson)
      } catch (error) {
        console.error("Erro ao converter para JSON:", error);
      }
    }else {
      generateRounds(participants)
    }
  }

  const verifyIfExist = async () => {
    try {

      let req = await getRecoveryMatch(`${titulo}-(${participants[0]?.sex || "N/A"}-${regra})`)
      return req
    }catch(e) {
      console.log('e',e)
    }
  }

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
      addPointsToTeam(currentParticipants[0].team, currentScores[0].points);
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
    saveBracketState()
  };

  const addPointsToTeam = (teamKey, pointsToAdd) => {
    // Gera uma chave única baseada no nome do time
    const storageKey = `${teamKey}-${titulo}-(${
      participants[0]?.sex || "N/A"
    })-${regra}`;

    // Verifica se os pontos já foram adicionados para este time nesta rodada
    if (localStorage.getItem(storageKey)) {
      return; // Não adiciona novamente
    }

    // Pega os pontos atuais do time no localStorage
    const currentPoints = parseInt(localStorage.getItem(teamKey) || "0", 10);

    // Atualiza os pontos do time
    const updatedPoints = currentPoints + pointsToAdd;
    localStorage.setItem(teamKey, updatedPoints);

    // Marca que os pontos foram adicionados para esta rodada
    localStorage.setItem(storageKey, true);
  };

  const getBackgroundColor = (team) => {
    if (!team || !team.team) return { color: "white", position: "" };

    if (positions.winner && team.name === positions.winner.name) {
      addPointsToTeam(team.team, currentScores[1].points);
      return {
        color: "yellow",
        position: `Primeiro Lugar + ${currentScores[1].points} Pontos`,
      };
    }

    if (positions.second && team.name === positions.second.name) {
      addPointsToTeam(team.team, currentScores[2].points);
      return {
        color: "#d4d4d4",
        position: `Segundo Lugar + ${currentScores[2].points} Pontos`,
      };
    }

    if (positions.third && team.name === positions.third.name) {
      addPointsToTeam(team.team, currentScores[3].points);
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

  const saveBracketState = async () => {
    try {

      await insertMatchInArena({
        json_match: rounds,
        categorie: `${titulo}-(${participants[0]?.sex || "N/A"}-${regra})`,
        tournament_id: window.location.pathname.split("/")[3],
      });
      console.log("Estado da chave salvo com sucesso na API!");
    } catch (error) {
      console.error("Falha ao salvar o estado da chave:", error);
    }
  };

  return (
    <div className="group border border-2 p-4 m-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2>{`${titulo} - (${participants[0]?.sex || "N/A"})`}</h2>
          <p className="font-bold">{`${regra}`}</p>
        </div>
        <button
          onClick={saveBracketState}
          className=" bg-blue-500 p-1 text-white rounded-[4px]"
        >
          Salvar Configuração atual das chaves
        </button>
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
                team: team?.team || "",
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
                          <div className="flex flex-col gap-1">
                            <div className="relative truncate flex items-center justify-center w-full gap-2 ">
                              <img
                                src={
                                  participants[0]?.sex === "MASCULINO"
                                    ? randomUrls[0]
                                    : randomUrls[1]
                                }
                                alt="logo"
                                className="w-[24px] h-[24px]"
                              />
                              <span className="text-[12px] truncate">{`${team.name}`}</span>
                              <p className="absolute -bottom-1  transform text-black font-bold">{`${
                                position ? ` - ${position}` : ""
                              }`}</p>
                            </div>
                            <span className="text-[12px] bold text-bold font-bold">
                              {team.team}
                            </span>
                          </div>
                          {!isView && !showModal ? (
                            <button
                              className="absolute top-1/2  z-[9] transform -right-8 -translate-y-1/2 text-[10px] p-1 bg-blue-500 text-white rounded"
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
