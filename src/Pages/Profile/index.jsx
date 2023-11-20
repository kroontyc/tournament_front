import React, { useState } from "react";

import { getUserTournament } from "../../Service/Tournament";
import Events from "./Components/Events";
import { useNavigate } from "react-router-dom";

const options = [ "Eventos", "Ajustes", "Contatos" ];
const Profile = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("Eventos");
  const navigate = useNavigate();
  const getUserTorunaments = async () => {
    try {
      let req = await getUserTournament(1);
      setData(req.data);
    } catch (e) {
      console.log("e", e);
    }
  };

  React.useEffect(() => {
    getUserTorunaments();
  }, []);
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <h1 className="title">Bem vindo</h1>
      <div className="flex flex-col">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {options.map((value) => (
            <li
              class="me-2"
              onClick={() => {
                setTab(value);
              }}
            >
              <a
                href="#"
                aria-current="page"
                class={`
                inline-block p-4 ${value === tab
                  ? "text-blue-600"
                  : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500
                `}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[80%]">{tab === "Eventos" && <Events data={data} />}</div>
    </div>
  );
};

export default Profile;
