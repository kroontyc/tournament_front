import React, { useState } from "react";
import { createCategories, getAll } from "../../../../Service/Categories";
import { Modal } from "flowbite-react";
import Button from "../../../../Components/Buttons";
const Categories = ({ data }) => {
  const [ categories, setCategories ] = React.useState([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ weight, setWeight ] = useState("");
  const [ height, setHeight ] = useState("");
  const [ min_weight, setMin ] = useState("");
  const [ ruler, setRuler ] = useState("altura");
  const [ name, setName ] = useState("");

  const getCategories = async () => {
    let req = await getAll(
      data.data.owner_id,
      window.location.pathname.split("/")[3]
    );

    setCategories(req);
  };

  const updateName = (set, value) => {
    set(value);
  };

  const sendCreateCategorie = async () => {
    const payload = {
      min_weight: min_weight,
      max_weight: weight,
      height: height ? height : "vazio",
      ruler: ruler,
      name: name,
      status: 1,
      owner_id: data.data.owner_id
    };
    await createCategories(payload);
  };

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col w-full justify-center w-[80%] p-[14px]">
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
        <Modal.Header>Registrar categoria</Modal.Header>
        <Modal.Body className="p-4">
          <div className="space-y-6 w-full">
            <div className="flex flex-wrap -mx-3 w-full">
              <div className="flex items-baseline w-full">
                <div className="w-full px-3 w-full grow">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Regra
                  </label>
                  <select
                    onChange={(event) => {
                      updateName(setRuler, event.target.value);
                    }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value={"altura"}>Altura</option>
                    <option value={"peso"}>Peso</option>
                  </select>
                </div>
                {ruler === "peso" && (
                  <div className="w-full flex">
                    <div className="w-full px-3 grow flex flex-col">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                        for="grid-password"
                      >
                        Peso Minimo
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        value={min_weight}
                        onChange={(event) => {
                          updateName(setMin, event.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full px-3 grow flex flex-col">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                        for="grid-password"
                      >
                        Peso máximo
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        value={weight}
                        onChange={(event) => {
                          updateName(setWeight, event.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}

                {ruler === "altura" && (
                  <div className="w-full flex">
                    <div className="w-full px-3 grow flex flex-col">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Altura
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        value={height}
                        onChange={(event) => {
                          updateName(setHeight, event.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="w-full px-3 grow flex flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Nome
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      updateName(setName, event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex  flex-col ml-4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Classe
                </label>
                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Ambos</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="p-5 w-full items-end justify-end">
          <Button
            text={"Salvar atualizações"}
            color={"#fff"}
            value={true}
            click={sendCreateCategorie}
            background={"#3b82f6"}
          />
        </Modal.Footer>
      </Modal>
      <h1 className="title">Categorias</h1>
      <div className="mb-4 mt-2">
        <button
          className="btn-def create-btn"
          style={{ width: "290px" }}
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          Criar categoria
        </button>
      </div>
      {categories && (
        <div
          className={
            openModal
              ? "relative overflow-x-auto w-full opacity-[0.3]"
              : "relative overflow-x-auto w-full"
          }
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Regra
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map(
                  (val) =>
                    val.name != "VAZIO" && (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {val.name}
                        </th>
                        <td className="px-6 py-4">
                          {val.ruler.map((val, index) => (
                            <p key={index}>{val}</p>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          {val.status == 1 ? "Ativo" : "Inativo"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className=" bg-gray-300 text-gray-200"
                            disabled
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;
