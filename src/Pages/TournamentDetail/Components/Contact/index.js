import React, { useState } from "react";
import { byIdTournamentParticipant } from "../../../../Service/Tournament";
import { byId } from "../../../../Service/Match";

const Contact = ({ data }) => {
  const [ participant, setParticipant ] = useState([]);
  const generateKeysById = async () => {
    const id = window.location.pathname.split("/")[2];
    let req = await byId(id);
    console.log("asa", req);
    setParticipant(req);
  };

  React.useEffect(() => {
    generateKeysById();
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
            {participant &&
            participant.data && (
              <div className="w-full flex-col">
                {participant.data.map((val) => val.first_fighter_name != 'VAZIO' &&(
                  <div className="w-full flex border items-center">
                    <p className="w-[50%] ml-[20px]">{val.second_fighter_categorie}</p>
                    <div className="flex flex-col w-[25%] borders-t">
                      <p className="text-truncate text-border item-one flex justify-center items-center text-bold font-bold ">
                        {val.first_fighter_name}
                      </p>
                      <p className="text-truncate item-one flex justify-center items-center text-bold font-bold">
                        {val.second_fighter_name}
                      </p>
                    </div>
                    <div className="flex flex-col w-[25%] borders-t">
                      <p className="text-truncate text-border text-center item-one flex justify-center items-center">
                        {val.first_fighter_brand}
                      </p>
                      <p className="text-truncate item-one flex justify-center items-center">
                        {val.second_fighter_brand}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
