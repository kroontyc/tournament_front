import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import Button from "../../../../Components/Buttons";
import { createNewArena, getAll as allArenas } from "../../../../Service/Arenas";
import { getAll } from "../../../../Service/Categories";
import { byId } from "../../../../Service/Match";
import BracketContainer from "../Keys/Components/BracketContainer";
import { getScoresById } from "../../../../Service/Scores";

const Arenas = ({ data }) => {
  const [edit, setEdit] = useState(""); // Arena sendo editada
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada
  const [arenas, setArenas] = useState([]);
  const [categories, setCategories] = useState([]); // Lista de categorias
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Ativa");
  const [dataMatch, setDataMatchs] = React.useState([]);
  const [filteredGroup, setFilteredGroup] = useState([]);
  const [currentScores, setCurrentScores] = useState([]);

  const handleSelectChange = (value) => {
    setSelectedCategory(value); // Atualiza a categoria selecionada

    // Filtra os dados do grupo com base no título selecionado
    console.log("dataMatch", dataMatch)
    console.log("asa",value)
    const filtered = dataMatch.filter((group) => group.titulo === value);
    setFilteredGroup(filtered); // Atualiza o estado com os dados filtrados

    
  };

  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let response = await byId(id);
    if (response && response.data && response.data.length) {
      // Formate os dados recebidos
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
      console.log("Dados carregados da API", formattedGroups);

      // Atualize o estado e salve no localStorage
      setDataMatchs(formattedGroups);
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

  const createArena = async () => {
    if (data && data.data.owner_id) {
      let payload = {
        name: name,
        status: status,
        owner_id: data.data.owner_id,
      };
      await createNewArena(payload);
    }
  };

  const getArenaCategories = async () => {
    const req = await getAll(
      data.data.owner_id,
      window.location.pathname.split("/")[3]
    );
    setCategories(req);
  };

  const getArenas = async () => {
    if (data && data.data.owner_id) {
      let req = await allArenas(data.data.owner_id);
      setArenas(req);
    }
  };



  useEffect(() => {
    getArenas();
    getArenaCategories();
    getData();
    getDataScores();
  }, []);

  return (
    <div className="p-4">
      {openModal ? (
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="max-w-[800px] m-auto"
        >
          <Modal.Header>Registrar Arena</Modal.Header>
          <Modal.Body className="p-4 ">
            <div className="w-full flex gap-10 items-center">
              <div className="flex items-center flex-col">
                <label>Nome da Arena</label>
                <input
                  onChange={(event) => setName(event.target.value)}
                  className="ml-4 border p-2 rounded-[6px]"
                  placeholder="Arena xx...."
                />
              </div>
              <div className="flex items-center flex-col">
                <label>Status da Arena</label>
                <select
                  className="ml-4 border p-2 rounded-[6px] w-full"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Fechada</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="p-5 w-full items-end justify-end">
            <Button
              text={"Salvar atualizações"}
              color={"#fff"}
              value={true}
              background={"#3b82f6"}
              click={createArena}
            />
          </Modal.Footer>
        </Modal>
      ) : null}

      <div className={openModal ? "opacity-[0.3]" : ""}>
        <h1 className="title">Arenas</h1>
        <div className="mb-4 mt-2">
          <button
            className="btn-def create-btn"
            style={{ width: "290px" }}
            onClick={() => setOpenModal(!openModal)}
          >
            Criar Arena
          </button>
        </div>
        {arenas && (
          <div className="w-full flex flex-col w-full">
            {arenas.map((val) => (
              <div className="flex flex-col w-full mt-4" key={val.id}>
                <h1 className="color-[#000] font-bold text-[24px]">
                  {val.name}
                </h1>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between p-2">
                    <p>Acompanhar arena</p>
                    <p>Lutadores</p>
                  </div>
                  <div className="border">
                    <div className="flex items-center">
                      <div className="w-[20%] border-r-4 p-4">
                        <button
                          className="p-2 border"
                          onClick={() => setEdit(val)}
                        >
                          Editar
                        </button>
                      </div>
                      <div className="w-[60%] border-r-4 p-4">
                        <p>Status: {val.status}</p>
                      </div>
                      <div className="w-[20%] p-4">
                        <p>
                          Categoria:{" "}
                          <span className="text-[10px]">
                            {selectedCategory || ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2">
                    <div className="min-h-[300px] border flex flex-col items-center justify-center">
                      {/* Se o botão "Editar" for clicado */}
                      {edit === val && (
                        <div className="p-4 w-full">
                          <label>Selecione uma categoria:</label>
                          <select
                            className="border p-2 rounded w-full"
                            onChange={(e) =>
                              handleSelectChange(e.target.value)
                            }
                          >
                            <option value="">Selecione</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.name}>
                                {cat.name}
                              </option>
                            ))}
                          </select>

                          {/* Exibe os lutadores filtrados */}
                          {selectedCategory ? (
                            <div className="mt-4">
                              <h2 className="text-lg font-bold">
                                {selectedCategory.name}
                              </h2>
                              {filteredGroup && filteredGroup.length ? (
                                <BracketContainer
                                  groups={filteredGroup}
                                  setGroups={setDataMatchs}
                                  currentScores={currentScores}
                                  isView={false}
                                />
                              ) : (
                                "Sem chaves para este evento"
                              )}
                            </div>
                          ) : (
                            <p>Sem lutadores definidos</p>
                          )}
                        </div>
                      )}

                      {!edit && <p>Sem lutadores definidos</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Arenas;
