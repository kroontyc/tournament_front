import React from "react";

import Button from "../../../../Components/Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondFighter from "./Components/SecondaryFighter";
import Fighter from "./Components/FighterCard";
import { byIdTournamentParticipant } from "../../../../Service/Tournament";
import { getAll } from "../../../../Service/Arenas";
import { Modal } from "flowbite-react";
import {
  byId,
  generateKeys,
  insertMatchInArena
} from "../../../../Service/Match";
import { createResult } from "../../../../Service/Results";
import WinnerCard from "./Components/WinnerCard";
import BracketContainer from "./Components/BracketContainer";
const Keys = ({ owner, idInternal }) => {
  const [data, setData] = React.useState([]);
  const [arenas, setArenas] = React.useState([]);

  const getData = async () => {
    const id = window.location.pathname.split("/")[3];
    let response = await byId(idInternal ? idInternal : id);
    
    // Format the response data into groups
    console.log('response', response)
    const formattedGroups = response.map((category) => ({
      titulo: category.category,
      regra: category.ruler,
      participants: category.participants.map((participant) => ({
        name: participant.name,
        weight: participant.weight,
        categorie: participant.categorie,
        sex: participant.sex,
        team: participant.team
      })),
    }));

    setData(formattedGroups);
  };

  const getArenas = async () => {
    if (owner && owner.data.owner_id) {
      let req = await getAll(owner.data.owner_id);
      setArenas(req);
    }
  };

  React.useEffect(() => {
    getData();
    getArenas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <BracketContainer groups={data} />
    </div>
  );
};

export default Keys;
