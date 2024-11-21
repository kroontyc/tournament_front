import React, { useState } from "react";
import "./style.css";
import Button from "../../Components/Buttons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { createTournament } from "../../Service/Tournament";
import TkContext from "../../context/TkdContext";

const Tournament = () => {
  const { user } = React.useContext(TkContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [federation, setFederation] = useState("");
  const [reward, setReward] = useState("200");
  const [date, setDate] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const postCreateTournament = () => {
    if (user && user.id) {
      try {
        createTournament(name, reward, date, `${city} - ${state}`, federation, user.id);
      } catch (e) {
        console.log("e", e);
      }
    } else {
      alert("Realize login antes de tentar cadastrar um novo evento");
    }
  };

  // Função para buscar CEP
  const fetchAddressByZipCode = async (zip) => {
    if (zip.length === 8) { // Valida se o CEP tem 8 dígitos
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setCity(data.localidade); // Atualiza a cidade
          setState(data.uf); // Atualiza o estado
        } else {
          alert("CEP não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <h1 className="title">Criar novo Torneio</h1>
      <div className="flex flex-col">
        <p className="sub-title mt-10">Insira os dados abaixo</p>
        <div className="w-full max-w-lg mt-10">
          <div className="flex flex-wrap -mx-3 mb-6 wfull">
            <div className="flex items-baseline w-full">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Nome
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Campeonato regional xxx"
                />
                <p className="text-gray-600 text-xs italic">
                  Insira os dados referentes ao acontecimento do evento.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 w-[102%]">
            <div className="flex items-center w-full justify-between">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Federação
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  onChange={(event) => setFederation(event.target.value)}
                  placeholder="Federação goiana..."
                />
              </div>
              <div className="w-full ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Local do acontecimento
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  disabled
                  value={`${city} - ${state}`}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Palmas - TO"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Data
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="date"
                onChange={(event) => setDate(event.target.value)}
                placeholder="Data do evento"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                CEP
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                value={zipCode}
                onChange={(event) => {
                  setZipCode(event.target.value);
                  if (event.target.value.length === 8) {
                    fetchAddressByZipCode(event.target.value);
                  }
                }}
                placeholder="90210"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Cidade
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value={city}
                readOnly
                disabled
                placeholder="Cidade"
              />
            </div>
            
          </div>
          <div className="w-100 flex items-end justify-end mt-10">
            <Button
              text={"Criar evento"}
              color={"#fff"}
              background={"#5bb65b"}
              icon={faCirclePlus}
              click={postCreateTournament}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
