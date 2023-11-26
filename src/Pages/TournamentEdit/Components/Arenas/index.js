import React, { useState } from "react";
import { Modal } from "flowbite-react";
import Button from "../../../../Components/Buttons";
import { createNewArena, getAll } from "../../../../Service/Arenas";
const Arenas = ({ data }) => {
  const [ categories, setCategories ] = React.useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const [ status, setStatus ] = useState("Ativa");
  const [ name, setName ] = useState("");
  const [ arenas, setArenas ] = useState([]);
  const createArena = async () => {
    if (data && data.data.owner_id) {
      let payload = {
        name: name,
        status: status,
        owner_id: data.data.owner_id
      };
      await createNewArena(payload);
    }
  };

  const updateName = (set, value) => {
    set(value);
  };

  const getArenas = async () => {
    if (data && data.data.owner_id) {
      let req = await getAll(data.data.owner_id);
      setArenas(req);
    }
  };

  React.useEffect(() => {
    getArenas();
  }, []);

  return (
    <div>
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
        <Modal.Header>Registrar Arena</Modal.Header>
        <Modal.Body className="p-4 ">
          <div className=" w-full flex gap-10 items-center">
            <div className="flex items-center flex-col">
              <labe>Nome da Arena</labe>
              <input
                onChange={(event) => {
                  updateName(setName, event.target.value);
                }}
                className="ml-4 border p-2 rounded-[6px]"
                placeholder="Arena xx...."
              />
            </div>
            <div className="flex items-center flex-col">
              <labe>Status da Arena</labe>
              <select
                className="ml-4 border p-2 rounded-[6px] w-full"
                onChange={(event) => {
                  updateName(setStatus, event.target.value);
                }}
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
      <div className={openModal ? "opacity-[0.3]" : ""}>
        <h1 className="title">Arenas</h1>
        <div className="mb-4 mt-2">
          <button
            className="btn-def create-btn"
            style={{ width: "290px" }}
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            Criar Arena
          </button>
        </div>
        {arenas && (
          <div className="w-full flex flex-col w-full">
            {arenas.map((val) => (
              <div className="flex flex-col w-full mt-4">
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
                        <input type="checkbox" />
                      </div>
                      <div className="w-[60%]  border-r-4 p-4">
                        <p>Status: {val.status}</p>
                      </div>
                      <div className="w-[20%] p-4">
                        <p>Progresso:</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2">
                    <div className="min-h-[300px] border flex flex-col items-center justify-center">
                      {val.current_match ? (
                        <div className="flex items-center justify-center flex-col gap-3">
                          <div className="box-fighter flex border h-full items-center  w-[500px]">
                            <div className="h-full min-h-[50px] w-[10px] bg-red-500" />
                            <p className="p-2">{val.first_fighter_name}</p>
                          </div>
                          X
                          <div className="box-fighter flex border h-full items-center  w-[500px]">
                            <div className="h-full min-h-[50px] w-[10px] bg-blue-500" />
                            <p className="p-2">{val.second_fighter_name}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="cursor-pointer">Sem lutadores</p>
                      )}
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
