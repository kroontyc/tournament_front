import React, { useState } from "react";
import {
  byIdTournamentParticipant,
  updatePeople
} from "../../../../Service/Tournament";
import Paginate from "../../../../Components/Paginate";
import Button from "../../../../Components/Buttons/index";
import { Modal } from "flowbite-react";
import "./style.css";

const Participants = () => {
  const [ data, setData ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState([]);
  const [ name, setName ] = useState("");
  const [ age, setAge ] = useState("");
  const [ weight, setWeight ] = useState("");
  const [ height, setHeight ] = useState("");
  const [ gub, setGub ] = useState("");
  const [ sex, setSex ] = useState("");
  const [ teamName, setTeamName ] = useState("");
  const getParticipants = async () => {
    const id = window.location.pathname.split("/")[3];

    try {
      let req = await byIdTournamentParticipant(id);
      setData(req);
      // console.log("req", req);
    } catch (e) {
      console.log("e", e);
    }
  };

  const getParticipantsPaginate = async (page) => {
    const id = window.location.pathname.split("/")[3];

    try {
      let req = await byIdTournamentParticipant(id, page);
      setData(req);
    } catch (e) {
      console.log("e", e);
    }
  };

  const setUser = (val) => {
    setSelectedUser(val);
    setOpenModal(true);
    setName(val.name);
    setAge(val.age);
    setWeight(val.weight);
    setHeight(val.height);
    setGub(val.gub);
    setSex(val.sex);
    setTeamName(val.team_name);
  };

  const updateParticipant = async () => {
    try {
      const payload = {
        name: name,
        age: age,
        weight: weight,
        height: height,
        gub: gub,
        sex: sex,
        team_name: teamName
      };
      await updatePeople(payload, selectedUser.id);
    } catch (e) {
      console.log(e);
    }
  };

  const updateName = (set, value) => {
    console.log("asa", value);
    set(value);
  };

  React.useEffect(() => {
    getParticipants();
  }, []);
  return (
    <div>
      <div
        className={
          openModal
            ? "overlay w-full h-full flex flex-col items-center justify-center fixed"
            : ""
        }
      >
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
          <Modal.Header>Registrar participante</Modal.Header>
          <Modal.Body className="p-4">
            <div className="space-y-6 w-full">
              <div className="flex flex-wrap -mx-3 w-full">
                <div className="flex items-baseline w-full">
                  <div className="w-full px-3 w-full grow">
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
                  <div className="w-full px-3 grow flex flex-col">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Idade
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      value={age}
                      onChange={(event) => {
                        updateName(setAge, event.target.value);
                      }}
                    />
                  </div>
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
                  <div className="w-full px-3 grow flex flex-col">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Peso
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
                <div className="flex items-center ">
                  <div className="w-full px-3 grow flex flex-col">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Sexo
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      value={sex}
                      onChange={(event) => {
                        updateName(setSex, event.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full px-3 grow flex flex-col">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Gub
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      value={gub}
                      onChange={(event) => {
                        updateName(setGub, event.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full px-3 grow flex flex-col">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Nome da equipe
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      value={teamName}
                      onChange={(event) => {
                        updateName(setTeamName, event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="p-5 w-full items-end justify-end">
            <Button
              text={"Salvar atualizações"}
              color={"#fff"}
              value={true}
              background={"#3b82f6"}
              click={updateParticipant}
            />
          </Modal.Footer>
        </Modal>
      </div>
      <div className="w-full h-full glass-effect">
        <div className="flex items-center justify-center w-full">
          {data && data.data && (
            <div className="w-full h-full">
              {data.data.map((value) => (
                <div
                  className="flex items-center justify-between gap-5 p-2 border m-2 rounded-[5px] tournament-card"
                  key={value.id}
                  onClick={() => {
                    setUser(value);
                  }}
                >
                  <div className=" flex flex-col items-start">
                    <p
                      className="truncate-text max-w-[220px] cursor-pointer"
                      title={value.name}
                    >
                      {value.name}
                    </p>
                    <p
                      className="truncate-text max-w-[220px] cursor-pointer"
                      style={{ fontSize: "11px" }}
                    >
                      {value.team_name}
                    </p>
                  </div>
                  <div className=" flex flex-col items-start">
                    <p>Categoria: {value.categorie}</p>
                  </div>
                  <div className=" flex flex-col items-start">
                    <p>{value.sex}</p>
                    <div className="flex items-center gap-10">
                      <p style={{ fontSize: "11px" }}>Altura: {value.height}</p>
                      <p style={{ fontSize: "11px" }}>Peso: {value.weight}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full h-full flex justify-center">
                <Paginate data={data} click={getParticipantsPaginate} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participants;
