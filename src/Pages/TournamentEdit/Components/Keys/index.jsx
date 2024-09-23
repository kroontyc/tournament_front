import React from "react";

import Button from "../../../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondFighter from "./Components/SecondaryFighter";
import Fighter from "./Components/FighterCard";
import { byIdTournamentParticipant } from "../../../../Service/Tournament";
import { getAll } from "../../../../Service/Arenas";
import { Modal } from "flowbite-react";
import {
  byId,
  generateKeys,
  insertMatchInArena
} from "../../../../Service/Match";
import { createResult } from "../../../../Service/Results";
import WinnerCard from "./Components/WinnerCard";

const Keys = ({ owner, idInternal }) => {
  // Modificando o estado inicial para ser um objeto em vez de um array
  const [ data, setData ] = React.useState({});
  const [ openModal, setOpenModal ] = React.useState(false);

  const [ isEdit, setIsEdit ] = React.useState(null);
  const [ arenas, setArenas ] = React.useState([]);
  const [ currentArena, setCurrentArena ] = React.useState([]);
  const [ currentMatch, setCurrentMatch ] = React.useState([]);
  const [ p1Score, setP1Score ] = React.useState("");
  const [ p2Score, setP2Score ] = React.useState("");
  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let response = await byId(idInternal ? idInternal : id);
    if (response && response.data) {
      // const groupedData = groupByCategory(response.data);
      setData(response.data);
    }
  };

  const generateKeysById = async () => {
    const id = window.location.pathname.split("/")[3];
    const payload = {
      tournament_id: id
    };
    await generateKeys(payload);
    getData(); // Re-fetch the data to get updated matches after generation
  };

  const getArenas = async () => {
    if (owner && owner.data.owner_id) {
      let req = await getAll(owner.data.owner_id);
      setArenas(req);
    }
  };

  const handleRadioChange = (match, value, father) => {
    setCurrentArena(match);
    save(match, value, father);
  };

  const inserMatch = async () => {
    const payload = {
      match_id: currentMatch.id,
      fighter_1: currentMatch.first_fighter,
      fighter_2: currentMatch.second_fighter
    };
    await insertMatchInArena(payload, currentArena.id);
  };

  const renderDivs = (matchesLength, matches) => {
    let number = matchesLength * 2;
    const divs = [];
    const range = [];
    while (number >= 2) {
      number = Math.ceil(number / 2);

      for (let i = 0; i < number; i++) {
        range.push(i);
      }

      divs.push(
        <div key={number} style={{ left: `${number * 5}%` }} className="">
          {range &&
            matches.map(
              (val, index) =>
                index < number / 2 && (
                  <div className={index >= 1 ? "mt-[20px]" : ""}>
                    {number > 1 ? (
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col ">
                          <div
                            className="border  hover-card flex items-center"
                            data-player-result={val.result}
                            onMouseEnter={() => handleMouseEnter(val.result)}
                            onMouseLeave={() => handleMouseLeave(val.result)}
                          >
                            {val.result && parseInt(val.accStage) == number ? (
                              <WinnerCard
                                name={val.result}
                                team={val.winner_team}
                                index={index + 1}
                              />
                            ) : (
                              <Fighter data={false} index={index + 1} />
                            )}
                            {isEdit &&
                              isEdit[0] &&
                              isEdit[0].name === matches[0].name && (
                                <div className="flex gap-5 items-center">
                                  <div className="flex gap-5 items-center">
                                    <select>
                                      <option disabled selected>
                                        W/L
                                      </option>
                                      <option value={1}>Winner</option>
                                      <option>Reset</option>
                                    </select>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Score"
                                    className="w-20 border mr-2 flex items-center justify-center text-center"
                                  />
                                </div>
                              )}
                          </div>
                          <div className="border  hover-card flex items-center">
                            <Fighter data={false} index={index} />
                            {isEdit &&
                              isEdit[0] &&
                              isEdit[0].name === matches[0].name && (
                                <div className="flex gap-5 items-center">
                                  <div className="flex gap-5 items-center">
                                    <select>
                                      <option disabled selected>
                                        W/L
                                      </option>
                                      <option value={1}>Winner</option>
                                      <option>Reset</option>
                                    </select>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Score"
                                    className="w-20 border mr-2 flex items-center justify-center text-center"
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          val.result && parseInt(val.accStage) == number
                            ? "winner"
                            : "border flex items-center"
                        }
                        data-player-result={
                          val.result && parseInt(val.accStage) == number
                            ? val.result
                            : ""
                        }
                        onMouseEnter={() => handleMouseEnter(val.result)}
                        onMouseLeave={() => handleMouseLeave(val.result)}
                      >
                        {val.result && parseInt(val.accStage) == number ? (
                          <WinnerCard
                            name={val.result}
                            team={val.winner_team}
                            index={index + 1}
                            notColor={true}
                          />
                        ) : (
                          <Fighter
                            data={false}
                            index={index + 1}
                            notColor={true}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      ); // Adiciona um novo elemento 'div' com 'asa' dentro
      // Divide o número por 2
    }

    return divs;
  };

  const save = async (match, value, father) => {
    if (value == 1 || value == 2) {
      const payload = {
        match_id: match.id,
        arena_id: null,
        winner: value == 1 ? match.first_fighter : match.second_fighter,
        p1: match.first_fighter,
        p2: match.second_fighter,
        p1_score: p1Score,
        p2_score: p2Score,
        acc: father.length
      };
      await createResult(payload);
    }

    //  await createResult(payload);
  };

  const handleEdit = (param) => {
    setP1Score("");
    setP2Score("");
    setIsEdit(param);
  };

  const handleMouseEnter = (playerValue) => {
    const elements = document.querySelectorAll(
      `[data-player-result='${playerValue}']`
    );
    elements.forEach((element) => {
      element.classList.add("highlighted");
    });
  };

  const handleMouseLeave = (playerValue) => {
    const elements = document.querySelectorAll(
      `[data-player-result='${playerValue}']`
    );
    elements.forEach((element) => {
      element.classList.remove("highlighted");
    });
  };

  React.useEffect(() => {
    getData();
    getArenas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full p-[14px]">
        {Object.keys(data).length === 0 ? (
          <div className="mt-10">
            <h1 className="mb-2">Você ainda não gerou as chaves do torneio</h1>
            <Button
              text="Gerar chaves"
              background={"#3b82f6"}
              color="#ffff"
              icon={faPlus}
              click={generateKeysById}
            />
          </div>
        ) : (
          Object.entries(data).map(
            ([ category, matches ]) =>
              !category.includes("vazio") && (
                <div
                  key={category}
                  style={{ overflowX: "auto" }}
                  className="mt-10 flex flex-col gap-[5px] container-fighter w-full"
                >
                  {!idInternal && (
                    <div className="flex items-center gap-10">
                      <h2>{matches[0].name}</h2>
                      {isEdit &&
                      isEdit[0] &&
                      isEdit[0].name === matches[0].name ? (
                        <p
                          className="p-2 bg-blue-300 border text-white"
                          role="button"
                          onClick={() => {
                            setIsEdit(null);
                            getData();
                          }}
                        >
                          Salvar
                        </p>
                      ) : (
                        <p
                          className="p-2 bg-blue-300 border text-white"
                          role="button"
                          onClick={() => {
                            handleEdit(matches);
                          }}
                        >
                          Editar
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex items-center">
                    <div className="flex  flex-col">
                      {matches.map(
                        (match, index) =>
                          match.first_fighter_name != "VAZIO" && (
                            <div
                              className="flex w-full gap-5 items-center"
                              key={match.id}
                            >
                              <div className="flex flex-col w-full mb-5">
                                <div
                                  data-player-result={match.first_fighter_name}
                                  className={
                                    match.first_fighter_name ===
                                    match.result ? (
                                      "flex items-center justify-between gap-5 border bg-green-200  hover-card"
                                    ) : (
                                      "flex items-center justify-between gap-5 border  hover-card"
                                    )
                                  }
                                >
                                  <Fighter data={match} />
                                  {!isEdit && (
                                    <div className="flex items-center mr-4">
                                      <p style={{ fontSize: "12px" }}>
                                        Score:
                                        <span className="ml-1">
                                          {match.p1_score}
                                        </span>
                                      </p>
                                    </div>
                                  )}
                                  {isEdit &&
                                  isEdit[0] &&
                                  isEdit[0].name === matches[0].name && (
                                    <div className="flex gap-5 items-center">
                                      <div className="flex gap-5 items-center">
                                        <select
                                          onChange={(e) => {
                                            handleRadioChange(
                                              match,
                                              e.target.value,
                                              matches
                                            );
                                          }}
                                        >
                                          <option disabled selected>
                                            W/L
                                          </option>
                                          <option value={1}>Winner</option>
                                          <option>Reset</option>
                                        </select>
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="Score"
                                        className="w-20 border mr-2 flex items-center justify-center text-center"
                                        value={match.p1_score}
                                        onChange={(event) => {
                                          setP1Score(event.target.value);
                                          match.p1_score = event.target.value;
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div
                                  data-player-result={match.second_fighter_name}
                                  className={
                                    match.second_fighter_name ===
                                    match.result ? (
                                      "flex items-center justify-between gap-5 border bg-green-200  hover-card"
                                    ) : (
                                      "flex items-center justify-between gap-5 border  hover-card"
                                    )
                                  }
                                >
                                  <SecondFighter data={match} />
                                  {!isEdit && (
                                    <div className="flex items-center mr-4">
                                      <p style={{ fontSize: "12px" }}>
                                        Score:
                                        <span className="ml-1">
                                          {match.p2_score}
                                        </span>
                                      </p>
                                    </div>
                                  )}
                                  {isEdit &&
                                  isEdit[0] &&
                                  isEdit[0].name === matches[0].name && (
                                    <div className="flex gap-5 items-center">
                                      <div className="flex gap-5 items-center">
                                        <select
                                          onChange={(e) => {
                                            handleRadioChange(
                                              match,
                                              e.target.value,
                                              matches
                                            );
                                          }}
                                        >
                                          <option disabled selected>
                                            W/L
                                          </option>
                                          <option value={2}>Winner</option>
                                          <option>Reset</option>
                                        </select>
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="Score"
                                        className="w-20 border mr-2 flex items-center justify-center text-center"
                                        value={match.p2_score}
                                        onChange={(event) => {
                                          setP2Score(event.target.value);
                                          match.p2_score = event.target.value;
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                    <div className="relative flex  gap-5 items-center justify-center ml-4 pr-[20px]">
                      {renderDivs(matches.length, matches)}
                    </div>
                  </div>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default Keys;
