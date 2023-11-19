import React from "react";
import { byId, generateKeys } from "../../../../Service/Match";
import Button from "../../../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { getParticipantById } from "../../../../Service/Tournament";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SecondFighter from "./Components/SecondaryFighter";
import Fighter from "./Components/FighterCard";
const Keys = () => {
  const [ data, setData ] = React.useState([]);
  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let req = await byId(id);
    setData(req);
  };
  const generateKeysById = async () => {
    const id = window.location.pathname.split("/")[3];
    const payload = {
      tournament_id: id
    };
    generateKeys(payload);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(data.data);
    const [ reorderedItem ] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData({ data: items });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center">
        {!data.data ||
          (!data.data.length > 0 && (
            <div className="mt-10">
              <h1 className="mb-2">
                Você ainda não gerou as chaves do torneio
              </h1>
              <Button
                text="Gerar chaves"
                background={"#3b82f6"}
                color="#ffff"
                icon={faPlus}
                click={generateKeysById}
              />
            </div>
          ))}
      </div>
      <div className="mt-10 flex flex-col gap-10">
        {data.data &&
          data.data.map(
            (value) =>
              value.first_fighter_name !== "VAZIO" && (
                <div className="flex w-[380px]" key={value.id}>
                  <div className="flex flex-col w-full">
                    <Fighter data={value} />
                    <SecondFighter data={value} />
                  </div>
                  <div className="borders w-10" />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Keys;
