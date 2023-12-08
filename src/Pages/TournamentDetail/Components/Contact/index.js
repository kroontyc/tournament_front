import React, { useState } from "react";
import { byIdTournamentParticipant } from "../../../../Service/Tournament";
import { byId } from "../../../../Service/Match";
import Keys from "../../../TournamentEdit/Components/Keys";

const Contact = ({ data }) => {
  const [ participant, setParticipant ] = useState([]);
  const generateKeysById = async () => {
    const id = window.location.pathname.split("/")[2];
    let req = await byId(id);

    setParticipant(req);
  };

  React.useEffect(() => {
    generateKeysById();
    console.log("asa", data);
  }, []);
  return (
    <div className="w-full p-[14px]  mt-[40px] h-100 flex flex-col">
      <h1 className="title mb-5">Categorias</h1>
      {data && (
        <div className="border radius-[5px]">
          <div className="flex p-4">
            <p className="w-[54%]">Categoria</p>
            <p className="w-[23%]">Competidor</p>
            <p className="w-[23%]">Escola</p>
          </div>
          <div className="w-full">
            {data &&
            data.owner_id && <Keys owner={data} idInternal={data.id} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
