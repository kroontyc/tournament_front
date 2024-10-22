import React from "react";
import "./style.css";
import { byId, addRanking, removeById } from "../../../../Service/Ranking";

const Ranking = ({ owner, idInternal }) => {
  const [data, setData] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(null);
  const [editName, setEditName] = React.useState("");
  const [editPoints, setEditPoints] = React.useState("");

  // Novo estado para controlar o modal de adição
  const [isAdding, setIsAdding] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newPoints, setNewPoints] = React.useState("");

  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let response = await byId(idInternal ? idInternal : id);
    setData(response);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditName(data[index].name);
    setEditPoints(data[index].points);
  };

  const handleSave = async (index) => {
    const updatedData = [...data];
    updatedData[index].name = editName;
    updatedData[index].points = editPoints;
    setData(updatedData);
    setIsEditing(null);
    // Atualizar no servidor
    // await updateRanking(updatedData[index].id, { name: editName, points: editPoints });
  };

  const removeRanking = async (id) => {
    await removeById(id, window.location.pathname.split("/")[3]);
    getData();
  };

  const handleAddNewRanking = async () => {
    const tournament_id = window.location.pathname.split("/")[3];
    const newRanking = { name: newName, points: newPoints, tournament_id };
    await addRanking(newRanking);
    getData();
    setIsAdding(false); // Fecha o modal
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-2">
      <div className="w-full flex items-end justify-end">
        <button
          className="bg-blue-300 text-white font-bold p-2 rounded-[4px]"
          onClick={() => setIsAdding(true)} // Abre o modal de adição
        >
          Adicionar nova pontuação
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">Pontuação</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(
              (val, key) =>
                val.name !== "VAZIO" && (
                  <tr className="bg-white border-b" key={key}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {isEditing === key ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border border-gray-300 p-2 rounded"
                        />
                      ) : (
                        val.name
                      )}
                    </th>
                    <td className="px-6 py-4">
                      {isEditing === key ? (
                        <input
                          type="number"
                          value={editPoints}
                          onChange={(e) => setEditPoints(e.target.value)}
                          className="border border-gray-300 p-2 rounded"
                        />
                      ) : (
                        <p>{val.points}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">{"Ativo"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isEditing === key ? (
                          <button
                            className="bg-green-500 text-white font-bold p-2 rounded-[4px]"
                            onClick={() => handleSave(key)}
                          >
                            Salvar
                          </button>
                        ) : (
                          <button
                            className="bg-blue-300 text-gray-100 font-bold p-2 rounded-[4px]"
                            onClick={() => handleEdit(key)}
                          >
                            Editar
                          </button>
                        )}
                        <button
                          onClick={() => removeRanking(val.id)}
                          className="bg-red-500 text-white font-bold p-2 rounded-[4px]"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Adicionar Nova Pontuação</h2>
            <input
              type="text"
              placeholder="Nome"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="number"
              placeholder="Pontuação"
              value={newPoints}
              onChange={(e) => setNewPoints(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white font-bold p-2 rounded"
                onClick={handleAddNewRanking}
              >
                Salvar
              </button>
              <button
                className="bg-red-500 text-white font-bold p-2 rounded"
                onClick={() => setIsAdding(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
