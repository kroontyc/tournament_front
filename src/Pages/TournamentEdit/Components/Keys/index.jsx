import React, { useEffect, useState } from "react";
import "./style.css";
import { byId, insertMatchInArena } from "../../../../Service/Match";
import { getAll } from "../../../../Service/Arenas";
import BracketContainer from "./Components/BracketContainer";
import { getScoresById } from "../../../../Service/Scores";

const Keys = ({ owner, idInternal, isView }) => {
  const [data, setData] = React.useState([]);
  const [arenas, setArenas] = React.useState([]);
  const [currentScores, setCurrentScores] = useState([]);
  const [inFetch, setInfetch] = useState(true);
  // Chave de armazenamento para o localStorage
  const STORAGE_KEY = `bracketData_${window.location.pathname.split("/")[3]}`;

  const getData = async () => {
    setInfetch(true);
    // Tente buscar os dados salvos no localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    // Caso não tenha no localStorage, faça a chamada à API
    const id = window.location.pathname.split("/")[3];
    let response = await byId(idInternal ? idInternal : id);

    if (response && response.length) {
      // Formate os dados recebidos
      const formattedGroups = response.map((category) => ({
        titulo: category.category,
        regra: category.ruler,
        participants: category.participants.map((participant) => ({
          name: participant.name,
          weight: participant.weight,
          categorie: participant.categorie,
          sex: participant.sex,
          team: participant.team
        }))
      }));
      console.log("Dados carregados da API", formattedGroups);

      // Atualize o estado e salve no localStorage
      setData(formattedGroups);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedGroups));
      /**
      *  if (savedData) {
        setData(JSON.parse(savedData));
        console.log("Dados carregados do localStorage");
      } else {
        // Caso não tenha no localStorage, faça a chamada à API
        const id = window.location.pathname.split("/")[3];
        let response = await byId(idInternal ? idInternal : id);
  
        // Formate os dados recebidos
        const formattedGroups = response.map((category) => ({
          titulo: category.category,
          regra: category.ruler,
          participants: category.participants.map((participant) => ({
            name: participant.name,
            weight: participant.weight,
            categorie: participant.categorie,
            sex: participant.sex,
            team: participant.team
          }))
        }));
        console.log("Dados carregados da API", formattedGroups);
        
        // Atualize o estado e salve no localStorage
        setData(formattedGroups);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedGroups));
      }
      */
    }
    console.log("asa");
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Dados salvos no localStorage");

      // Envie para a API
      await insertMatchInArena(
        { json_match: data },
        window.location.pathname.split("/")[3]
      );
      console.log("Estado da chave salvo com sucesso na API!");
    } catch (error) {
      console.error("Falha ao salvar o estado da chave:", error);
    }
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
      {!isView ? (
        <button
          onClick={saveBracketState}
          className="fixed bottom-10 z-[100] left-1/2 transform -translate-x-1/2 bg-blue-500 p-2 text-white rounded-[4px]"
        >
          Salvar Configuração atual
        </button>
      ) : (
        ""
      )}

      {!inFetch ? (
        <>
          {data && data.length ? (
            <BracketContainer
              groups={data}
              setGroups={setData}
              currentScores={currentScores}
              isView={isView}
            />
          ) : (
            "Sem chaves para este evento"
          )}
        </>
      ) : (
        "Carregando.."
      )}
    </div>
  );
};

export default Keys;
