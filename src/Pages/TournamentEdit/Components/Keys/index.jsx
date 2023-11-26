import React from "react";
import { Modal } from "flowbite-react";
import {
  byId,
  generateKeys,
  insertMatchInArena
} from "../../../../Service/Match";
import Button from "../../../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondFighter from "./Components/SecondaryFighter";
import Fighter from "./Components/FighterCard";
import { byIdTournamentParticipant } from "../../../../Service/Tournament";
import { getAll } from "../../../../Service/Arenas";

const Keys = ({ owner }) => {
  const [ openModal, setOpenModal ] = React.useState(false);
  const [ data, setData ] = React.useState({});
  const [ empty, setEmpty ] = React.useState(false);
  const [ arenas, setArenas ] = React.useState([]);
  const [ currentArena, setCurrentArena ] = React.useState([]);
  const [ currentMatch, setCurrentMatch ] = React.useState([]);
  const groupByCategory = (matches) => {
    // Agrupando matches por 'first_fighter_categorie'
    return matches.reduce((acc, match) => {
      const category = match.first_fighter_categorie;
      // Verifique se a categoria de ambos os lutadores é a mesma antes de agrupar
      if (match.first_fighter_categorie === match.second_fighter_categorie) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(match);
      }
      return acc;
    }, {});
  };

  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let req = await byIdTournamentParticipant(id);
    if (req.data.length < 1) {
      setEmpty(true);
    }
    let response = await byId(id);
    if (response && response.data) {
      const groupedData = groupByCategory(response.data);
      setData(groupedData);
    }
  };

  const generateKeysById = async () => {
    const id = window.location.pathname.split("/")[3];
    console.log("ai", id);
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

  const handleRadioChange = (arena) => {
    console.log("asa", arena);
    setCurrentArena(arena);
  };

  const inserMatch = async () => {
    const payload = {
      match_id: currentMatch.id,
      fighter_1: currentMatch.first_fighter,
      fighter_2: currentMatch.second_fighter
    };
    await insertMatchInArena(payload, currentArena.id);
  };

  React.useEffect(() => {
    getData();
    getArenas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
        className="max-w-[800px] m-auto"
      >
        <Modal.Header>Escolha uma arena</Modal.Header>
        <Modal.Body className="p-4 ">
          {arenas && (
            <div className="w-full flex flex-col h-full">
              {arenas.map((val) => (
                <div className="flex items-center gap-10">
                  <input
                    type="radio"
                    onChange={() => {
                      handleRadioChange(val);
                    }}
                  />
                  <p>{val.name}</p>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="p-5 w-full items-end justify-end">
          <Button
            text={"Salvar atualizações"}
            color={"#fff"}
            value={true}
            background={"#3b82f6"}
            click={inserMatch}
          />
        </Modal.Footer>
      </Modal>
      {!empty ? (
        <div className="flex flex-col items-center w-full">
          {Object.keys(data).length === 0 ? (
            <div className="mt-10">
              <h1 className="mb-2">
                Você ainda não gerou as chaves do torneio
              </h1>
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
                category !== "VAZIO" && (
                  <div
                    key={category}
                    className="mt-10 flex flex-col gap-[5px] container-fighter w-full"
                  >
                    <div className="flex items-center gap-10">
                      <h2>{category}</h2>
                      <p>Resultado:</p>
                      <p>Score: {category.score || 0}</p>
                    </div>
                    {matches.map((match, index) => (
                      <div className="flex w-full" key={match.id}>
                        <div className="flex flex-col w-[50%]">
                          <Fighter data={match} />
                          <SecondFighter data={match} />
                        </div>
                        <div className="flex items-center w-96">
                          <div className="borders w-10 h-[80%]" />
                          <div>
                            {match.arena_id ? (
                              <div className="current-arena p-2 border m-4">
                                {match.arena_name}
                              </div>
                            ) : (
                              <button
                                className="btn-def p-2 ml-4 flex w-96 gap-2 plus-btn"
                                style={{ fontSize: "12px" }}
                                onClick={() => {
                                  setOpenModal(!openModal);
                                  setCurrentMatch(match);
                                }}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPlus} />
                                </span>
                                Arena
                              </button>
                            )}
                          </div>
                          <div className="w-[50%]">
                            <Fighter data={false} index={index} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )
          )}
        </div>
      ) : (
        <div>Adicione participantes ao evento antesm de gerar chaves</div>
      )}
    </div>
  );
};

export default Keys;
