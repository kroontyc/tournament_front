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
      <div>
        <h1 className="title">Arenas</h1>

        {arenas && (
          <div className="w-full flex flex-col w-full">
            {arenas.map((val) => (
              <div className="flex flex-col w-full mt-4">
                <h1 className="color-[#000] font-bold text-[24px]">
                  {val.name}
                </h1>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between p-2">
                    <p className="cursor-pointer">Acompanhar arena</p>
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
