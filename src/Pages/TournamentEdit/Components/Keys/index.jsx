import React, { useEffect, useState } from "react";
import "./style.css";
import { byId, getRecoveryMatch, insertMatchInArena } from "../../../../Service/Match";
import { getAll } from "../../../../Service/Arenas";
import BracketContainer from "./Components/BracketContainer";
import { getScoresById } from "../../../../Service/Scores";
import Paginate from "../../../../Components/Paginate";

const Keys = ({ owner, idInternal, isView }) => {
  const [data, setData] = React.useState([]);
  const [dataToSave, setDatToSave] = React.useState([]);
  const [arenas, setArenas] = React.useState([]);
  const [isSave, setIsSave] = React.useState(false);
  const [currentScores, setCurrentScores] = useState([]);
  const [inFetch, setInfetch] = useState(true);

  const getData = async () => {
    setInfetch(true);
    const id = window.location.pathname.split("/")[3];
    //let verifyCurrentData = await verifyIfExist();
    let response = await byId(idInternal ? idInternal : id);
    if (response && response.data && response.data.length) {
      const formattedGroups = response.data.map((category) => ({
        titulo: category.category,
        regra: category.ruler,
        participants: category.participants.map((participant) => ({
          name: participant.name,
          weight: participant.weight,
          categorie: participant.categorie,
          sex: participant.sex,
          team: participant.team,
        })),
      }));
      setIsSave(false)
      console.log("Dados carregados da API", formattedGroups);
      setData(formattedGroups);
    }
   
    setInfetch(false);
  };

  const getArenas = async () => {
    if (owner && owner.data.owner_id) {
      let req = await getAll(owner.data.owner_id);
      setArenas(req);
    }
  };

  const getDataScores = async () => {
    let response = await getScoresById(0);

    // Verifica se a resposta é um objeto e converte para um array se necessário
    if (!Array.isArray(response)) {
      response = [response];
    }

    setCurrentScores(response);
    console.log("Dados recebidos:", response);
  };

  const saveBracketState = async () => {
    try {
      // Salve no localStorage

      console.log("Dados salvos no localStorage");

      // Envie para a API
      await insertMatchInArena({
        json_match: data,
        tournament_id: window.location.pathname.split("/")[3],
      });
      console.log("Estado da chave salvo com sucesso na API!");
    } catch (error) {
      console.error("Falha ao salvar o estado da chave:", error);
    }
  };

  const verifyIfExist = async () => {
    try {
      const id = window.location.pathname.split("/")[3];
      let req = await getRecoveryMatch(id)
      return req
    }catch(e) {
      console.log('e',e)
    }
  }

  const getParticipantsPaginate = async (page) => {
   //tem que ser o getData so que agora paginado
  };


  useEffect(() => {
    getDataScores();
  }, []);

  React.useEffect(() => {
    getData();
    getArenas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
     

      {!inFetch ? (
        <>
          {data && data.length ? (
            <BracketContainer
              groups={data}
              setGroups={setData}
              currentScores={currentScores}
              isView={isView}
              setDatToSave={setDatToSave}
              isSave={isSave}
            />
          ) : (
            "Sem chaves para este evento"
          )}
        </>
      ) : (
        "Carregando.."
      )}

<div className="w-full h-full flex justify-center">
                <Paginate data={data} click={getParticipantsPaginate} />
              </div>

    </div>
  );
};

export default Keys;
