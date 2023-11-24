import React from "react";
import { byId, generateKeys } from "../../../../Service/Match";
import Button from "../../../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondFighter from "./Components/SecondaryFighter";
import Fighter from "./Components/FighterCard";

const Keys = () => {
  // Modificando o estado inicial para ser um objeto em vez de um array
  const [ data, setData ] = React.useState({});

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
    let response = await byId(id);
    if (response && response.data) {
      const groupedData = groupByCategory(response.data);
      setData(groupedData);
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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full">
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
          Object.entries(data).map(([ category, matches ]) => (
            <div
              key={category}
              className="mt-10 flex flex-col gap-[5px] container-fighter w-full"
            >
              <div className="flex items-center gap-10">
                <h2>{category}</h2>
                <p>
                  Resultado:{" "}
                  {category.result ||
                    "Primeira etapa de" + " " + matches.length}
                </p>
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
                      <button
                        className="btn-def p-2 ml-4 flex w-96 gap-2 plus-btn"
                        style={{ fontSize: "12px" }}
                      >
                        <span>
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Arena
                      </button>
                    </div>
                    <div className="w-[50%]">
                      <Fighter data={false} index={index} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Keys;
