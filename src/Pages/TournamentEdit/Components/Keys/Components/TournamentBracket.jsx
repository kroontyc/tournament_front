import React from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const TournamentBracket = ({ group }) => {
  const { titulo, regra, participants } = group;

  const rounds = [];

  // Verificar se há apenas um participante, caso sim, vence por W.O.
  if (participants.length === 1) {
    rounds.push({
      name: "Vencedor por W.O.",
      seeds: [
        {
          id: 1,
          teams: [
            { name: participants[0].name, team: participants[0].team, score: 0 }
          ],
          isWO: true // Indica que é W.O.
        }
      ]
    });
  } else {
    // Caso contrário, gerar as rodadas com base no número de participantes
    const numRounds = Math.ceil(Math.log2(participants.length));
    let currentParticipants = [...participants];

    for (let i = 0; i < numRounds; i++) {
      const round = {
        name: i === 0 ? "Opening" : `Round ${i + 1}`,
        seeds: []
      };

      for (let j = 0; j < currentParticipants.length; j += 2) {
        round.seeds.push({
          id: j / 2 + 1,
          teams: [
            currentParticipants[j] || { name: "A decidir" },
            currentParticipants[j + 1] || { name: "A decidir" }
          ]
        });
      }

      rounds.push(round);

      // Atualizar a lista de participantes para a próxima rodada (vencedores fictícios)
      currentParticipants = new Array(
        Math.ceil(currentParticipants.length / 2)
      ).fill({ name: "A decidir" });
    }
  }

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
              teams: seed.teams.map((team) => ({
                name: team ? team.name : "A decidir",
                team: team?.team || "N/A",
                score: team?.score || 0
              })),
              isWO: seed.isWO || false
            }))
          }))}
          renderSeedComponent={({ seed }) =>
            seed.isWO ? (
              <div className="p-4 bg-yellow-200 rounded-lg w-[800px]">
                <div className="flex  items-start p-1 gap-2 justify-between">
                  <div>
                    <p>{`${seed.teams[0].name}`}</p>
                    <p>{seed.teams[0].team}</p>
                  </div>
                  <div>Rank: +6</div>
                </div>
              </div>
            ) : (
              <Seed>
                {seed.isWO ? (
                  ""
                ) : (
                  <SeedItem
                    style={{
                      border: "solid 3px #ededed",
                      backgroundColor: "white",
                      color: "black"
                    }}
                  >
                    <div className="teams">
                      {seed.teams.map((team, index) => (
                        <SeedTeam
                          key={index}
                          className={
                            index === 0
                              ? "border-b-[3px] border-b border-[#ededed]"
                              : ""
                          }
                        >
                          <span>{team.name}</span>
                        </SeedTeam>
                      ))}
                    </div>
                  </SeedItem>
                )}
              </Seed>
            )
          }
        />
      </div>
    </div>
  );
};

export default TournamentBracket;
