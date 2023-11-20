import React, { useState } from "react";
import Button from "../../../../Components/Buttons";
import { createUserManul, createByFile } from "../../../../Service/Tournament";
const AddParticipants = () => {
  const [ type, setType ] = React.useState("m");
  const [ name, setName ] = useState("");
  const [ age, setAge ] = useState("");
  const [ weight, setWeight ] = useState("");
  const [ gub, setGub ] = useState("");
  const [ sex, setSex ] = useState("");
  const [ team, setTeam ] = useState("");
  const [ categorie, setCategorie ] = useState("");
  const [ file, setFile ] = useState("");
  const uploadByFile = async (param) => {
    console.log("asa", param);
    const id = window.location.pathname.split("/")[3];
    if (!param) {
      const payload = {
        name: name,
        age: age,
        weight: weight,
        height: "157",
        rank: "3",
        gub: gub,
        sex: sex,
        categorie: categorie,
        team_name: team,
        tournament_id: id
      };
      await createUserManul(payload);
    } else {
      console.log("tem pacas");
      createByFile(id, file);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mt-10 ">
        <button
          onClick={() => {
            setType("m");
          }}
          type="button"
          class={
            type == "m" ? (
              "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            ) : (
              "bg-gray-300 text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            )
          }
        >
          Criação manual
        </button>
        <button
          onClick={() => {
            setType("i");
          }}
          type="button"
          class={
            type == "i" ? (
              "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            ) : (
              "bg-gray-300 text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            )
          }
        >
          Importar Arquivo CSV
        </button>
      </div>
      {type === "i" ? (
        <div class="flex items-center justify-center w-full flex-col">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </label>
          <div className="w-full flex items-end justify-end mt-2">
            <Button
              text={"Importar Participantes"}
              color={"#fff"}
              value={true}
              background={"#3b82f6"}
              click={uploadByFile}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div class="w-full max-w-lg mt-10">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div className="flex items-baseline w-full">
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
                    placeholder="Andre ..."
                  />
                </div>
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Idade * <span style={{ fontSize: "8px" }}>anos</span>
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="number"
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                    placeholder="2.."
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 w-[102%]">
              <div className="flex items-center w-full justify-between">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Peso * <span style={{ fontSize: "8px" }}>kg</span>
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="number"
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                    placeholder="2"
                  />
                </div>
                <div class="w-full ">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Gub
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    onChange={(event) => {
                      setGub(event.target.value);
                    }}
                    placeholder="Digite aqui..."
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6 w-[102%]">
              <div className="flex items-center w-full justify-between">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Sexo
                  </label>
                  <div class="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value={"FEMININO"}
                      checked={sex === "FEMININO"}
                      onChange={(event) => {
                        setSex(event.target.value);
                      }}
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-1"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Feminino
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      checked={sex === "MASCULINO"}
                      onChange={(event) => {
                        setSex(event.target.value);
                      }}
                      value="MASCULINO"
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Masculino
                    </label>
                  </div>
                </div>
                <div class="w-full ">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Categoria
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    onChange={(event) => {
                      setCategorie(event.target.value);
                    }}
                    placeholder="Digite aqui..."
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6 w-[102%]">
              <div className="flex items-center w-full justify-between">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Equipe
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    onChange={(event) => {
                      setTeam(event.target.value);
                    }}
                    placeholder="Nome da equipe..."
                  />
                </div>
              </div>
            </div>

            <div className="w-100 flex items-end justify-end mt-10">
              <Button
                text={"Adicionar Participante"}
                color={"#fff"}
                background={"#5bb65b"}
                click={uploadByFile}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddParticipants;
