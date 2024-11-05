import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Buttons";
import { getAll } from "../../../../Service/Categories";
import { createUserManul, createByFile } from "../../../../Service/Tournament";

const AddParticipants = () => {
  const [type, setType] = useState("m");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gub, setGub] = useState("");
  const [sex, setSex] = useState("");
  const [team, setTeam] = useState("");
  const [categorie, setCategorie] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Click to upload");
  const [categories, setCategories] = useState([]);

  const [showCategories, setShowCategories] = useState(false);
  const [selectedRulerClass, setSelectedRulerClass] = useState("");
  const uploadByFile = async (param) => {
    const id = window.location.pathname.split("/")[3];
    if (!param) {
      const payload = {
        name: name,
        age: age,
        weight: weight,
        height: "157",
        rank: selectedRulerClass,
        gub: gub,
        sex: sex,
        categorie: selectedRule,
        team_name: team,
        tournament_id: id
      };
      await createUserManul(payload);
    } else {
      createByFile(id, file);
    }
  };

  const getCategories = async () => {
    let req = await getAll(window.location.pathname.split("/")[3]);
    setCategories(req);
  };

  const findCategory = (age, weight) => {
    let filtered = categories.filter((val) => {
      return val.name.includes(age);
    });
    if (filtered && filtered[0]) {
      setSelectedRulerClass(filtered[0].name);
    }
    if (
      filtered &&
      filtered.length &&
      filtered[0] &&
      filtered[0].ruler &&
      weight
    ) {
      let selectedCategorie = filtered[0].ruler.filter((val) =>
        val.includes(`${weight}kg`)
      );
      if (selectedCategorie && selectedCategorie[0]) {
        setSelectedRule(selectedCategorie[0]);
      } else {
        setSelectedRule("");
      }
    }
  };

  const handleRulerSelected = (rule, classPer) => {
    setSelectedRule(rule);
    setSelectedRulerClass(classPer);
    setShowCategories(false);
  };

  const handleshowCategories = () => {
    setShowCategories(true);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (age && weight) {
      findCategory(parseInt(age), parseFloat(weight));
    }
  }, [age, weight, categories]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mt-10 ">
        <button
          onClick={() => {
            setType("m");
          }}
          type="button"
          className={
            type == "m"
              ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              : "bg-gray-300 text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          }
        >
          Criação manual
        </button>
        <button
          onClick={() => {
            setType("i");
          }}
          type="button"
          className={
            type == "i"
              ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              : "bg-gray-300 text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          }
        >
          Importar Arquivo CSV
        </button>
      </div>
      {type === "i" ? (
        <div className="flex items-center justify-center w-full flex-col">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{fileName}</span>
              </p>
              {fileName != "Click to upload" && (
                <p
                  role="button"
                  className="text-xs text-white dark:text-gray-400 bg-[#93c5fd] p-4"
                  onClick={() => {
                    setFile(null);
                    setFileName(file ? file.name : "Click to upload");
                  }}
                >
                  Remover
                </p>
              )}
              {fileName === "Click to upload" && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                 CSV
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
                setFileName(file ? file.name : "Click to upload");
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
          <div className="w-full max-w-lg mt-10">
            <div className="flex flex-wrap -mx-3 mb-6">
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
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    placeholder="Andre ..."
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Idade * <span style={{ fontSize: "8px" }}>anos</span>
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-6 w-[102%]">
              <div className="flex items-center w-full justify-between">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Peso * <span style={{ fontSize: "8px" }}>kg</span>
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="number"
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                    placeholder="2"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Gub
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

            <div className="flex flex-wrap -mx-3 mb-6 w-[102%]">
              <div className="flex items-center w-full justify-between">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Sexo
                  </label>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value={"FEMININO"}
                      checked={sex === "FEMININO"}
                      onChange={(event) => {
                        setSex(event.target.value);
                      }}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Feminino
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      checked={sex === "MASCULINO"}
                      onChange={(event) => {
                        setSex(event.target.value);
                      }}
                      value="MASCULINO"
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Masculino
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category-dropdown"
                  >
                    Categoria
                  </label>
                  <div className="flex relative flex-col">
                    <div className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 dropdown absolute">
                      {showCategories ? (
                        categories.map((cat) => (
                          <div
                            key={cat.id}
                            value={cat.name}
                            className="flex flex-col items-start gap-2 cursor-pointer"
                          >
                            <div className="flex flex-col gap-1">
                              <p className="label-text">{cat.name}</p>
                              {cat.ruler.map((ruler, index) => (
                                <span
                                  onClick={() => {
                                    handleRulerSelected(ruler, cat.name);
                                  }}
                                  key={index}
                                  className="caption-text cursor-pointer hover:opacity-70 hover:bg-gray-300"
                                >
                                  {ruler}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm" onClick={handleshowCategories}>
                          {selectedRule
                            ? selectedRule
                            : " Selecione uma categoria..."}
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedRulerClass && (
                    <p className="text-xs text-gray-500 mt-[50px]">
                      Regra: {selectedRulerClass}
                    </p>
                  )}
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
                    Equipe
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
