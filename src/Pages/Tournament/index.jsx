import React, { useState } from "react";
import "./style.css";
import Button from "../../Components/Buttons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { createTournament } from "../../Service/Tournament";
const Tournament = () => {
  const [ name, setName ] = useState("");
  const [ reward, setReward ] = useState("");
  const [ date, setDate ] = useState("");
  const postCreateTournament = () => {
    try {
      createTournament(name, reward, date);
    } catch (e) {
      console.log("e", e);
    }
  };
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <h1 className="title">Criar novo Torneio</h1>
      <div className="flex flex-col">
        <p className="sub-title mt-10">Insira os dados abaixo</p>
        <div class="w-full max-w-lg mt-10">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div className="flex items-baseline">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Nome
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Campeonato regional xxx"
                />
                <p class="text-gray-600 text-xs italic">
                  Insira os dados referentes ao acontecimento do evento.
                </p>
              </div>
              <div class="w-full px-3 w-[30%]">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Premiação
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  onChange={(event) => {
                    setReward(event.target.value);
                  }}
                  placeholder="290R$"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Data
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="date"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
                placeholder="Albuquerque"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Cidade
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
              />
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                CEP
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="90210"
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
